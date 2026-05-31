-- Trigger simplificado y ultra seguro sin modificaciones a auth.users para evitar bloqueos
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

  -- Insertar o actualizar el perfil en la tabla pública
  INSERT INTO public.profiles (id, email, role, permissions, updated_at)
  VALUES (new.id, new.email, assigned_role, assigned_perms, now())
  ON CONFLICT (email) DO UPDATE
  SET id = EXCLUDED.id, role = EXCLUDED.role, permissions = EXCLUDED.permissions, updated_at = now();

  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
