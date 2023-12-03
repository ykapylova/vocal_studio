import { getAuth, signOut } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { Login } from "./Login";
import { admin } from "../config/firebase.ts";

export const UserInfo = () => {
  const navigate = useNavigate();
  const auth = getAuth();
  const [user] = useAuthState(auth);

  const handleSignOut = async () => {
    await signOut(auth);
    navigate("/");
  };

  // console.log(user.uid)

  return user ? (
    <div className="navUserInfo">
      <div className="img-container">
        <img src={user.photoURL || ""} alt="" />
      </div>

      <div className="submenu">
        <div>{user.displayName || user.email}</div>
        <div>▼</div>
        <div className="submenu-buttons">
          <Link to="/chat">
            <button>Чат</button>
          </Link>
          <Link to="/profile">
            <button>Профиль</button>
          </Link>
          <Link
            to={
              user.uid === admin
                ? "/schedule_admin"
                : "/schedule"
            }
          >
            <button>Расписание</button>
          </Link>
          {user.uid === admin && (
            <Link to="/admin">
              <button>Ученики</button>
            </Link>
          )}
          <button onClick={handleSignOut} className="logout-button">
            Выйти
          </button>
        </div>
      </div>
    </div>
  ) : (
    // <Link to="/login" className="signin">
    //   <div className="signin-button">Вход</div>
    // </Link>
    <div className="signin-button">
      <div>Вход</div>
      <Login />
    </div>
  );
};
