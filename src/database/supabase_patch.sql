-- Parche para optimizar el registro de usuarios y evitar errores de conflicto (ON CONFLICT)
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
DECLARE
  assigned_role user_role;
  assigned_perms jsonb;
BEGIN
  -- Definir rol y permisos basados en el email
  IF new.email = 'elcibernico@gmail.com' OR new.email = 'estudiocontableid@gmail.com' OR new.email = 'ndemartis@fcecon.unr.edu.ar' THEN
    assigned_role := 'admin'::user_role;
    assigned_perms := '["all_privileges"]'::jsonb;
  ELSE
    assigned_role := 'alumno'::user_role;
    assigned_perms := '["view_content"]'::jsonb;
  END IF;

  -- Insertar en la tabla pública de perfiles. Si hay conflicto de email, actualiza el perfil existente de forma segura.
  INSERT INTO public.profiles (id, email, role, permissions, updated_at)
  VALUES (new.id, new.email, assigned_role, assigned_perms, now())
  ON CONFLICT (email) DO UPDATE
  SET id = EXCLUDED.id, role = EXCLUDED.role, permissions = EXCLUDED.permissions, updated_at = now();

  -- Sincronizar el rol en la metadata de autenticación de forma segura y tolerante a fallos
  BEGIN
    UPDATE auth.users
    SET raw_app_meta_data = COALESCE(raw_app_meta_data, '{}'::jsonb) || jsonb_build_object('role', assigned_role::text)
    WHERE id = new.id;
  EXCEPTION WHEN OTHERS THEN
    -- Si por bloqueos transaccionales falla la metadata, no abortamos el registro del usuario
  END;

  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
