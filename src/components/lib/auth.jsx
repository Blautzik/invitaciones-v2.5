import { getAuth, onAuthStateChanged } from 'firebase/auth';

export const authenticate = async () => {
  return new Promise((resolve) => {
    const auth = getAuth();

    onAuthStateChanged(auth, (user) => {
      resolve(user);
    });
  });
};