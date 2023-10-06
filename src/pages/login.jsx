import { auth } from "./../config/firebase.ts";
import { useAuthState } from "react-firebase-hooks/auth";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
export const Login = () => {
  // let [user] = useAuthState(auth);
  // const a = getAuth();
  const navigate = useNavigate();

  return (
    <main>
      <div></div>
      <div className="wrapper wrapperLogin">
        <form>
          <input type="text" placeholder="Email" className="email" />
          <input type="password" placeholder="Password" className="password" />
          <button
            onClick={(e) => {
              e.preventDefault();
              const email = document.querySelector(".email").value;
              const password = document.querySelector(".password").value;

              signInWithEmailAndPassword(getAuth(), email, password)
                .then((userCredential) => {
                  // Signed in
                  const user = userCredential.user;
                  console.log(user);
                  // ...
                })
                .catch((error) => {
                  const errorCode = error.code;
                  const errorMessage = error.message;
                  console.log(errorCode, errorMessage);
                });

              navigate("/profile");
            }}
          >
            Войти
          </button>
        </form>
      </div>
      <div></div>
    </main>
  );
};
