-- 1. Crear el enum para los roles autorizados de usuario
CREATE TYPE user_role AS ENUM ('admin', 'admin_suplente', 'manager', 'docente', 'alumno');

-- 2. Crear la tabla de perfiles en el esquema público vinculada a auth.users de Supabase
CREATE TABLE public.profiles (
  id uuid REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  email text UNIQUE NOT NULL,
  role user_role DEFAULT 'alumno'::user_role NOT NULL,
  permissions jsonb DEFAULT '[]'::jsonb NOT NULL,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Habilitar Row Level Security (RLS) en la tabla profiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- 3. Crear Políticas de Seguridad RLS estrictas (Súper escondido)

-- Política A: Cada usuario puede leer únicamente su propio perfil
CREATE POLICY "Permitir lectura de perfil propio" ON public.profiles
  FOR SELECT
  USING (auth.uid() = id);

-- Política B: Los administradores (admin) pueden leer y modificar cualquier perfil de la tabla
CREATE POLICY "Permitir gestión total a administradores" ON public.profiles
  FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE profiles.id = auth.uid() AND profiles.role = 'admin'::user_role
    )
  );

-- 4. Crear la función del Trigger para crear perfiles automáticamente en el registro
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
DECLARE
  assigned_role user_role;
  assigned_perms jsonb;
BEGIN
  -- Definir rol y permisos basados en el email
  IF new.email = 'elcibernico@gmail.com' THEN
    assigned_role := 'admin'::user_role;
    assigned_perms := '["all_privileges"]'::jsonb;
  ELSE
    assigned_role := 'alumno'::user_role;
    assigned_perms := '["view_content"]'::jsonb;
  END IF;

  -- Insertar en la tabla pública de perfiles
  INSERT INTO public.profiles (id, email, role, permissions)
  VALUES (new.id, new.email, assigned_role, assigned_perms);

  -- Sincronizar el rol en la metadata de la cuenta de autenticación de Supabase (auth.users)
  -- Esto permite leer el rol del usuario en la sesión/JWT instantáneamente sin hacer queries en el middleware.
  UPDATE auth.users
  SET raw_app_meta_data = raw_app_meta_data || jsonb_build_object('role', assigned_role::text)
  WHERE id = new.id;

  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 5. Crear el Trigger que se ejecuta automáticamente cuando se inserta un registro en auth.users
CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
