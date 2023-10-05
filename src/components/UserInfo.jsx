import React, { useEffect, useState } from "react";
import { getAuth, signOut } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";

export const UserInfo = ({ user }) => {
  const navigate = useNavigate();
  const auth = getAuth();
  const [photoURL, setPhotoURL] = useState(user?.photoURL);

  useEffect(() => {
    setPhotoURL(user?.photoURL);
  }, [user]);

  return user ? (
    <div className="navUserInfo">
      <div className="img-container">
        <img src={photoURL} alt="" />
      </div>

      <div className="submenu">
        <div>{user?.displayName ? user.displayName : user?.email}</div>
        <div>▼</div>
        <div className="submenu-buttons">
          <Link to="/chat">
            <button className="chat-button">Общий чат</button>
          </Link>
          <Link to="/profile">
            <button className="chat-button">Мой профиль</button>
          </Link>
          <button
            onClick={async () => {
              await signOut(auth);
              navigate("/");
            }}
            className="logout-button"
          >
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
