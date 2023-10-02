import { Link, useLocation, useNavigate } from "react-router-dom";
import { Nav } from "./Nav";
import { auth } from "./../config/firebase.ts";
import { signOut } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";

const UserInfo = () => {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();

  return user ? (
    <div className="navUserInfo">
      <div className="img-container">
        <img src={user?.photoURL} alt="" />
      </div>

      <div className="submenu">
        <div>{user?.displayName ? user.displayName : user?.email}</div>
        <div>▼</div>
        <div className="submenu-buttons">
          <button className="chat-button">
            <Link to={"/chat"}>Общий чат</Link>
          </button>
          <button className="chat-button">
            <Link to={"/profile"}>Мой профиль</Link>
          </button>
          {/* <button className="schedule-button">
            <Link to={"/schedule"}>Моё расписание</Link>
          </button> */}
          <button
            onClick={async () => {
              await signOut(auth);
              navigate("/")
            }}
            className="logout-button"
          >
            Выйти из аккаунта
          </button>
        </div>
      </div>
    </div>
  ) : (
    <div className="signin-button">
      <Link to={"/login"}>Вход</Link>
    </div>
  );
};

export const Header = () => {
  if (useLocation().pathname === "/") {
    return null;
  }

  return (
    <header>
      <Link to="/" onClick={window.location.reload}>
        <img className="logo" src="logo.jpg" alt="" />
      </Link>
      <Nav />
      <UserInfo />
    </header>
  );
};
