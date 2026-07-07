-- DDL para el Glosario Ontológico de Paulita ITS

-- 1. Tabla de Conceptos Centrales
CREATE TABLE IF NOT EXISTS paulita_its_conceptos (
  concepto_id           TEXT PRIMARY KEY,
  nombre_canonico       TEXT NOT NULL,
  descripcion_breve     TEXT,
  formula_mas_comun     TEXT,
  categoria             TEXT CHECK (categoria IN ('tasa', 'capital', 'tiempo', 'formula', 'instrumento', 'regimen')),
  unidades_del_programa TEXT[] DEFAULT '{}',
  sinonimos_texto       TEXT[] DEFAULT '{}',
  conceptos_relacionados TEXT[] DEFAULT '{}',
  created_at            TIMESTAMPTZ DEFAULT now(),
  updated_at            TIMESTAMPTZ DEFAULT now()
);

-- Función genérica para actualizar el campo updated_at (si no existe ya en la BD)
CREATE OR REPLACE FUNCTION update_paulita_its_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
   NEW.updated_at = now(); 
   RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger para paulita_its_conceptos
DROP TRIGGER IF EXISTS trg_paulita_its_conceptos_updated_at ON paulita_its_conceptos;
CREATE TRIGGER trg_paulita_its_conceptos_updated_at
  BEFORE UPDATE ON paulita_its_conceptos
  FOR EACH ROW
  EXECUTE PROCEDURE update_paulita_its_updated_at_column();

-- Habilitar RLS en Supabase
ALTER TABLE paulita_its_conceptos ENABLE ROW LEVEL SECURITY;

-- Políticas de seguridad para paulita_its_conceptos
DROP POLICY IF EXISTS "Permitir lectura a usuarios autenticados" ON paulita_its_conceptos;
CREATE POLICY "Permitir lectura a usuarios autenticados" ON paulita_its_conceptos
  FOR SELECT TO authenticated USING (true);

DROP POLICY IF EXISTS "Permitir todo al service_role" ON paulita_its_conceptos;
CREATE POLICY "Permitir todo al service_role" ON paulita_its_conceptos
  FOR ALL TO service_role USING (true);


-- 2. Tabla de Símbolos por Autor/Obra
CREATE TABLE IF NOT EXISTS paulita_its_concepto_simbolos (
  id          UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  concepto_id TEXT NOT NULL REFERENCES paulita_its_conceptos(concepto_id) ON DELETE CASCADE,
  simbolo     TEXT NOT NULL,
  autor       TEXT NOT NULL,
  obra        TEXT NOT NULL,
  contexto    TEXT,
  created_at  TIMESTAMPTZ DEFAULT now(),
  CONSTRAINT paulita_its_concepto_simbolos_unique UNIQUE(concepto_id, simbolo, autor, obra)
);

-- Habilitar RLS
ALTER TABLE paulita_its_concepto_simbolos ENABLE ROW LEVEL SECURITY;

-- Políticas de seguridad para paulita_its_concepto_simbolos
DROP POLICY IF EXISTS "Permitir lectura de simbolos a autenticados" ON paulita_its_concepto_simbolos;
CREATE POLICY "Permitir lectura de simbolos a autenticados" ON paulita_its_concepto_simbolos
  FOR SELECT TO authenticated USING (true);

DROP POLICY IF EXISTS "Permitir todo de simbolos al service_role" ON paulita_its_concepto_simbolos;
CREATE POLICY "Permitir todo de simbolos al service_role" ON paulita_its_concepto_simbolos
  FOR ALL TO service_role USING (true);

-- 3. Concesión de Permisos (Grants) para evitar errores 403 en PostgREST
GRANT ALL ON TABLE paulita_its_conceptos TO service_role;
GRANT ALL ON TABLE paulita_its_concepto_simbolos TO service_role;
GRANT SELECT ON TABLE paulita_its_conceptos TO authenticated, anon;
GRANT SELECT ON TABLE paulita_its_concepto_simbolos TO authenticated, anon;
