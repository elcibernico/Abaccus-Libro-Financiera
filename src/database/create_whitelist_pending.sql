-- SQL PARA SOLUCIONAR PERMISOS DE TABLAS Y CREAR LA COLA DE PENDIENTES
-- Copia y pega todo este script en el editor SQL de tu consola de Supabase (SQL Editor -> New Query -> Run)

-- 1. Crear la tabla de pendientes si no existe
create table if not exists public.whitelist_pending (
  id uuid default gen_random_uuid() primary key,
  email text not null unique,
  name text,
  celular text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 2. Asegurar que las tablas tengan privilegios para los roles de Supabase
-- Si PostgreSQL deniega el acceso a nivel de tabla, las políticas RLS nunca se evalúan.
grant select, insert, update, delete on public.whitelist_users to anon, authenticated, service_role;
grant select, insert, update, delete on public.whitelist_pending to anon, authenticated, service_role;

-- 3. Habilitar Row Level Security (RLS) en ambas tablas
alter table public.whitelist_users enable row level security;
alter table public.whitelist_pending enable row level security;

-- 4. Políticas para whitelist_users (Lista Blanca)
drop policy if exists "Permitir select a cualquier usuario autenticado" on public.whitelist_users;
create policy "Permitir select a cualquier usuario autenticado"
on public.whitelist_users
for select
to authenticated
using (true);

drop policy if exists "Permitir todo a administradores en whitelist_users" on public.whitelist_users;
create policy "Permitir todo a administradores en whitelist_users"
on public.whitelist_users
for all
using (
  auth.jwt() ->> 'email' in (
    'ndemartis@fcecon.unr.edu.ar',
    'elcibernico@gmail.com',
    'estudiocontableid@gmail.com'
  )
);

-- 5. Políticas para whitelist_pending (Cola de Suspenso)
drop policy if exists "Permitir inserción a usuarios autenticados" on public.whitelist_pending;
create policy "Permitir inserción a usuarios autenticados"
on public.whitelist_pending
for insert
to authenticated
with check (true);

drop policy if exists "Permitir select/delete a administradores en whitelist_pending" on public.whitelist_pending;
create policy "Permitir select/delete a administradores en whitelist_pending"
on public.whitelist_pending
for all
using (
  auth.jwt() ->> 'email' in (
    'ndemartis@fcecon.unr.edu.ar',
    'elcibernico@gmail.com',
    'estudiocontableid@gmail.com'
  )
);
