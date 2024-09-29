import { initializeApp } from "firebase/app";
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signOut,
} from "firebase/auth";

const config = useRuntimeConfig();

const app = initializeApp(JSON.parse(config.public.firebaseConfig));

const auth = getAuth();

export const useFirebaseAuth = () => {
  /**
   * Google login
   */
  const loginWithGoogle = async (e: MouseEvent) => {
    e.stopImmediatePropagation();
    const provider = new GoogleAuthProvider();

    const res = await signInWithPopup(auth, provider);

    const idToken = await res.user.getIdToken();

    return idToken;
  };

  /**
   * Firebase logout
   */
  const firebaseLogout = async () => {
    await signOut(auth);
  };

  return { app, loginWithGoogle, firebaseLogout };
};
