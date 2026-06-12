-- ==============================================================================
-- SCRIPT DE MIGRACIÓN: SISTEMA DE ROLES Y PERMISOS (RBAC) - ROOT
-- Ejecutar este script en el SQL Editor de Supabase
-- ==============================================================================

-- 1. Asegurarnos que la tabla `system_roles` tiene los 15 roles.
-- Los que NO se usan tienen el label como su propio ID (ej: 'dpo' -> 'dpo').
insert into public.system_roles (id, label, is_active)
values 
  ('root', 'Root', true),
  ('admin', 'Admin', true),
  ('alumno', 'Alumno', true),
  ('docente', 'docente', false),
  ('guest', 'guest', false),
  ('dpo', 'dpo', false),
  ('finops', 'finops', false),
  ('jefe_catedra', 'jefe_catedra', false),
  ('devops', 'devops', false),
  ('adjunto', 'adjunto', false),
  ('profesor', 'profesor', false),
  ('ayudante', 'ayudante', false),
  ('user', 'user', false), 
  ('b2b_partner', 'b2b_partner', false),
  ('service_account', 'service_account', false),
  ('auditor', 'auditor', false),
  ('quarantined', 'quarantined', false)
on conflict (id) do update set 
  label = excluded.label,
  is_active = excluded.is_active;

-- (Opcional) Limpiar la columna vieja JSONB de default_permissions si existe para evitar confusión
-- ALTER TABLE public.system_roles DROP COLUMN IF EXISTS default_permissions;


-- 2. Crear Tabla Maestra de Permisos (Catálogo de todos los permisos posibles)
create table if not exists public.permissions (
  name text primary key,
  description text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Pre-poblar los permisos que usaremos
insert into public.permissions (name, description) values
  ('manage_users', 'Permite ver, aceptar o rechazar usuarios en el panel admin'),
  ('manage_roles', 'Permite cambiar roles de otros usuarios y asignar excepciones'),
  ('view_metrics', 'Permite ver dashboards y métricas de uso'),
  ('edit_content', 'Permite editar contenido del simulador'),
  ('access_libro', 'Permite el acceso al contenido principal del simulador financiero')
on conflict do nothing;


-- 3. Crear Tabla Específica: PERMISOS POR ROL
create table if not exists public.roles_permissions (
  role_id text references public.system_roles(id) on delete cascade on update cascade,
  permission_name text references public.permissions(name) on delete cascade on update cascade,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  primary key (role_id, permission_name)
);

-- Limpiar permisos anteriores por si corremos el script de nuevo
delete from public.roles_permissions;

-- Asignar permisos al rol ROOT (Poder Absoluto)
insert into public.roles_permissions (role_id, permission_name) values
  ('root', 'manage_users'),
  ('root', 'manage_roles'),
  ('root', 'view_metrics'),
  ('root', 'edit_content'),
  ('root', 'access_libro');

-- Asignar permisos al rol ADMIN (Limitado)
insert into public.roles_permissions (role_id, permission_name) values
  ('admin', 'manage_users'),
  ('admin', 'view_metrics'),
  ('admin', 'access_libro');

-- Asignar permisos al rol ALUMNO
insert into public.roles_permissions (role_id, permission_name) values
  ('alumno', 'access_libro');


-- 4. Crear Tabla Específica: PERMISOS POR EXCEPCIÓN (Overrides granulares)
create table if not exists public.user_custom_permissions (
  user_email text references public.whitelist_users(email) on delete cascade on update cascade,
  permission_name text references public.permissions(name) on delete cascade on update cascade,
  is_granted boolean not null default true, -- true = concedido extra, false = denegado expresamente (aunque su rol lo tenga)
  granted_by text, -- email del Root/Admin que otorgó la excepción
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  primary key (user_email, permission_name)
);


-- ==============================================================================
-- POLÍTICAS DE SEGURIDAD (RLS)
-- ==============================================================================

-- RLS para permissions
alter table public.permissions enable row level security;
drop policy if exists "Lectura pública de permissions" on public.permissions;
create policy "Lectura pública de permissions" on public.permissions for select using (true);

-- RLS para roles_permissions
alter table public.roles_permissions enable row level security;
drop policy if exists "Lectura pública de roles_permissions" on public.roles_permissions;
create policy "Lectura pública de roles_permissions" on public.roles_permissions for select using (true);

drop policy if exists "Admins manejan roles_permissions" on public.roles_permissions;
create policy "Admins manejan roles_permissions" on public.roles_permissions for all using (
  auth.jwt() ->> 'email' in ('ndemartis@fcecon.unr.edu.ar', 'elcibernico@gmail.com')
);

-- RLS para user_custom_permissions
alter table public.user_custom_permissions enable row level security;
drop policy if exists "Lectura pública de user_custom_permissions" on public.user_custom_permissions;
create policy "Lectura pública de user_custom_permissions" on public.user_custom_permissions for select using (true);

drop policy if exists "Admins manejan user_custom_permissions" on public.user_custom_permissions;
create policy "Admins manejan user_custom_permissions" on public.user_custom_permissions for all using (
  auth.jwt() ->> 'email' in ('ndemartis@fcecon.unr.edu.ar', 'elcibernico@gmail.com')
);
