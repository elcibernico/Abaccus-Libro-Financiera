-- SQL PARA SOLUCIONAR PERMISOS DE TABLA DE IPS (WHITELIST_IPS)
-- Copia y pega todo este script en el editor SQL de tu consola de Supabase (SQL Editor -> New Query -> Run)

-- 1. Crear la tabla de IPs si por casualidad no existe
create table if not exists public.whitelist_ips (
  id uuid default gen_random_uuid() primary key,
  ip_address text not null,
  description text,
  created_by text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 2. Conceder privilegios a los roles de Supabase (CRÍTICO para evitar "permission denied")
grant select, insert, update, delete on public.whitelist_ips to anon, authenticated, service_role;

-- 3. Habilitar Row Level Security (RLS)
alter table public.whitelist_ips enable row level security;

-- 4. Políticas RLS para lectura (permitir leer a usuarios logueados o a todos si es necesario para el login)
drop policy if exists "Permitir select a cualquier usuario" on public.whitelist_ips;
create policy "Permitir select a cualquier usuario"
on public.whitelist_ips
for select
using (true);

-- 5. Políticas RLS para escritura (permitir a administradores)
drop policy if exists "Permitir todo a administradores en whitelist_ips" on public.whitelist_ips;
create policy "Permitir todo a administradores en whitelist_ips"
on public.whitelist_ips
for all
using (
  auth.jwt() ->> 'email' in (
    'ndemartis@fcecon.unr.edu.ar',
    'elcibernico@gmail.com',
    'estudiocontableid@gmail.com'
  )
);
