import * as admin from 'firebase-admin';
import { credential, ServiceAccount } from 'firebase-admin';

if (!admin.apps.length) {
  try {
    let credentialsToUse: ServiceAccount;

    if (process.env.FIREBASE_ADMIN_CREDENTIALS) {
      try {
        credentialsToUse = JSON.parse(process.env.FIREBASE_ADMIN_CREDENTIALS as string) as ServiceAccount;
      } catch (parseError) {
        console.error("Error parsing FIREBASE_ADMIN_CREDENTIALS from environment variable:", parseError);
        throw new Error("Failed to parse Firebase Admin credentials from environment variable.");
      }
    } else {
      throw new Error('Firebase Admin SDK credentials are not provided via FIREBASE_ADMIN_CREDENTIALS environment variable. This is required for server-side operations.');
    }

    admin.initializeApp({
      credential: credential.cert(credentialsToUse),
    });
    console.log('Firebase Admin SDK initialized successfully.');
  } catch (error) {
    console.error('Firebase Admin SDK initialization error:', error);
    throw error;
  }
}

export default admin.firestore();