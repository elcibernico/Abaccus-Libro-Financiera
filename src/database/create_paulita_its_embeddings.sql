-- DDL para los fragmentos vectoriales de la Biblioteca Digital de Paulita ITS (pgvector)
-- NOTA: Se configuran a 1536 dimensiones (estándar OpenAI y compatible con Gemini truncado).

-- 1. Habilitar la extensión de vectores (si no está habilitada)
CREATE EXTENSION IF NOT EXISTS vector;

-- 2. Tabla de fragmentos y embeddings
CREATE TABLE IF NOT EXISTS paulita_its_embeddings (
  id            UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  source_type   TEXT NOT NULL CHECK (source_type IN ('libro', 'biblioteca')),
  source_id     TEXT NOT NULL,                            -- ID de la obra en biblioteca_obras
  obra_titulo   TEXT,
  autor         TEXT,
  paginas       TEXT,                                     -- Ej. 'pp. 12-14'
  chunk_index   INTEGER NOT NULL,
  chunk_text    TEXT NOT NULL,                            -- Fragmento literal extraído del PDF
  embedding     VECTOR(1536),                             -- Vector de 1536 dimensiones
  created_at    TIMESTAMPTZ DEFAULT now()
);

-- 3. Habilitar Row Level Security (RLS)
ALTER TABLE paulita_its_embeddings ENABLE ROW LEVEL SECURITY;

-- 4. Políticas de Seguridad (RLS)
DROP POLICY IF EXISTS "Permitir lectura de embeddings a autenticados" ON paulita_its_embeddings;
CREATE POLICY "Permitir lectura de embeddings a autenticados" ON paulita_its_embeddings
  FOR SELECT TO authenticated USING (true);

DROP POLICY IF EXISTS "Permitir todo al service_role en embeddings" ON paulita_its_embeddings;
CREATE POLICY "Permitir todo al service_role en embeddings" ON paulita_its_embeddings
  FOR ALL TO service_role USING (true);

-- 5. Concesión de Permisos (Grants)
GRANT ALL ON TABLE paulita_its_embeddings TO service_role;
GRANT SELECT ON TABLE paulita_its_embeddings TO authenticated, anon;

-- 6. Índice de búsqueda vectorial por similitud de coseno
CREATE INDEX IF NOT EXISTS paulita_its_embeddings_cosine_idx ON paulita_its_embeddings
  USING ivfflat (embedding vector_cosine_ops)
  WITH (lists = 100);

-- 7. Función RPC de búsqueda semántica (La Pesca Semántica)
CREATE OR REPLACE FUNCTION match_paulita_its_embeddings (
  query_embedding VECTOR(1536),
  match_threshold FLOAT,
  match_count INT
)
RETURNS TABLE (
  id UUID,
  source_type TEXT,
  source_id TEXT,
  obra_titulo TEXT,
  autor TEXT,
  paginas TEXT,
  chunk_index INT,
  chunk_text TEXT,
  similarity FLOAT
)
LANGUAGE plpgsql
AS $$
BEGIN
  RETURN QUERY
  SELECT
    paulita_its_embeddings.id,
    paulita_its_embeddings.source_type,
    paulita_its_embeddings.source_id,
    paulita_its_embeddings.obra_titulo,
    paulita_its_embeddings.autor,
    paulita_its_embeddings.paginas,
    paulita_its_embeddings.chunk_index,
    paulita_its_embeddings.chunk_text,
    1 - (paulita_its_embeddings.embedding <=> query_embedding) AS similarity
  FROM paulita_its_embeddings
  LEFT JOIN biblioteca_obras ON (paulita_its_embeddings.source_id = biblioteca_obras.id::text)
  WHERE (1 - (paulita_its_embeddings.embedding <=> query_embedding) > match_threshold)
    AND (biblioteca_obras.id IS NULL OR biblioteca_obras.oculta IS NOT TRUE) -- Filtro de obras ocultas (Opción B)
  ORDER BY paulita_its_embeddings.embedding <=> query_embedding
  LIMIT match_count;
END;
$$;

-- Otorgar ejecución a PostgREST
GRANT EXECUTE ON FUNCTION match_paulita_its_embeddings(VECTOR(1536), FLOAT, INT) TO service_role, authenticated, anon;
