import admin from 'firebase-admin';
import fs from 'fs';
import path from 'path';

let serviceAccountJson: admin.ServiceAccount | null = null;

const serviceAccountPath = path.resolve(process.cwd(), 'service-account.json');
console.log('DEBUG: Checking for service-account.json at:', serviceAccountPath);
if (fs.existsSync(serviceAccountPath)) {
  try {
    const file = fs.readFileSync(serviceAccountPath, 'utf8');
    serviceAccountJson = JSON.parse(file);
    console.log('DEBUG: Using service-account.json for Firebase Admin SDK');
  } catch (err) {
    console.error('DEBUG: Failed to read or parse service-account.json:', err);
  }
} else {
  console.log('DEBUG: service-account.json NOT found.');
}

console.log('DEBUG: Checking FIREBASE_ADMIN_CREDENTIALS_BASE64...');
console.log('DEBUG: process.env.FIREBASE_ADMIN_CREDENTIALS_BASE64 value (first 20 chars):', 
             typeof process.env.FIREBASE_ADMIN_CREDENTIALS_BASE64 === 'string' ? 
             process.env.FIREBASE_ADMIN_CREDENTIALS_BASE64.substring(0, 20) + '...' : 
             process.env.FIREBASE_ADMIN_CREDENTIALS_BASE64);
console.log('DEBUG: Type of FIREBASE_ADMIN_CREDENTIALS_BASE64:', typeof process.env.FIREBASE_ADMIN_CREDENTIALS_BASE64);
console.log('DEBUG: Is FIREBASE_ADMIN_CREDENTIALS_BASE64 undefined?', process.env.FIREBASE_ADMIN_CREDENTIALS_BASE64 === undefined);
console.log('DEBUG: Is FIREBASE_ADMIN_CREDENTIALS_BASE64 an empty string?', process.env.FIREBASE_ADMIN_CREDENTIALS_BASE64 === '');

if (!serviceAccountJson && process.env.FIREBASE_ADMIN_CREDENTIALS_BASE64) {
  console.log('DEBUG: FIREBASE_ADMIN_CREDENTIALS_BASE64 environment variable is detected and serviceAccountJson is null.');
  console.log('DEBUG: Length of Base64 string:', process.env.FIREBASE_ADMIN_CREDENTIALS_BASE64.length);
  try {
    const decoded = Buffer.from(
      process.env.FIREBASE_ADMIN_CREDENTIALS_BASE64,
      'base64'
    ).toString('utf-8');
    
    serviceAccountJson = JSON.parse(decoded);
    console.log('DEBUG: Successfully parsed FIREBASE_ADMIN_CREDENTIALS_BASE64.');
  } catch (err) {
    console.error('DEBUG: Failed to decode or parse FIREBASE_ADMIN_CREDENTIALS_BASE64:', err);
  }
} else if (!serviceAccountJson) {
  console.log('DEBUG: FIREBASE_ADMIN_CREDENTIALS_BASE64 is NOT present or serviceAccountJson already obtained.');
}

if (!serviceAccountJson) {
  console.error('DEBUG: Final check: serviceAccountJson is still null. Throwing error.');
  throw new Error(
    'Firebase Admin SDK credentials are not provided via Base64 environment variable or local file.'
  );
}

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccountJson),
  });
  console.log('DEBUG: Firebase Admin SDK initialized successfully!');
} else {
  console.log('DEBUG: Firebase Admin SDK already initialized.');
}

const adminDb = admin.firestore();

export { adminDb, admin };