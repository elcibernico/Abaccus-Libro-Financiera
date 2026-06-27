// firestore.js - Inicialización y Cliente de Firebase Firestore optimizado para la arquitectura modular

import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore, collection, getDocs, doc, getDoc, setDoc, query, where } from 'firebase/firestore';
import { getAuth, signInWithCustomToken, signInAnonymously } from 'firebase/auth';
import { getEnv } from '../../core/config/env';

// Configuración de Firebase leída desde variables de entorno
const firebaseConfig = {
  apiKey: getEnv('FIREBASE_API_KEY'),
  authDomain: getEnv('FIREBASE_AUTH_DOMAIN'),
  projectId: getEnv('FIREBASE_PROJECT_ID'),
  storageBucket: getEnv('FIREBASE_STORAGE_BUCKET'),
  messagingSenderId: getEnv('FIREBASE_MESSAGING_SENDER_ID'),
  appId: getEnv('FIREBASE_APP_ID')
};

// Inicialización de la App de Firebase (patrón Singleton)
export const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
export const db = getFirestore(app);
export const auth = getAuth(app);

/**
 * Autentica al usuario de forma segura antes de realizar operaciones de lectura/escritura.
 * @param {string} customToken Token de autenticación provisto por el backend (opcional)
 */
export async function authenticateFirebase(customToken = '') {
  try {
    if (customToken) {
      await signInWithCustomToken(auth, customToken);
    } else {
      await signInAnonymously(auth);
    }
  } catch (error) {
    console.error('[Firestore Auth Error]: Falló la autenticación en Firebase.', error);
  }
}

/**
 * Resuelve la ruta estricta de colección obligatoria del módulo de base de datos.
 * @param {string} collectionName Nombre de la colección (tabla)
 * @param {boolean} isPublic Si la tabla es de acceso público o privado por usuario
 * @param {string} userId UID del usuario (requerido si isPublic es false)
 * @returns {string} Ruta absoluta de la colección en Firestore
 */
export function getStrictCollectionPath(collectionName, isPublic = true, userId = '') {
  const appId = getEnv('NEXT_PUBLIC_APP_ID', 'libro_financiera');
  
  if (isPublic) {
    return `/artifacts/${appId}/public/data/${collectionName}`;
  } else {
    if (!userId && auth.currentUser) {
      userId = auth.currentUser.uid;
    }
    if (!userId) {
      throw new Error('[Firestore Path Error]: Se requiere un userId válido para colecciones privadas.');
    }
    return `/artifacts/${appId}/users/${userId}/${collectionName}`;
  }
}
