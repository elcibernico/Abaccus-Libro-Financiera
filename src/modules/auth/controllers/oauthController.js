// oauthController.js - Controla el flujo y la API de autenticación
import { supabase } from '@/core/security/supabaseClient';

/**
 * Inicia el inicio de sesión con un proveedor OAuth.
 * @param {'google'|'azure'|'yahoo'|'github'|'dropbox'|'smartsheet'|'box'|'salesforce'} provider Proveedor de OAuth
 * @returns {Promise<{success: boolean, error?: string}>}
 */
export async function signInWithOAuthProvider(provider) {
  try {
    let supabaseProvider = provider;
    let options = {
      redirectTo: `${window.location.origin}/auth/callback`,
    };

    // Mapeos especiales si Supabase usa nombres diferentes
    if (provider === 'azure') {
      supabaseProvider = 'azure'; // Microsoft AD
    } else if (provider === 'yahoo') {
      // Yahoo se usa como Custom Provider OIDC
      // Se debe usar la redirección manual configurada en Supabase o el flujo OIDC
      supabaseProvider = 'keycloak'; // O el provider_id del custom provider. Supabase usa custom OIDC como:
      // provider: 'oidc' o el nombre del custom provider
      supabaseProvider = 'yahoo'; // OIDC mapeado
    }

    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: supabaseProvider,
      options
    });

    if (error) throw error;
    return { success: true, data };
  } catch (error) {
    console.error(`[OAuth Signin Error] Error iniciando sesión con ${provider}:`, error.message);
    return { success: false, error: error.message };
  }
}

/**
 * Inicia el login passwordless (OTP / Magic Link) para correos específicos (ej. Ciudad/Arnet).
 * @param {string} email Correo electrónico
 * @returns {Promise<{success: boolean, error?: string}>}
 */
export async function signInWithEmailOtp(email) {
  try {
    const cleanEmail = email.toLowerCase().trim();
    const { data, error } = await supabase.auth.signInWithOtp({
      email: cleanEmail,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      }
    });

    if (error) throw error;
    return { success: true, data };
  } catch (error) {
    console.error('[OTP Signin Error] Error al enviar Magic Link/OTP:', error.message);
    return { success: false, error: error.message };
  }
}

/**
 * Cierra la sesión activa del usuario.
 * @returns {Promise<{success: boolean, error?: string}>}
 */
export async function signOutUser() {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    return { success: true };
  } catch (error) {
    console.error('[Signout Error] Error al cerrar sesión:', error.message);
    return { success: false, error: error.message };
  }
}

/**
 * Obtiene la sesión y el usuario actual.
 * @returns {Promise<object|null>}
 */
export async function getCurrentUser() {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    return user;
  } catch (error) {
    console.error('[Get Current User Error]:', error);
    return null;
  }
}
