import admin from 'firebase-admin';
import fs from 'fs';
import path from 'path';

let serviceAccountJson: admin.ServiceAccount | null = null;

const serviceAccountPath = path.resolve(process.cwd(), 'service-account.json');
if (fs.existsSync(serviceAccountPath)) {
  try {
    const file = fs.readFileSync(serviceAccountPath, 'utf8');
    serviceAccountJson = JSON.parse(file);
    console.log('Using service-account.json for Firebase Admin SDK');
  } catch (err) {
    console.error('Failed to read service-account.json:', err);
  }
}

if (!serviceAccountJson && process.env.FIREBASE_ADMIN_CREDENTIALS_BASE64) {
  try {
    const decoded = Buffer.from(
      process.env.FIREBASE_ADMIN_CREDENTIALS_BASE64,
      'base64'
    ).toString('utf-8');

    serviceAccountJson = JSON.parse(decoded);
    console.log('Using FIREBASE_ADMIN_CREDENTIALS_BASE64 for Firebase Admin SDK');
  } catch (err) {
    console.error('Failed to parse FIREBASE_ADMIN_CREDENTIALS_BASE64:', err);
  }
}

if (!serviceAccountJson) {
  throw new Error(
    'Firebase Admin SDK credentials are not provided via Base64 environment variable or local file.'
  );
}

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccountJson),
  });
}

export default admin;
