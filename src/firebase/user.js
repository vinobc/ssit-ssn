import { firestore, storage } from "./config";

export const createUserDocument = async (user) => {
  //get a ref. to the firestore doc.
  const docRef = firestore.doc(`/users/${user.uid}`);

  //create user object
  const userProfile = {
    uid: user.uid,
    email: user.email,
    name: user.displayName,
    address: "",
    city: "",
    state: "",
    zip: "",
    phone: "",
    uit1501: "",
    uit1502: "",
    uit1503: "",
    uit1504: "",
    uit1505: "",
    uit1522: "",
    uit1701: "",
    uit1702: "",
    uit1723: "",
    cifat: "",
    cipos: "",
    cicna: "",
    cidsp: "",
    ciai: "",
    cidc: "",
    ciccv: "",
    cins: "",
    cido: "",
    ts: "",
    sem: "",
    rn: "",
    date: "",
    // speciality: "",
    // ip: "",
  };

  //write to cloud firestore
  return docRef.set(userProfile);
};

export const updateUserDocument = async (user) => {
  const docRef = firestore.doc(`/users/${user.uid}`);
  return docRef.update(user);
};

export const uploadImage = (userId, file, progress) => {
  return new Promise((resolve, reject) => {
    // create file reference
    const filePath = `users/${userId}/profile-image`;
    const fileRef = storage.ref().child(filePath);

    // upload task
    const uploadTask = fileRef.put(file);

    uploadTask.on(
      "state_changed",
      (snapshot) => progress(snapshot),
      (error) => reject(error),
      () => {
        resolve(uploadTask.snapshot.ref);
      }
    );
  });
};

export const getDownloadUrl = (userId) => {
  const filePath = `users/${userId}/profile-image`;
  return storage.ref().child(filePath).getDownloadURL();
};
