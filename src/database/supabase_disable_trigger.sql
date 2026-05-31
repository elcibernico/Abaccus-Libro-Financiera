-- Desactivar y eliminar el trigger conflictivo para permitir registros limpios
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
