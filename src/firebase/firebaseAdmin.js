import { initializeApp, credential } from 'firebase-admin';

const firebaseAdminConfig = {
  credential: credential.cert({
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    clientEmail: process.env.NEXT_PUBLIC_FIREBASE_CLIENT_EMAIL,
    privateKey: process.env.NEXT_PUBLIC_FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'), // Replace '\\n' with actual newline character
  }),
  databaseURL: process.env.FIREBASE_DATABASE_URL,
};

const firebaseAdminApp = initializeApp(firebaseAdminConfig);

export { firebaseAdminApp };