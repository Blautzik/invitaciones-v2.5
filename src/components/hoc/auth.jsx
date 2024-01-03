import { getAuth, onAuthStateChanged } from 'firebase/auth';

export const checkAuth = (callback) => {
  const auth = getAuth();
  console.log('Checking authentication status...')

  onAuthStateChanged(auth, (user) => {
    console.log('onAuthStateChanged callback triggered:', user);
    if (user) {
      // User is signed in
      callback(true);
    } else {
      // User is signed out
      callback(false);
    }
  });
};