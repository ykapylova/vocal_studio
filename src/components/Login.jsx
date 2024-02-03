import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {

  }, [email, password])

  return (
    <form>
      <input
        type="text"
        placeholder="admin"
        className="email"
        onChange={(e) => setEmail(e.target.value + "@tiptop-crystal.com")}
      />
      <input
        type="text"
        placeholder="admin_"
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
              navigate("/profile");
              // ...
            })
            .catch((error) => {
              console.log(email + " " + password);
              const errorCode = error.code;
              const errorMessage = error.message;
              console.log(errorCode + errorMessage);
              navigate("/");
              console.log(document.querySelector(".email").value)
              document.querySelector(".email").value = "";
              document.querySelector(".password").value = "";
              setEmail("");
              setPassword("");
            });
        }}
      >
        Войти
      </button>
    </form>
  );
};
