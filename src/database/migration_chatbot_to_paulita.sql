-- MIGRATION SCRIPT: chatbot -> paulita
-- Renaming tables, columns, indexes, functions, triggers, and policies to standardize the naming to 'paulita'

-- 1. Rename tables
ALTER TABLE IF EXISTS chatbot_embeddings RENAME TO paulita_embeddings;
ALTER TABLE IF EXISTS chatbot_conceptos RENAME TO paulita_conceptos;
ALTER TABLE IF EXISTS chatbot_concepto_simbolos RENAME TO paulita_concepto_simbolos;

-- 2. Rename functions
ALTER FUNCTION IF EXISTS update_chatbot_updated_at_column() RENAME TO update_paulita_updated_at_column;

-- 3. Rename triggers
ALTER TRIGGER IF EXISTS trg_chatbot_conceptos_updated_at ON paulita_conceptos RENAME TO trg_paulita_conceptos_updated_at;

-- 4. Rename indexes
ALTER INDEX IF EXISTS chatbot_embeddings_cosine_idx RENAME TO paulita_embeddings_cosine_idx;
-- If any other indexes were implicitly created for constraints, rename them too
ALTER INDEX IF EXISTS chatbot_conceptos_pkey RENAME TO paulita_conceptos_pkey;
ALTER INDEX IF EXISTS chatbot_concepto_simbolos_pkey RENAME TO paulita_concepto_simbolos_pkey;

-- 5. Rename constraints
ALTER TABLE paulita_concepto_simbolos RENAME CONSTRAINT chatbot_concepto_simbolos_concepto_id_fkey TO paulita_concepto_simbolos_concepto_id_fkey;
ALTER TABLE paulita_concepto_simbolos RENAME CONSTRAINT chatbot_concepto_simbolos_unique TO paulita_concepto_simbolos_unique;
