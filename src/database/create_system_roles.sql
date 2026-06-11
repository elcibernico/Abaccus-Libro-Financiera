-- SQL PARA CREAR LA TABLA DE ROLES DEL SISTEMA (SYSTEM_ROLES)
-- Copia y pega todo este script en el editor SQL de tu consola de Supabase (SQL Editor -> New Query -> Run)

-- 1. Crear la tabla de roles del sistema con columna is_active
create table if not exists public.system_roles (
  id text primary key, -- ej: 'root', 'admin', 'docente', 'alumno', 'guest', 'dpo', etc.
  label text,          -- Etiqueta visible (null si no está activo en este ecosistema)
  is_active boolean default false not null, -- Controla si está activo en la app
  default_permissions jsonb default '{}'::jsonb not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 2. Conceder privilegios a los roles de Supabase
grant select, insert, update, delete on public.system_roles to anon, authenticated, service_role;

-- 3. Habilitar Row Level Security (RLS)
alter table public.system_roles enable row level security;

-- 4. Políticas RLS para lectura (todos los usuarios autenticados necesitan ver los roles activos)
drop policy if exists "Permitir select a cualquier usuario autenticado en roles" on public.system_roles;
create policy "Permitir select a cualquier usuario autenticado en roles"
on public.system_roles
for select
to authenticated
using (true);

-- 5. Políticas RLS para administración (Mega admins)
drop policy if exists "Permitir todo a administradores en roles" on public.system_roles;
create policy "Permitir todo a administradores en roles"
on public.system_roles
for all
using (
  auth.jwt() ->> 'email' in (
    'ndemartis@fcecon.unr.edu.ar',
    'elcibernico@gmail.com',
    'estudiocontableid@gmail.com'
  )
);

-- 6. Insertar los 15 roles estándar (sólo los del ecosistema actual se activan y reciben label)
insert into public.system_roles (id, label, is_active, default_permissions)
values 
  ('root', 'Root', true, '{"may_view_admin_panel": true, "may_simulate_roles": true}'::jsonb),
  ('admin', 'Jefe de Cátedra', true, '{"may_view_admin_panel": true, "may_simulate_roles": true}'::jsonb),
  ('docente', 'Docente', true, '{"may_view_admin_panel": false, "may_simulate_roles": false}'::jsonb),
  ('alumno', 'Alumno', true, '{"may_view_admin_panel": false, "may_simulate_roles": false}'::jsonb),
  ('guest', 'Invitado', true, '{"may_view_admin_panel": false, "may_simulate_roles": false}'::jsonb),
  
  -- Roles inactivos/adicionales de la matriz global (sin label visible, is_active = false)
  ('dpo', null, false, '{}'::jsonb),
  ('finops', null, false, '{}'::jsonb),
  ('jefe_catedra', null, false, '{}'::jsonb),
  ('devops', null, false, '{}'::jsonb),
  ('adjunto', null, false, '{}'::jsonb),
  ('profesor', null, false, '{}'::jsonb),
  ('ayudante', null, false, '{}'::jsonb),
  ('user', null, false, '{}'::jsonb), -- 'user' mapea a 'alumno' en frontend
  ('b2b_partner', null, false, '{}'::jsonb),
  ('service_account', null, false, '{}'::jsonb),
  ('auditor', null, false, '{}'::jsonb),
  ('quarantined', null, false, '{}'::jsonb)
on conflict (id) do update set 
  label = excluded.label,
  is_active = excluded.is_active,
  default_permissions = excluded.default_permissions;

-- 7. Establecer la relación de Clave Foránea (FK) en whitelist_users
update public.whitelist_users
set role = 'guest'
where role not in (select id from public.system_roles);

alter table public.whitelist_users
  drop constraint if exists fk_whitelist_users_role,
  add constraint fk_whitelist_users_role foreign key (role) references public.system_roles(id) on update cascade;
