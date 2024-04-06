import admin from 'firebase-admin';

admin.initializeApp({
  credential: admin.credential.cert(require('../../serviceAccountKey.json')),
});

const firebaseAdmin = admin.app();

export { firebaseAdmin };
