import { Link, useLocation } from "react-router-dom";
import { Nav } from "./Nav";
import { auth, provider } from "./../config/firebase.ts";
import { signInWithPopup } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { signOut } from "firebase/auth";

const UserInfo = () => {
  const [user] = useAuthState(auth);

  const signInWithGoogle = async () => {
    const result = await signInWithPopup(auth, provider);
    console.log(result);
  };

  return user ? (
    <div className="navUserInfo">
      <img src={user?.photoURL || ""} />

      <div className="submenu">
        <div>{user?.displayName}</div>
        <div>▼</div>
        <div className="submenu-buttons">
          <button className="chat-button">
            <Link to={"/chat"}>Чат</Link>
          </button>
          <button className="schedule-button">
            <Link to={"/schedule"}>Моё расписание</Link>
          </button>
          <button
            onClick={async () => await signOut(auth)}
            className="logout-button"
          >
            Выйти из аккаунта
          </button>
        </div>
      </div>
    </div>
  ) : (
    <button onClick={signInWithGoogle} className="signin-button">
      Вход
    </button>
  );
};

export const Header = () => {
  if (useLocation().pathname === "/") {
    return null;
  }

  return (
    <header>
      <Link to="/" onClick={window.location.reload}>
        <img src="logo.jpg" alt="" />
      </Link>
      <Nav />
      <UserInfo />
    </header>
  );
};
