import * as functions from 'firebase-functions';
import * as express from 'express';
import * as admin from 'firebase-admin';
import * as shortId from 'shortid';
import { isUri } from 'valid-url';

admin.initializeApp();

const app = express();

app.get('/:miniUrl', async (req, res) => {
  const miniUrl = req.params.miniUrl;
  console.log('redirecting to: ' + miniUrl);

  const fsRef = await admin
    .firestore()
    .collection('miniUrls')
    .doc(miniUrl)
    .get();

  if (fsRef.exists) {
    res.redirect(fsRef.data().longUrl);
  } else {
    res.status(404).send(new Error('URL not found'));
  }
});

export const miniUrlApp = functions.https.onRequest(app);

export const shortenUrl = functions.https.onCall(async (data, context) => {
  const longUrl = data.longUrl || null;
  if (longUrl && isUri(longUrl)) {
    let miniUrl: string;
    let fsRef: FirebaseFirestore.DocumentSnapshot;
    do {
      miniUrl = shortId.generate();
      fsRef = await admin
        .firestore()
        .collection('miniUrls')
        .doc(miniUrl)
        .get();
    } while (fsRef.exists);

    console.log(`Generating MiniURL: ${miniUrl}`);
    await fsRef.ref.set({
      longUrl,
      dateCreated: new Date(Date.now())
    });

    return {
      id: miniUrl,
      longUrl
    };
  } else {
    return new Error('Bad Request');
  }
});
