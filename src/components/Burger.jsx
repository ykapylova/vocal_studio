import { getAuth, signOut } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, useNavigate } from "react-router-dom";
import { admin } from "../config/firebase.ts";
import { Login } from "./Login.jsx";
import { useEffect, useState } from "react";

export const Burger = () => {
  const auth = getAuth();
  const [user] = useAuthState(auth);
  const [disableScroll, setDisableScroll] = useState(false);
  const [burgerActive, setBurgerActive] = useState(false);

  const handleCheckboxChange = () => {
    setBurgerActive(!burgerActive);
  };

  

  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut(auth);
    navigate("/");
  };

  useEffect(() => {
    document.body.style.overflow = burgerActive ? "hidden" : "";
    document.body.querySelector(".menu-items").style.transform = burgerActive
      ? "translate(0%)"
      : "translate(-150%)";

    return () => {
      document.body.style.overflow = "";
    };
  }, [disableScroll, burgerActive]);

  const navItemsList = {
    about: "О студии",
    team: "Наша команда",
    media: "Галерея",
    contacts: "Контакты",
  };

  const handleLinkClick = () => {
    setBurgerActive(false);
  };

//   document.addEventListener("DOMContentLoaded", function () {
//     // Получаем ссылки в блоке nav
//     let navLinks = document.querySelectorAll(".menu-items a");

//     // Присваиваем функцию обработчика событий клика каждой ссылке
//     navLinks.forEach(function (link) {
//       link.addEventListener("click", handleLinkClick);
//     });
//   });

  return (
    <nav>
      <div className="navbar">
        <div className="container">
          <input
            className="checkbox"
            type="checkbox"
            name=""
            id=""
            onChange={handleCheckboxChange}
          />
          <div className="hamburger-lines">
            <span className="line line1"></span>
            <span className="line line2"></span>
            <span className="line line3"></span>
          </div>

          {/* <Link>
            <div className="img-container">
              <img src={user?.photoURL || ""} alt="" />
            </div>
          </Link>
          <Link>
            <div>{user?.displayName || user?.email}</div>
          </Link> */}

          {user ? (
            <div className="menu-items">
              <Link to="/" onClick={handleLinkClick}>
                Главная
              </Link>
              <Link to="/chat" onClick={handleLinkClick}>Чат</Link>
              <Link to="/profile" onClick={handleLinkClick}>Профиль</Link>
              <Link to={user?.uid === admin ? "/schedule_admin" : "/schedule"} onClick={handleLinkClick}>
                Расписание
              </Link>
              {user?.uid === admin && <Link to="/admin" onClick={handleLinkClick}>Ученики</Link>}

              <Link onClick={handleLinkClick}>
                <button onClick={handleSignOut} className="logout-button">
                  Выйти
                </button>
              </Link>
            </div>
          ) : (
            <div className="menu-items">
              {Object.keys(navItemsList).map((key, index) => (
                <Link key={index} to={"/" + key} onClick={handleLinkClick}>
                  <div className="menu--item">{navItemsList[key]}</div>
                </Link>
              ))}
              <div className="signin-burger">
                <Login />
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};
