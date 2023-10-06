import { getAuth, signOut } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";

export const UserInfo = () => {
  const navigate = useNavigate();
  const auth = getAuth();
  const [user] = useAuthState(auth);

  const handleSignOut = async () => {
    await signOut(auth);
    navigate("/");
  };

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
            <button>Общий чат</button>
          </Link>
          <Link to="/profile">
            <button>Мой профиль</button>
          </Link>
          {user.uid === "dCQj6kSxTTM4fEtMr50lHOgMcgz1" && (
            <Link to="/admin">
              <button>Добавить ученика</button>
            </Link>
          )}
          <button onClick={handleSignOut} className="logout-button">
            Выйти из аккаунта
          </button>
        </div>
      </div>
    </div>
  ) : (
    <Link to="/login" className="signin">
      <div className="signin-button">Вход</div>
    </Link>
  );
};
