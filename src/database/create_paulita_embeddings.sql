-- DDL para los fragmentos vectoriales de la Biblioteca Digital (pgvector)
-- NOTA: Gemini gemini-embedding-001 y gemini-embedding-2 se truncarán a 1536 dimensiones.

-- 1. Habilitar la extensión de vectores (si no está habilitada)
CREATE EXTENSION IF NOT EXISTS vector;

-- 2. Tabla de fragmentos y embeddings
CREATE TABLE IF NOT EXISTS paulita_embeddings (
  id            UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  source_type   TEXT NOT NULL CHECK (source_type IN ('libro', 'biblioteca')),
  source_id     TEXT NOT NULL,                            -- ID de la obra en biblioteca_obras
  obra_titulo   TEXT,
  autor         TEXT,
  paginas       TEXT,                                     -- Ej. 'pp. 12-14'
  chunk_index   INTEGER NOT NULL,
  chunk_text    TEXT NOT NULL,                            -- Fragmento literal extraído del PDF
  embedding     VECTOR(1536),                             -- Vector de 1536 dimensiones (Gemini)
  created_at    TIMESTAMPTZ DEFAULT now()
);

-- 3. Habilitar Row Level Security (RLS)
ALTER TABLE paulita_embeddings ENABLE ROW LEVEL SECURITY;

-- 4. Políticas de Seguridad (RLS)
CREATE POLICY "Permitir lectura de embeddings a autenticados" ON paulita_embeddings
  FOR SELECT TO authenticated USING (true);

CREATE POLICY "Permitir todo al service_role en embeddings" ON paulita_embeddings
  FOR ALL TO service_role USING (true);

-- 5. Concesión de Permisos (Grants)
GRANT ALL ON TABLE paulita_embeddings TO service_role;
GRANT SELECT ON TABLE paulita_embeddings TO authenticated, anon;

-- 6. Índice de búsqueda vectorial por similitud de coseno
-- Nota: lists = 100 es adecuado para volúmenes pequeños y medianos de datos.
CREATE INDEX IF NOT EXISTS paulita_embeddings_cosine_idx ON paulita_embeddings
  USING ivfflat (embedding vector_cosine_ops)
  WITH (lists = 100);
