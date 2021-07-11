import firebase from "firebase/app";
import "firebase/auth";
import { createUserDocument } from "./user";

export const signup = async ({ firstName, lastName, email, password }) => {
  const signupResponse = await firebase
    .auth()
    .createUserWithEmailAndPassword(email, password);

  const usr = signupResponse.user;

  await usr.updateProfile({
    displayName: `${firstName} ${lastName}`,
  });

  await createUserDocument(usr);

  return usr;
};

export const logout = () => {
  return firebase.auth().signOut();
};

export const login = async ({ email, password }) => {
  const loginResponse = await firebase
    .auth()
    .signInWithEmailAndPassword(email, password);

  return loginResponse.user;
};
