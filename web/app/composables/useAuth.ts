import { getAuth, signInWithEmailAndPassword, onAuthStateChanged, type User } from 'firebase/auth';
import { app } from '~/firebase';

export const useAuth = () => {
  const auth = getAuth(app);
  const user = useState<User | null>('user', () => null);
  const loading = useState<boolean>('auth-loading', () => true);

  // Initialize auth state listener
  if (import.meta.client) {
    onAuthStateChanged(auth, (firebaseUser) => {
      user.value = firebaseUser;
      loading.value = false;
    });
  }

  const login = async (email: string, password: string) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      user.value = userCredential.user;
      return { success: true, error: null };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  };

  const logout = async () => {
    try {
      await auth.signOut();
      user.value = null;
      return { success: true, error: null };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  };

  return {
    user: readonly(user),
    loading: readonly(loading),
    login,
    logout,
  };
};
