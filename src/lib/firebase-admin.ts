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

    if (process.env.FIREBASE_ADMIN_CREDENTIALS_BASE64) {
      try {
        const decodedCredentials = Buffer.from(process.env.FIREBASE_ADMIN_CREDENTIALS_BASE64, 'base64').toString('utf-8');
        credentialsToUse = JSON.parse(decodedCredentials) as ServiceAccount;
      } catch (decodeParseError) {
        console.error("Error decoding or parsing FIREBASE_ADMIN_CREDENTIALS_BASE64 from environment variable:", decodeParseError);
        throw new Error("Failed to decode or parse Base64 Firebase Admin credentials.");
      }
    } else if (serviceAccountJson) {
      credentialsToUse = serviceAccountJson;
    } else {
      throw new Error('Firebase Admin SDK credentials are not provided via Base64 environment variable or local file.');
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