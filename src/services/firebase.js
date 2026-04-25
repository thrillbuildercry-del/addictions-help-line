import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getFunctions } from 'firebase/functions';

function sanitizeEnv(value) {
  if (typeof value !== 'string') return value;

  const trimmed = value.trim();
  if (!trimmed) return trimmed;

  const withoutTrailingComma = trimmed.endsWith(',') ? trimmed.slice(0, -1).trim() : trimmed;
  const wrappedInQuotes =
    (withoutTrailingComma.startsWith('"') && withoutTrailingComma.endsWith('"')) ||
    (withoutTrailingComma.startsWith("'") && withoutTrailingComma.endsWith("'"));

  return wrappedInQuotes ? withoutTrailingComma.slice(1, -1) : withoutTrailingComma;
}

function getRequiredEnv(name) {
  const value = sanitizeEnv(import.meta.env[name]);

  if (!value) {
    throw new Error(`Missing required Firebase env var: ${name}`);
  }

  return value;
}

const firebaseConfig = {
  apiKey: getRequiredEnv('VITE_FIREBASE_API_KEY'),
  authDomain: getRequiredEnv('VITE_FIREBASE_AUTH_DOMAIN'),
  projectId: getRequiredEnv('VITE_FIREBASE_PROJECT_ID'),
  storageBucket: getRequiredEnv('VITE_FIREBASE_STORAGE_BUCKET'),
  messagingSenderId: getRequiredEnv('VITE_FIREBASE_MESSAGING_SENDER_ID'),
  appId: getRequiredEnv('VITE_FIREBASE_APP_ID'),
  measurementId: sanitizeEnv(import.meta.env.VITE_FIREBASE_MEASUREMENT_ID),
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const functions = getFunctions(app);
