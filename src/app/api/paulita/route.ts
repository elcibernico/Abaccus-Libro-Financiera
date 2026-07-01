import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/core/security/supabaseServer';

// Helper para obtener el pool de claves
const getApiKeys = (): string[] => {
  const rawKeys = process.env.GEMINI_API_KEYS || process.env.GEMINI_API_KEY || '';
  return rawKeys.split(',').map(k => k.trim()).filter(k => k.length > 0);
};

let currentKeyIdx = 0;

// Helper para generar embeddings con rotación de claves
async function getEmbedding(text: string, keys: string[]): Promise<number[]> {
  const payload = {
    content: {
      parts: [{ text }]
    }
  };

  let attempts = 0;
  const maxAttempts = keys.length * 2;

  while (attempts < maxAttempts) {
    const apiKey = keys[currentKeyIdx];
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-embedding-001:embedContent?key=${apiKey}`;

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        const resData = await response.json();
        let vector = resData.embedding.values as number[];
        
        // Rellenar a 1536 dimensiones (padding)
        if (vector.length < 1536) {
          const padding = new Array(1536 - vector.length).fill(0.0);
          vector = [...vector, ...padding];
        } else if (vector.length > 1536) {
          vector = vector.slice(0, 1536);
        }
        return vector;
      } else if (response.status === 429) {
        console.warn(`[WARN] Clave de Gemini #${currentKeyIdx + 1} agotada (429). Rotando...`);
        currentKeyIdx = (currentKeyIdx + 1) % keys.length;
        await new Promise(r => setTimeout(r, 1000));
      } else {
        const errText = await response.text();
        console.error(`Error de Gemini API (${response.status}):`, errText);
        currentKeyIdx = (currentKeyIdx + 1) % keys.length;
      }
    } catch (e) {
      console.error('Excepción al llamar a Gemini Embedding:', e);
      currentKeyIdx = (currentKeyIdx + 1) % keys.length;
    }
    attempts++;
  }
  throw new Error('Todas las API Keys de Gemini en el pool están agotadas o con límite de cuota.');
}

// Helper para generar una hipótesis HyDE (Hypothetical Document Embedding)
async function generateHydeHypothesis(question: string, keys: string[]): Promise<string> {
  const prompt = `Escribe un párrafo explicativo corto y preciso en español, al estilo de un libro de texto de matemática financiera, que responda a la siguiente pregunta del alumno: "${question}".
Usa la notación teórica estándar (ej. i para tasas de interés, Cn para capital final, etc.). No incluyas comentarios personales ni saludos. Limítate a la respuesta teórica exacta.`;

  const payload = {
    contents: [{
      parts: [{ text: prompt }]
    }],
    generationConfig: {
      temperature: 0.1
    }
  };

  let attempts = 0;
  const maxAttempts = keys.length * 2;

  while (attempts < maxAttempts) {
    const apiKey = keys[currentKeyIdx];
    const url = `https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:generateContent?key=${apiKey}`;

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        const resData = await response.json();
        return resData.candidates[0].content.parts[0].text;
      } else if (response.status === 429) {
        console.warn(`[WARN] Clave de Gemini #${currentKeyIdx + 1} agotada (429) en HyDE. Rotando...`);
        currentKeyIdx = (currentKeyIdx + 1) % keys.length;
        await new Promise(r => setTimeout(r, 1000));
      } else {
        const errText = await response.text();
        console.error(`Error de Gemini HyDE (${response.status}):`, errText);
        currentKeyIdx = (currentKeyIdx + 1) % keys.length;
      }
    } catch (e) {
      console.error('Excepción al llamar a Gemini HyDE:', e);
      currentKeyIdx = (currentKeyIdx + 1) % keys.length;
    }
    attempts++;
  }
  return question; // Fallback
}


// Helper para generar respuesta con Gemini 2.5 Flash
async function generateAnswer(question: string, contextChunks: any[], keys: string[]): Promise<string> {
  let formattedContext = '';
  contextChunks.forEach((chunk, index) => {
    formattedContext += `--- Fragmento ${index + 1} ---\n`;
    formattedContext += `Libro: ${chunk.obra_titulo || 'Desconocido'}\n`;
    formattedContext += `Autor: ${chunk.autor || 'Desconocido'}\n`;
    formattedContext += `Páginas: ${chunk.paginas || 'N/A'}\n`;
    formattedContext += `ID de Obra: ${chunk.source_id || 'N/A'}\n`;
    formattedContext += `Texto: ${chunk.chunk_text || ''}\n\n`;
  });

  const systemInstruction = 
    "INSTRUCCIÓN DEL SISTEMA:\n" +
    "Sos Paulita ITS, un Tutor Inteligente de Matemática Financiera para universitarios.\n" +
    "Tu objetivo es responder la pregunta del alumno de forma sumamente didáctica, clara y práctica, " +
    "pero bajo una regla de acero (Examen a Libro Abierto):\n" +
    "RESPONDE ÚNICAMENTE usando los fragmentos bibliográficos provistos. No inventes datos, fórmulas ni conceptos " +
    "que no figuren en los fragmentos. Si el contexto no tiene la respuesta, decí de forma directa y amable " +
    "que no contás con esa información en la bibliografía oficial.\n" +
    "Al final de tu respuesta, debés incluir la cita exacta de la obra de la que extrajiste la información utilizando " +
    "estrictamente el siguiente formato:\n" +
    "[Cita: ID_DE_LA_OBRA, pág. Z]\n" +
    "Donde ID_DE_LA_OBRA es el valor exacto del 'ID de Obra' del fragmento correspondiente (por ejemplo, d7297268-6658...).\n" +
    "Es crítico que uses ese formato con corchetes y comas exactamente para que el frontend pueda vincular el botón al visor de PDFs.\n" +
    "Toda ecuación o fórmula matemática debe ser escrita en notación LaTeX estándar, usando barras diagonales inversas simples " +
    "(por ejemplo: \\frac{C}{d}, \\cdot, \\Rightarrow, \\text{}). Usa $$ para fórmulas en bloque y $ para fórmulas en línea.\n" +
    "Al finalizar tu respuesta, añade siempre una oración recordando amablemente al alumno: 'Ante cualquier duda profunda sobre este tema, por favor consulte a su docente a cargo.'\n" +
    "==========================================\n";


  const prompt = `${systemInstruction}CONTEXTO BIBLIOGRÁFICO:\n${formattedContext}\nPREGUNTA DEL ALUMNO:\n${question}\n`;

  const payload = {
    contents: [{
      parts: [{ text: prompt }]
    }],
    generationConfig: {
      temperature: 0.2
    }
  };

  let attempts = 0;
  const maxAttempts = keys.length * 2;

  while (attempts < maxAttempts) {
    const apiKey = keys[currentKeyIdx];
    // Usamos gemini-2.5-flash que verificamos tiene cuota y estabilidad
    const url = `https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:generateContent?key=${apiKey}`;

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        const resData = await response.json();
        return resData.candidates[0].content.parts[0].text;
      } else if (response.status === 429) {
        console.warn(`[WARN] Clave de Gemini #${currentKeyIdx + 1} agotada (429) en generación. Rotando...`);
        currentKeyIdx = (currentKeyIdx + 1) % keys.length;
        await new Promise(r => setTimeout(r, 1000));
      } else {
        const errText = await response.text();
        console.error(`Error de Gemini Generación (${response.status}):`, errText);
        currentKeyIdx = (currentKeyIdx + 1) % keys.length;
      }
    } catch (e) {
      console.error('Excepción al llamar a Gemini Generación:', e);
      currentKeyIdx = (currentKeyIdx + 1) % keys.length;
    }
    attempts++;
  }
  throw new Error('Rate limit o error en generación de respuesta en todas las API Keys.');
}

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
    }

    const { message } = await request.json();
    if (!message || typeof message !== 'string') {
      return NextResponse.json({ error: 'Falta el mensaje de consulta' }, { status: 400 });
    }

    const keys = getApiKeys();
    if (keys.length === 0) {
      return NextResponse.json({ error: 'Servicio de IA no configurado' }, { status: 500 });
    }

    // 1. Generar hipótesis HyDE para mejorar el match semántico
    let searchText = message;
    try {
      const hypothesis = await generateHydeHypothesis(message, keys);
      searchText = `${message}\n${hypothesis}`;
      console.log('[HyDE Hypothesis generated for semantic search]');
    } catch (hydeError) {
      console.error('Error al generar hipótesis HyDE, usando mensaje original:', hydeError);
    }

    // 2. Generar vector de la búsqueda (pregunta + hipótesis)
    const queryVector = await getEmbedding(searchText, keys);


    // 2. Realizar búsqueda semántica en Supabase
    const { data: chunks, error: rpcError } = await supabase.rpc('match_paulita_its_embeddings', {
      query_embedding: queryVector,
      match_threshold: 0.05,
      match_count: 30
    });


    if (rpcError) {
      console.error('Error al llamar al RPC match_paulita_its_embeddings:', rpcError);
      return NextResponse.json({ error: 'Error en la búsqueda bibliográfica' }, { status: 500 });
    }

    // 3. Generar la respuesta combinando contexto + LLM
    if (!chunks || chunks.length === 0) {
      return NextResponse.json({
        response: 'Hola. Busqué en la bibliografía oficial de la materia, pero lamentablemente no cuento con información al respecto. Por favor, consultá con tus profesores de la cátedra.',
        chunks: []
      });
    }

    const answer = await generateAnswer(message, chunks, keys);

    return NextResponse.json({
      response: answer,
      chunks: chunks
    });

  } catch (error: any) {
    console.error('Error en el pipeline del Chatbot RAG:', error);
    return NextResponse.json({
      error: error?.message || 'Error interno del servidor en el tutor de IA'
    }, { status: 500 });
  }
}
