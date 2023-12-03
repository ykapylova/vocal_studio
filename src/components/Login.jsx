import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // document.querySelector(".email").value + "@tiptop-crystal.com";
  // document.querySelector(".password").value;

  return (
    <form>
      <input
        type="text"
        placeholder="Email"
        className="email"
        onChange={(e) => setEmail(e.target.value + "@tiptop-crystal.com")}
      />
      <input
        type="password"
        placeholder="Password"
        className="password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button
        onClick={(e) => {
          e.preventDefault();

          signInWithEmailAndPassword(getAuth(), email, password)
            .then((userCredential) => {
              // Signed in
              const user = userCredential.user;
              console.log(user);
              // ...
            })
            .catch((error) => {
              console.log(email + " " + password);
              const errorCode = error.code;
              const errorMessage = error.message;
              console.log(errorCode + errorMessage);
            });

          navigate("/profile");
        }}
      >
        Войти
      </button>
    </form>
  );
};
