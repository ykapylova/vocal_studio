import { useAuthState } from "react-firebase-hooks/auth";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../config/firebase.ts";
import React, { useState } from "react";

export const Admin = () => {
  let [user] = useAuthState(auth);
  const navigate = useNavigate();

  if (user?.uid != "ftSBNiBcMIPk6NxxCK4XB0w0Q0v1") {
    navigate("/login");
  }

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignUp = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      console.log("User created with email and password:", user);
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };

  return (
    <main>
      <div></div>
      <div className="wrapper wrapperAdmin">
        <form>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={handleSignUp}>Добавить пользователя</button>
        </form>
      </div>
      <div></div>
    </main>
  );

  // return (
  //   <form onSubmit={handleSubmit(onCreateUser)}>
  //     <input type="email" placeholder="Email" className="email" {...register("email")}/>
  //     <input type="password" placeholder="Password" className="password" {...register("password")}/>
  //     <input type="submit" value="Добавить пользователя"/>
  //   </form>
  // );
};
