import { useAuthState } from "react-firebase-hooks/auth";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../config/firebase.ts";
import React, { useState } from "react";
import { Timestamp, addDoc, collection } from "firebase/firestore";

export const Admin = () => {
  let [user] = useAuthState(auth);
  const navigate = useNavigate();

  if (user?.uid !== "dCQj6kSxTTM4fEtMr50lHOgMcgz1") {
    navigate("/profile");
  }

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [group, setGroup] = useState("");
  

  const onCreateUser = async (e) => {
    e.preventDefault();

    try {
      const password = document.querySelector(".birthDate").value.toString();
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      console.log("User created with email and password:", user);

      await onCreateUserDoc();

      const a = getAuth();
      signOut(a)
        .then(() => {})
        .catch((error) => {});

      signInWithEmailAndPassword(auth, "admin_yana@gmail.com", "admin_yana")
        .then((userCredential) => {
          navigate("/admin");
        })
        .catch((error) => {
          // const errorCode = error.code;
          // const errorMessage = error.message;
        });
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };

  const usersRef = collection(db, "users");

  const onCreateUserDoc = async () => {
    await addDoc(usersRef, {
      displayName: name,
      realName: name,
      birthDate: Timestamp.fromDate(
        new Date(document.querySelector(".birthDate").value)
      ),
      userId: user?.uid,
      group: group,
      photoURL: "",
    });
  };

  return (
    <main>
      <div></div>
      <div className="wrapper wrapperAdmin">
        <form onSubmit={onCreateUser}>
          <input
            type="text"
            placeholder="Имя"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="name"
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="email"
          />
          <input
            type="text"
            placeholder="Группа"
            value={group}
            onChange={(e) => setGroup(e.target.value)}
            required
            className="group"
          />
          <input type="date" required className="birthDate" />
          <button>Добавить пользователя</button>
        </form>
      </div>
      <div></div>
    </main>
  );
};
