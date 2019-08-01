const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

const firestore = admin.firestore();

exports.onUserStatusChanged = functions.database.ref('/nguoi-la-onlines/{uid}').onUpdate(
  async (change, context) => {
    const eventStatus = change.after.val();
    const userStatusFirestoreRef = firestore.doc(`nguoi-la-onlines/${context.params.uid}`);

    if (eventStatus.state === 'OFFLINE') {
      return userStatusFirestoreRef.delete();
    }

    return null
  }
);