-- SQL PARA ACTUALIZAR TABLAS DE USUARIOS (whitelist_users y whitelist_pending)
-- Copia y pega este script en el editor SQL de tu consola de Supabase y ejecútalo.

-- 1. Agregar columnas a whitelist_users
ALTER TABLE public.whitelist_users 
  ADD COLUMN IF NOT EXISTS apellido text,
  ADD COLUMN IF NOT EXISTS nombre text,
  ADD COLUMN IF NOT EXISTS fecha_nacimiento date,
  ADD COLUMN IF NOT EXISTS legajo text,
  ADD COLUMN IF NOT EXISTS dni text,
  ADD COLUMN IF NOT EXISTS is_active boolean DEFAULT true,
  ADD COLUMN IF NOT EXISTS deleted_at timestamp with time zone;

-- 2. Agregar columnas a whitelist_pending (para capturar nombre y apellido en el registro inicial)
ALTER TABLE public.whitelist_pending 
  ADD COLUMN IF NOT EXISTS apellido text,
  ADD COLUMN IF NOT EXISTS nombre text,
  ADD COLUMN IF NOT EXISTS fecha_nacimiento date,
  ADD COLUMN IF NOT EXISTS legajo text,
  ADD COLUMN IF NOT EXISTS dni text,
  ADD COLUMN IF NOT EXISTS is_active boolean DEFAULT true,
  ADD COLUMN IF NOT EXISTS deleted_at timestamp with time zone;

-- 3. Crear índices para búsquedas optimizadas
CREATE INDEX IF NOT EXISTS idx_whitelist_users_is_active ON public.whitelist_users (is_active);
CREATE INDEX IF NOT EXISTS idx_whitelist_users_email ON public.whitelist_users (email);

-- 4. Actualizar políticas de RLS si es necesario (el select básico ya está permitido por authenticated)
-- Asegurar que los grants sigan vigentes
GRANT SELECT, INSERT, UPDATE, DELETE ON public.whitelist_users TO anon, authenticated, service_role;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.whitelist_pending TO anon, authenticated, service_role;
