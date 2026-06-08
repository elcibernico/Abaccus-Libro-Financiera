// supabaseServer.js - Inicialización del cliente Supabase del lado del servidor para Next.js
import { createServerClient } from '@supabase/ssr';
import { createClient as createSupabaseClient } from '@supabase/supabase-js';
import { cookies } from 'next/headers';

export async function createClient() {
  const cookieStore = await cookies();

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error('[Supabase Error]: NEXT_PUBLIC_SUPABASE_URL o NEXT_PUBLIC_SUPABASE_ANON_KEY no configurados en las variables de entorno.');
  }

  return createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) => {
            cookieStore.set(name, value, options);
          });
        } catch (error) {
          // El método setAll puede fallar si se llama desde un Server Component
          // que ya se está renderizando (donde las cookies no se pueden escribir).
          // Es manejado de manera segura.
        }
      },
    },
  });
}

export async function createAdminClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl) {
    throw new Error('[Supabase Error]: NEXT_PUBLIC_SUPABASE_URL no configurado.');
  }

  if (!supabaseServiceKey) {
    console.warn('[Supabase Warning]: SUPABASE_SERVICE_ROLE_KEY no configurado en env.local. Se usará el cliente anon.');
    return null;
  }

  return createSupabaseClient(supabaseUrl, supabaseServiceKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
}

