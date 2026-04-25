import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import { doc, getDoc, serverTimestamp, setDoc } from 'firebase/firestore';
import { auth, db } from '../services/firebase';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (firebaseUser) => {
      try {
        if (!firebaseUser) {
          setUser(null);
          setProfile(null);
          return;
        }

        setUser(firebaseUser);

        const userRef = doc(db, 'users', firebaseUser.uid);
        let profileSnap = await getDoc(userRef);

        if (!profileSnap.exists()) {
          await setDoc(userRef, {
            email: firebaseUser.email ?? '',
            role: 'worker',
            createdAt: serverTimestamp(),
          });
          profileSnap = await getDoc(userRef);
        }

        setProfile(profileSnap.exists() ? profileSnap.data() : null);
      } catch (err) {
        console.error('Failed to initialize auth profile', err);
      } finally {
        setLoading(false);
      }
    });

    return () => unsub();
  }, []);

  const value = useMemo(
    () => ({
      user,
      profile,
      loading,
      login: (email, password) => signInWithEmailAndPassword(auth, email, password),
      signup: async (email, password) => {
        const cred = await createUserWithEmailAndPassword(auth, email, password);
        return cred.user;
      },
      logout: () => signOut(auth),
      isAdmin: profile?.role === 'admin',
      isWorker: profile?.role === 'worker',
    }),
    [user, profile, loading],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);
