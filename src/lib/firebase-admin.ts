import * as admin from 'firebase-admin';
import { credential, ServiceAccount } from 'firebase-admin';
import * as fs from 'fs'; 
import * as path from 'path'; 

let serviceAccountJson: ServiceAccount | undefined;

if (process.env.NODE_ENV === 'development') {
  try {
    const serviceAccountPath = path.resolve(process.cwd(), 'basse-brodd-firebase-adminsdk-fbsvc-f67d5bffe1.json');
    const localServiceAccountContent = fs.readFileSync(serviceAccountPath, 'utf8');
    serviceAccountJson = JSON.parse(localServiceAccountContent) as ServiceAccount;
    console.log('Local Firebase service account file loaded successfully for development.');
  } catch (_e) { 
    console.warn('Local Firebase service account file not found or could not be parsed. Falling back to environment variable for local development if set. Error: ', (_e as Error).message);
  }
}

if (!admin.apps.length) {
  try {
    let credentialsToUse: ServiceAccount;

    if (process.env.FIREBASE_ADMIN_CREDENTIALS_BASE64) {
      try {
        const decodedCredentials = Buffer.from(process.env.FIREBASE_ADMIN_CREDENTIALS_BASE64, 'base64').toString('utf-8');
        credentialsToUse = JSON.parse(decodedCredentials) as ServiceAccount;
        console.log('Firebase Admin SDK credentials loaded from Base64 environment variable.');
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