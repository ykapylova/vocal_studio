import { Link, useLocation } from "react-router-dom";

export const Home = () => {
  return (
    <div>
      <main>
        <div className="leftside">
          <Link to="/about">
            <div className="menu--item">О студии</div>
          </Link>
          <Link to="/employees">
            <div className="menu--item">Команда</div>
          </Link>
          <Link to="/schedule">
            <div className="menu--item">Расписание</div>
          </Link>
          <Link to="/news">
            <div className="menu--item">Новости</div>
          </Link>
          <Link to="/media">
            <div className="menu--item">Галерея</div>
          </Link>
          <Link to="/contacts">
            <div className="menu--item">Контакты</div>
          </Link>
        </div>
        <div className="logo">
          <img src="logo.jpg" alt="Logo" />
        </div>
      </main>
    </div>
  );
};
