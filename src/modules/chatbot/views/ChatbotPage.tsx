'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Bot, 
  User, 
  Send, 
  Mic, 
  MicOff, 
  Volume2, 
  VolumeX, 
  ArrowLeft, 
  BookOpen, 
  Sparkles, 
  Loader2,
  StopCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import LatexRenderer from '../../libro_financiero/components/LatexRenderer';
import ReactMarkdown from 'react-markdown';


interface Chunk {
  id: string;
  source_id: string;
  obra_titulo: string;
  autor: string;
  paginas: string;
  chunk_text: string;
}

interface Message {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  chunks?: Chunk[];
  timestamp: Date;
}

function latexToSpeech(latex: string): string {
  // Quitar delimitadores de ecuación ($ o $$)
  let clean = latex.replace(/^\$\$|\$\$/g, '').replace(/^\$|\$/g, '').trim();

  // Reemplazos de notación comunes en matemática financiera para que suenen naturales en TTS
  clean = clean
    // Fracciones complejas y simples
    .replace(/\\frac\s*{(.*?)}\s*{(.*?)}/g, ' la división de $1 sobre $2 ')
    .replace(/\\frac\s*([^{}\s]+)\s*([^{}\s]+)/g, ' la división de $1 sobre $2 ')
    // Operadores aritméticos
    .replace(/\\cdot/g, ' por ')
    .replace(/\\times/g, ' por ')
    .replace(/\*/g, ' por ')
    // Subíndices (ej. C_n o C_{n-1})
    .replace(/_\{(.*?)\}/g, ' sub $1 ')
    .replace(/_(.)/g, ' sub $1 ')
    // Exponentes (ej. (1+i)^n o (1+i)^{n})
    .replace(/\^\{(.*?)\}/g, ' elevado a la $1 ')
    .replace(/\^(.)/g, ' elevado a la $1 ')
    // Variables típicas
    .replace(/\bi\b/g, ' tasa i ')
    .replace(/\bd\b/g, ' tasa d ')
    // Símbolos de implicación y formateo LaTeX
    .replace(/\\Rightarrow/g, ' entonces ')
    .replace(/\\rightarrow/g, ' tiende a ')
    .replace(/\\left\(/g, ' ( ')
    .replace(/\\right\)/g, ' ) ')
    .replace(/\\left\[/g, ' [ ')
    .replace(/\\right\]/g, ' ] ')
    .replace(/\\text\s*{(.*?)}/g, ' $1 ')
    .replace(/\\text\s*(.)/g, ' $1 ')
    .replace(/\\quad/g, ' ')
    .replace(/\\qquad/g, ' ')
    .replace(/\\;/g, ' ')
    .replace(/\\,/g, ' ')
    // Quitar llaves remanentes y barras
    .replace(/[{}]/g, ' ')
    .replace(/\\/g, ' ');

  return clean.replace(/\s+/g, ' ').trim();
}

function preprocessMarkdown(text: string): string {
  let processed = text;

  // 1. Reemplazar matemática en bloque $$formula$$ con bloque de código especial ```math-block\nformula\n```
  processed = processed.replace(/\$\$([\s\S]*?)\$\$/g, (match, formula) => {
    return `\n\`\`\`math-block\n${formula.trim()}\n\`\`\`\n`;
  });

  // 2. Reemplazar matemática en línea $formula$ con código en línea `math-inline:formula`
  // Excluimos patrones monetarios simples como $100 o $45.50 para no romper visualización de precios
  processed = processed.replace(/(?<!\\)\$((?:[^\\\$]|\\.)+?)(?<!\\)\$/g, (match, formula) => {
    const trimmed = formula.trim();
    if (/^\d+([.,]\d+)*%?$/.test(trimmed)) {
      return match;
    }
    return `\`math-inline:${trimmed}\``;
  });

  // 3. Reemplazar citas [Cita: UUID, pág. Z] con enlace estándar Markdown https://cite/UUID?page=Z
  processed = processed.replace(/\[Cita:\s*([a-f\d]{8}-[a-f\d]{4}-[a-f\d]{4}-[a-f\d]{4}-[a-f\d]{12})\s*,\s*(?:pp\.|pág\.)?\s*(\d+)\]/gi, (match, sourceId, pageStr) => {
    return `[Cita](https://cite/${sourceId}?page=${pageStr})`;
  });

  return processed;
}


export default function ChatbotPage() {
  const router = useRouter();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      sender: 'bot',
      text: '¡Hola! Soy Paulita ITS, tu tutora de Matemática Financiera. Haceme cualquier consulta sobre la bibliografía oficial de la materia. Te responderé basándome estrictamente en los libros de la cátedra y te indicaré la cita exacta para que puedas abrir el lector en la página citada.',
      timestamp: new Date()
    }
  ]);
  
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [voiceActive, setVoiceActive] = useState(true);
  const [listening, setListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);

  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);
  const isListeningRef = useRef(false);

  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  // Auto-scroll al final del chat
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  // Inicializar Web Speech API para STT (Reconocimiento de Voz)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (SpeechRecognition) {
        const rec = new SpeechRecognition();
        rec.continuous = false;
        rec.lang = 'es-AR';
        rec.interimResults = false;
        rec.maxAlternatives = 1;

        rec.onstart = () => {
          console.log('[STT] Micrófono encendido (onstart)');
          setListening(true);
          isListeningRef.current = true;
        };

        rec.onend = () => {
          console.log('[STT] Micrófono apagado (onend)');
          setListening(false);
          isListeningRef.current = false;
        };

        rec.onerror = (e: any) => {
          console.error('[STT Error] Error en SpeechRecognition:', e);
          setListening(false);
          isListeningRef.current = false;
        };

        rec.onresult = (event: any) => {
          const transcript = event.results[0][0].transcript;
          console.log('[STT] Voz detectada:', transcript);
          setInput(prev => (prev + ' ' + transcript).trim());
        };
        
        rec.onnomatch = () => {
          console.warn('[STT] No se reconoció ninguna voz.');
        };

        rec.onaudiostart = () => console.log('[STT Event] audiostart: captura de audio iniciada');
        rec.onsoundstart = () => console.log('[STT Event] soundstart: sonido detectado');
        rec.onspeechstart = () => console.log('[STT Event] speechstart: habla detectada');

        recognitionRef.current = rec;
      }
    }

    return () => {
      if (recognitionRef.current) {
        console.log('[STT] Abortando reconocimiento de voz por desmontaje');
        try {
          recognitionRef.current.abort();
        } catch (e) {
          console.error('[STT] Error al abortar reconocimiento al desmontar:', e);
        }
      }
    };
  }, []);

  const toggleListening = () => {
    if (!recognitionRef.current) {
      alert('El reconocimiento de voz no está soportado en este navegador o dispositivo.');
      return;
    }
    
    console.log('[STT] toggleListening ejecutado. React state `listening`:', listening, 'Ref state `isListeningRef`:', isListeningRef.current);

    try {
      if (isListeningRef.current) {
        console.log('[STT] Solicitando stop()...');
        recognitionRef.current.stop();
      } else {
        console.log('[STT] Solicitando start()...');
        recognitionRef.current.start();
      }
    } catch (error: any) {
      console.warn('[STT Exception] Error en toggleListening:', error);
      if (error.name === 'InvalidStateError') {
        console.log('[STT] Forzando abort() para limpiar estado inconsistente...');
        try {
          recognitionRef.current.abort();
        } catch (e) {}
        setListening(false);
        isListeningRef.current = false;
        
        // Reintento de inicio seguro después de limpiar la instancia
        if (!listening) {
          setTimeout(() => {
            try {
              console.log('[STT] Reintentando start() seguro...');
              recognitionRef.current.start();
              setListening(true);
              isListeningRef.current = true;
            } catch (retryErr) {
              console.error('[STT] Falló el reintento de inicio:', retryErr);
            }
          }, 150);
        }
      }
    }
  };


  // Función para leer respuestas con TTS (Text-to-Speech)
  const speakText = (text: string, chunks: Chunk[] = []) => {
    if (!voiceActive || typeof window === 'undefined' || !window.speechSynthesis) return;

    // Detener cualquier lectura previa
    window.speechSynthesis.cancel();
    setIsSpeaking(false);

    // Reemplazar citas de texto por recomendación bibliográfica hablada de viva voz
    let textToSpeak = text.replace(/\[Cita:\s*([a-f\d]{8}-[a-f\d]{4}-[a-f\d]{4}-[a-f\d]{4}-[a-f\d]{12})\s*,\s*(?:pp\.|pág\.)?\s*(\d+)\]/gi, (match, sourceId, pageStr) => {
      const matchedChunk = chunks.find(c => c.source_id === sourceId);
      const title = matchedChunk ? matchedChunk.obra_titulo : 'bibliografía oficial';
      const author = matchedChunk ? matchedChunk.autor : 'los autores';
      return `. Para profundizar más, te sugiero leer la página ${pageStr} de la obra ${title} de ${author}. `;
    });

    // Reemplazar fórmulas de bloque LaTeX $$...$$ y inline $...$ con su traducción hablada
    textToSpeak = textToSpeak.replace(/(\$\$[\s\S]*?\$\$)|(\$.*?\$)/g, (match) => {
      return ` ${latexToSpeech(match)} `;
    });
    
    // Limpiar sintaxis de Markdown para que Paulita no lea símbolos de formato como #, *, _, ~, >, etc.
    textToSpeak = textToSpeak.replace(/[#*_~`>]/g, '');
    
    // Quitar también símbolos LaTeX sueltos si los hay
    textToSpeak = textToSpeak.replace(/\\(?:[a-zA-Z]+)/g, '');

    const utterance = new SpeechSynthesisUtterance(textToSpeak.trim());
    utterance.lang = 'es-AR';

    // Intentar buscar una voz en español argentina o española de buena calidad
    const voices = window.speechSynthesis.getVoices();
    const preferredVoice = voices.find(v => v.lang.includes('es-AR')) || 
                           voices.find(v => v.lang.includes('es-ES')) ||
                           voices.find(v => v.lang.startsWith('es'));
    
    if (preferredVoice) {
      utterance.voice = preferredVoice;
    }
    utterance.rate = 1.0;

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);
    
    window.speechSynthesis.speak(utterance);
  };



  const handleSend = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const query = input.trim();
    if (!query || loading) return;

    setInput('');
    const userMsg: Message = {
      id: Math.random().toString(),
      sender: 'user',
      text: query,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMsg]);
    setLoading(true);

    try {
      const res = await fetch('/api/paulita', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: query }),
      });

      if (!res.ok) {
        throw new Error('Error al conectar con Paulita ITS');
      }

      const data = await res.json();
      
      const botMsg: Message = {
        id: Math.random().toString(),
        sender: 'bot',
        text: data.response,
        chunks: data.chunks,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMsg]);
      
      // Hablar la respuesta pasándole los chunks de libros para verbalizar la recomendación
      speakText(data.response, data.chunks || []);

    } catch (err: any) {
      console.error(err);
      setMessages(prev => [...prev, {
        id: Math.random().toString(),
        sender: 'bot',
        text: 'Disculpame, tuve un inconveniente de conexión para procesar tu consulta. Por favor, reintentá en unos segundos.',
        timestamp: new Date()
      }]);
    } finally {
      setLoading(false);
    }
  };

  // Renderiza el contenido del mensaje parseando las ecuaciones de LaTeX y citas [Cita: UUID, pág. Z]
  const renderMessageContent = (msg: Message) => {
    const text = msg.text;
    const chunks = msg.chunks || [];
    
    if (msg.sender === 'user') {
      return <p className="message-text">{text}</p>;
    }

    const preprocessed = preprocessMarkdown(text);

    // Componentes personalizados para ReactMarkdown
    const components = {
      // Renderizado personalizado para código inline y bloques de código (nuestro LaTeX)
      code({ node, inline, className, children, ...props }: any) {
        const codeText = String(children).trim();
        if (codeText.startsWith('math-inline:')) {
          const formula = codeText.substring('math-inline:'.length);
          return <LatexRenderer formula={formula} displayMode={false} />;
        }
        if (className === 'language-math-block') {
          return <LatexRenderer formula={codeText} displayMode={true} />;
        }
        return <code className={className} {...props}>{children}</code>;
      },
      // Renderizado personalizado para enlaces (las citas)
      a({ href, children, ...props }: any) {
        if (href?.startsWith('https://cite/')) {
          // Parseo manual seguro para evitar excepciones con new URL()
          const cleanHref = href.substring('https://cite/'.length);
          const parts = cleanHref.split('?');
          const sourceId = parts[0];
          let pageNum = 1;
          
          if (parts[1]) {
            const pageMatch = parts[1].match(/page=(\d+)/);
            if (pageMatch) {
              pageNum = parseInt(pageMatch[1], 10);
            }
          }

          const matchedChunk = chunks.find(c => c.source_id === sourceId);
          const title = matchedChunk ? matchedChunk.obra_titulo : 'Obra';
          const author = matchedChunk ? matchedChunk.autor : 'Autor';

          return (
            <button
              className="citation-btn active"
              onClick={() => {
                window.open(`/biblioteca/leer/${sourceId}?page=${pageNum}`, '_blank');
              }}
              title={`Abrir '${title}' de ${author} en página ${pageNum}`}
              style={{ display: 'inline-flex', alignItems: 'center', margin: '0 4px', verticalAlign: 'middle' }}
            >
              <BookOpen size={13} className="inline mr-1" />
              {author !== 'Autor' ? author : 'Ver Fuente'}, pág. {pageNum}
            </button>
          );
        }
        return <a href={href} {...props}>{children}</a>;
      }
    };

    return (
      <div className="message-text markdown-content">
        <ReactMarkdown components={components}>{preprocessed}</ReactMarkdown>
      </div>
    );
  };


  return (
    <div className="chatbot-container">
      {/* Barra superior de navegación */}
      <header className="chat-header glass-header">
        <button onClick={() => router.push('/')} className="back-btn">
          <ArrowLeft size={20} />
        </button>
        <div className="header-info">
          <div className="avatar-wrapper">
            <Bot size={22} className="avatar-icon" />
          </div>
          <div>
            <h1 className="bot-title">Paulita ITS</h1>
            <p className="bot-subtitle">Tutor Inteligente • Matemática Financiera</p>
          </div>
        </div>
        <div className="header-actions">
          {isSpeaking && (
            <button
              onClick={() => {
                if (typeof window !== 'undefined' && window.speechSynthesis) {
                  window.speechSynthesis.cancel();
                  setIsSpeaking(false);
                }
              }}
              className="action-btn stop-speaking-btn"
              title="Detener lectura de voz"
            >
              <StopCircle size={20} />
            </button>
          )}
          <button 
            onClick={() => {
              setVoiceActive(!voiceActive);
              if (voiceActive && typeof window !== 'undefined') {
                window.speechSynthesis.cancel();
                setIsSpeaking(false);
              }
            }} 
            className={`action-btn ${voiceActive ? 'active' : ''}`}
            title={voiceActive ? 'Desactivar lectura por voz' : 'Activar lectura por voz'}
          >
            {voiceActive ? <Volume2 size={20} /> : <VolumeX size={20} />}
          </button>
        </div>

      </header>

      {/* Historial de Mensajes */}
      <div className="chat-history">
        <div className="history-scroll-inner">
          <AnimatePresence initial={false}>
            {messages.map((msg) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className={`message-row ${msg.sender === 'user' ? 'user-row' : 'bot-row'}`}
              >
                <div className="message-avatar">
                  {msg.sender === 'user' ? <User size={18} /> : <Bot size={18} />}
                </div>
                <div className="message-bubble-wrapper">
                  <div className="message-bubble">
                    {renderMessageContent(msg)}
                  </div>
                  <span className="message-time">
                    {mounted ? msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : ''}
                  </span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {loading && (
            <div className="message-row bot-row loading-row">
              <div className="message-avatar">
                <Bot size={18} />
              </div>
              <div className="message-bubble loading-bubble">
                <Loader2 size={18} className="animate-spin" />
                <span>Pensando con el libro abierto...</span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Panel inferior de entrada */}
      <footer className="chat-footer">
        <form onSubmit={handleSend} className="input-form glass-input">
          <button 
            type="button" 
            onClick={toggleListening} 
            className={`mic-btn ${listening ? 'listening' : ''}`}
            title={listening ? 'Detener micrófono' : 'Hablar por micrófono'}
          >
            {listening ? <MicOff size={20} /> : <Mic size={20} />}
          </button>
          
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={listening ? 'Escuchando tu pregunta...' : 'Preguntá sobre Matemática Financiera...'}
            className="chat-text-input"
            disabled={loading}
          />
          
          <button type="submit" className="send-btn" disabled={!input.trim() || loading}>
            {loading ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} />}
          </button>
        </form>
        <p className="disclaimer-text">
          Paulita es una inteligencia artificial y puede cometer errores. Nada reemplaza la lectura analítica de la bibliografía oficial publicada en ABACCUS. Ante dudas profundas, consulte a su docente a cargo.
        </p>
      </footer>


      {/* Estilos encapsulados con Styled JSX */}
      <style jsx>{`
        .chatbot-container {
          display: flex;
          flex-direction: column;
          height: 100vh;
          width: 100%;
          background: linear-gradient(135deg, #0e1118 0%, #151824 100%);
          color: #f3f4f6;
          font-family: 'Outfit', sans-serif;
          position: relative;
          overflow: hidden;
        }

        .chat-header {
          display: flex;
          align-items: center;
          padding: 16px 24px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
          z-index: 10;
        }

        .glass-header {
          background: rgba(15, 18, 28, 0.85);
          backdrop-filter: blur(12px);
        }

        .back-btn {
          background: transparent;
          border: none;
          color: #9ca3af;
          cursor: pointer;
          padding: 8px;
          margin-right: 12px;
          border-radius: 50%;
          transition: all 0.2s;
        }

        .back-btn:hover {
          background: rgba(255, 255, 255, 0.05);
          color: #f3f4f6;
        }

        .header-info {
          display: flex;
          align-items: center;
          flex: 1;
          gap: 12px;
        }

        .avatar-wrapper {
          background: linear-gradient(135deg, #38bdf8 0%, #0284c7 100%);
          padding: 8px;
          border-radius: 12px;
          color: #ffffff;
          box-shadow: 0 4px 12px rgba(56, 189, 248, 0.2);
        }

        .bot-title {
          font-size: 16px;
          font-weight: 600;
          margin: 0;
          background: linear-gradient(90deg, #38bdf8, #818cf8);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .bot-subtitle {
          font-size: 11px;
          color: #9ca3af;
          margin: 2px 0 0 0;
        }

        .header-actions {
          display: flex;
          gap: 8px;
        }

        .action-btn {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.08);
          color: #9ca3af;
          padding: 8px;
          border-radius: 10px;
          cursor: pointer;
          transition: all 0.2s;
        }

        .action-btn:hover {
          background: rgba(255, 255, 255, 0.08);
          color: #f3f4f6;
        }

        .action-btn.active {
          background: rgba(56, 189, 248, 0.15);
          border-color: rgba(56, 189, 248, 0.3);
          color: #38bdf8;
        }

        .chat-history {
          flex: 1;
          overflow-y: auto;
          padding: 24px;
          display: flex;
          flex-direction: column;
        }

        .history-scroll-inner {
          display: flex;
          flex-direction: column;
          gap: 20px;
          max-width: 100%;
          width: 100%;
          margin: 0 auto;
        }

        .message-row {
          display: flex;
          gap: 12px;
          align-items: flex-start;
          width: 100%;
        }

        .user-row {
          flex-direction: row-reverse;
        }

        .message-avatar {
          padding: 8px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .bot-row .message-avatar {
          background: rgba(56, 189, 248, 0.1);
          color: #38bdf8;
          border: 1px solid rgba(56, 189, 248, 0.15);
        }

        .user-row .message-avatar {
          background: rgba(129, 140, 248, 0.1);
          color: #818cf8;
          border: 1px solid rgba(129, 140, 248, 0.15);
        }

        .message-bubble-wrapper {
          display: flex;
          flex-direction: column;
          max-width: 90%;
        }

        .user-row .message-bubble-wrapper {
          align-items: flex-end;
        }

        .message-bubble {
          padding: 14px 18px;
          border-radius: 18px;
          font-size: 14.5px;
          line-height: 1.6;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
        }

        .bot-row .message-bubble {
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.06);
          border-top-left-radius: 4px;
        }

        .markdown-content {
          display: inline;
        }

        .markdown-content p {
          margin-bottom: 8px;
          display: inline-block;
          width: 100%;
        }

        .markdown-content h1,
        .markdown-content h2,
        .markdown-content h3 {
          font-weight: 600;
          color: #ffffff;
          margin-top: 12px;
          margin-bottom: 6px;
          display: block;
        }

        .markdown-content h1 { font-size: 1.3rem; }
        .markdown-content h2 { font-size: 1.15rem; }
        .markdown-content h3 { font-size: 1.05rem; }

        .markdown-content ul,
        .markdown-content ol {
          margin-left: 20px;
          margin-bottom: 8px;
          display: block;
        }

        .markdown-content li {
          list-style-type: disc;
          margin-bottom: 4px;
        }

        .markdown-content ol li {
          list-style-type: decimal;
        }

        .markdown-content strong {
          color: #ffffff;
          font-weight: 600;
        }

        .user-row .message-bubble {
          background: linear-gradient(135deg, #4f46e5 0%, #3730a3 100%);
          border-top-right-radius: 4px;
          color: #ffffff;
        }

        .loading-bubble {
          display: flex;
          align-items: center;
          gap: 10px;
          color: #9ca3af;
          background: rgba(255, 255, 255, 0.02);
          border: 1px dashed rgba(255, 255, 255, 0.1);
          font-style: italic;
        }

        .message-time {
          font-size: 10px;
          color: #6b7280;
          margin-top: 4px;
          padding: 0 4px;
        }

        .chat-footer {
          padding: 20px 24px;
          background: transparent;
          z-index: 10;
        }

        .input-form {
          max-width: 100%;
          width: 100%;
          margin: 0 auto;
          display: flex;
          align-items: center;
          padding: 8px 16px;
          border-radius: 24px;
          border: 1px solid rgba(255, 255, 255, 0.08);
          gap: 12px;
          transition: border-color 0.2s, box-shadow 0.2s;
        }

        .glass-input {
          background: rgba(15, 18, 28, 0.9);
          backdrop-filter: blur(12px);
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
        }

        .input-form:focus-within {
          border-color: rgba(56, 189, 248, 0.4);
          box-shadow: 0 0 15px rgba(56, 189, 248, 0.15);
        }

        .chat-text-input {
          flex: 1;
          background: transparent;
          border: none;
          color: #f3f4f6;
          font-size: 14.5px;
          outline: none;
          padding: 10px 0;
        }

        .chat-text-input::placeholder {
          color: #6b7280;
        }

        .mic-btn {
          background: transparent;
          border: none;
          color: #9ca3af;
          cursor: pointer;
          padding: 8px;
          border-radius: 50%;
          transition: all 0.2s;
        }

        .mic-btn:hover {
          background: rgba(255, 255, 255, 0.05);
          color: #f3f4f6;
        }

        .mic-btn.listening {
          background: rgba(239, 68, 68, 0.2);
          color: #ef4444;
          animation: pulse 1.5s infinite;
        }

        .send-btn {
          background: #38bdf8;
          border: none;
          color: #ffffff;
          padding: 10px;
          border-radius: 50%;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s;
          box-shadow: 0 4px 12px rgba(56, 189, 248, 0.3);
        }

        .send-btn:hover:not(:disabled) {
          background: #0284c7;
          transform: scale(1.05);
        }

        .send-btn:disabled {
          background: rgba(255, 255, 255, 0.05);
          color: #6b7280;
          cursor: not-allowed;
          box-shadow: none;
        }

        /* Botón de Cita */
        :global(.citation-btn) {
          display: inline-flex;
          align-items: center;
          background: rgba(56, 189, 248, 0.12);
          border: 1px solid rgba(56, 189, 248, 0.25);
          color: #38bdf8;
          font-size: 12px;
          font-weight: 500;
          padding: 3px 8px;
          border-radius: 6px;
          margin: 2px 4px;
          cursor: pointer;
          transition: all 0.2s;
          vertical-align: middle;
        }

        :global(.citation-btn:hover.active) {
          background: #38bdf8;
          color: #ffffff;
          box-shadow: 0 2px 8px rgba(56, 189, 248, 0.3);
          transform: translateY(-1px);
        }

        :global(.citation-btn.disabled) {
          background: rgba(255, 255, 255, 0.05);
          border-color: rgba(255, 255, 255, 0.08);
          color: #6b7280;
          cursor: not-allowed;
        }

        :global(.text-span) {
          white-space: pre-wrap;
        }

        @keyframes pulse {
          0% { transform: scale(1); }
          50% { transform: scale(1.1); }
          100% { transform: scale(1); }
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        .animate-spin {
          animation: spin 1s linear infinite;
        }

        .disclaimer-text {
          font-size: 11px;
          color: #6b7280;
          text-align: center;
          margin-top: 12px;
          max-width: 1000px;
          margin-left: auto;
          margin-right: auto;
          line-height: 1.4;
        }

        .stop-speaking-btn {
          background: rgba(239, 68, 68, 0.1) !important;
          border-color: rgba(239, 68, 68, 0.2) !important;
          color: #ef4444 !important;
        }

        .stop-speaking-btn:hover {
          background: rgba(239, 68, 68, 0.2) !important;
          color: #f87171 !important;
        }

        /* Estilos específicos para el Modo Claro (data-theme='light') */
        :global([data-theme='light']) .chatbot-container {
          background: linear-gradient(135deg, #f9fafb 0%, #f3f4f6 100%) !important;
          color: #1f2937 !important;
        }

        :global([data-theme='light']) .chat-header {
          border-bottom: 1px solid rgba(0, 0, 0, 0.08) !important;
        }

        :global([data-theme='light']) .glass-header {
          background: rgba(255, 255, 255, 0.85) !important;
        }

        :global([data-theme='light']) .back-btn {
          color: #4b5563 !important;
        }

        :global([data-theme='light']) .back-btn:hover {
          background: rgba(0, 0, 0, 0.05) !important;
        }

        :global([data-theme='light']) .header-info h2 {
          color: #111827 !important;
        }

        :global([data-theme='light']) .header-info p {
          color: #4b5563 !important;
        }

        :global([data-theme='light']) .bot-row .message-bubble {
          background: #ffffff !important;
          border: 1px solid rgba(0, 0, 0, 0.08) !important;
          color: #1f2937 !important;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.03) !important;
        }

        :global([data-theme='light']) .markdown-content h1,
        :global([data-theme='light']) .markdown-content h2,
        :global([data-theme='light']) .markdown-content h3,
        :global([data-theme='light']) .markdown-content strong {
          color: #111827 !important;
        }

        :global([data-theme='light']) .loading-bubble {
          color: #4b5563 !important;
          background: rgba(0, 0, 0, 0.02) !important;
          border: 1px dashed rgba(0, 0, 0, 0.1) !important;
        }

        :global([data-theme='light']) .glass-input {
          background: #ffffff !important;
          border: 1px solid rgba(0, 0, 0, 0.12) !important;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05) !important;
        }

        :global([data-theme='light']) .input-form textarea {
          color: #1f2937 !important;
        }

        :global([data-theme='light']) .input-form textarea::placeholder {
          color: #9ca3af !important;
        }

        :global([data-theme='light']) .send-btn:disabled {
          background: rgba(0, 0, 0, 0.05) !important;
          color: #9ca3af !important;
        }

        :global([data-theme='light']) :global(.citation-btn.disabled) {
          background: rgba(0, 0, 0, 0.03) !important;
          border-color: rgba(0, 0, 0, 0.06) !important;
          color: #9ca3af !important;
        }

        :global([data-theme='light']) .disclaimer-text {
          color: #4b5563 !important;
        }

        :global([data-theme='light']) .message-time {
          color: #6b7280 !important;
        }
      `}</style>
    </div>
  );
}
