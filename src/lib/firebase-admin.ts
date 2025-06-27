import * as admin from 'firebase-admin';
import { credential, ServiceAccount } from 'firebase-admin';

let serviceAccountJson: ServiceAccount | undefined;

if (process.env.NODE_ENV === 'development') {
  try {
    const localServiceAccount = require('../../basse-brodd-firebase-adminsdk-fbsvc-f67d5bffe1.json');
    serviceAccountJson = localServiceAccount as ServiceAccount;
  } catch (e) {
    console.warn('Local Firebase service account file not found. Falling back to environment variable for local development if set.');

  }
}

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
    } else if (serviceAccountJson) {
      credentialsToUse = serviceAccountJson;
    } else {
      throw new Error('Firebase Admin SDK credentials are not provided via file or environment variable.');
    }

    admin.initializeApp({
      credential: credential.cert(credentialsToUse),
    });
    console.log('Firebase Admin SDK initialized successfully.');
  } catch (error) {
    console.error('Firebase Admin SDK initialization error:', error);
    throw new Error('Failed to initialize Firebase Admin SDK.');
  }
}

const adminDb = admin.firestore();
export { adminDb };