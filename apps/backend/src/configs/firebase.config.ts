import admin from 'firebase-admin';

admin.initializeApp({
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  credential: admin.credential.cert(require('../../serviceAccountKey.json')),
});

const firebaseAdmin = admin.app();

export { firebaseAdmin };
