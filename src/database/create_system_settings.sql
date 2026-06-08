-- SQL PARA CREAR LA TABLA DE CONFIGURACIÓN GLOBAL (SYSTEM_SETTINGS)
-- Copia y pega todo este script en el editor SQL de tu consola de Supabase (SQL Editor -> New Query -> Run)

-- 1. Crear la tabla de configuraciones del sistema
create table if not exists public.system_settings (
  id uuid default gen_random_uuid() primary key,
  key text unique not null,
  value text not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 2. Conceder privilegios a los roles de Supabase (CRÍTICO para evitar "permission denied")
grant select, insert, update, delete on public.system_settings to anon, authenticated, service_role;

-- 3. Habilitar Row Level Security (RLS)
alter table public.system_settings enable row level security;

-- 4. Políticas RLS para lectura (cualquier consulta de verificación de IP necesita leer esto antes del login)
drop policy if exists "Permitir select a cualquier usuario en settings" on public.system_settings;
create policy "Permitir select a cualquier usuario en settings"
on public.system_settings
for select
using (true);

-- 5. Políticas RLS para escritura y administración (Mega admins)
drop policy if exists "Permitir todo a administradores en settings" on public.system_settings;
create policy "Permitir todo a administradores en settings"
on public.system_settings
for all
using (
  auth.jwt() ->> 'email' in (
    'ndemartis@fcecon.unr.edu.ar',
    'elcibernico@gmail.com',
    'estudiocontableid@gmail.com'
  )
);

-- 6. Insertar la configuración inicial para el bloqueo por IP por defecto en true
insert into public.system_settings (key, value)
values ('enable_ip_restriction', 'true')
on conflict (key) do update set value = excluded.value;
