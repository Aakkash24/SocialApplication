import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

var firebaseConfig = {
  apiKey: "AIzaSyDq89xqcvWh-tcr115gt7O35XHia_MZjS0",
  authDomain: "socialapplication-10a5c.firebaseapp.com",
  projectId: "socialapplication-10a5c",
  storageBucket: "socialapplication-10a5c.appspot.com",
  messagingSenderId: "901578680890",
  appId: "1:901578680890:web:452fae6a7b3c0622c1e303",
};

// Initialize Firebase

class Fire {
  constructor() {
    firebase.initializeApp(firebaseConfig);
  }

  addPost = async ({ text, localUri }) => {
    const remoteUri = await this.uploadPhotoAsync(
      localUri,
      `photos/${this.uid}/${Date.now()}`
    );

    return new Promise((res, rej) => {
      console.log("sending: ", {
        text,
        uid: this.uid,
        timestamp: this.timestamp,
        image: remoteUri,
      });
      this.firestore
        .collection("posts")
        .add({
          text,
          uid: this.uid,
          timestamp: this.timestamp,
          image: remoteUri,
        })
        .then((ref) => {
          res(ref);
        })
        .catch((error) => {
          rej(error);
        });
    });
  };

  uploadPhotoAsync = async (uri, filename) => {
    return new Promise(async (res, rej) => {
      const response = await fetch(uri);
      const file = await response.blob();
      const path = `photos/${this.uid}/${Date.now()}.jpg`;

      let upload = firebase.storage().ref(path).put(file);

      upload.on(
        "state_changed",
        (snapshot) => {},
        (err) => {
          rej(err);
        },
        async () => {
          const url = await upload.snapshot.ref.getDownloadURL();
          res(url);
        }
      );
    });
  };

  createUser = async (user) => {
    let remoteUri = null;

    try {
      await firebase
        .auth()
        .createUserWithEmailAndPassword(user.email, user.password);

      let db = this.firestore.collection("users").doc(this.uid);

      db.set({
        name: user.name,
        email: user.email,
        avatar: null,
      });

      if (user.avatar) {
        remoteUri = await this.uploadPhotoAsync(
          user.avatar,
          `avatars/${this.uid}`
        );
        db.set({ avatar: remoteUri }, { merge: true });
      }
    } catch (error) {
      console.error(error);
      alert("Error: ", error);
    }
  };

  signOut = () => {
    firebase.auth().signOut();
  };

  get firestore() {
    return firebase.firestore();
  }

  get uid() {
    return (firebase.auth().currentUser || {}).uid;
  }

  get timestamp() {
    return Date.now();
  }
}

Fire.shared = new Fire();
export default Fire;
