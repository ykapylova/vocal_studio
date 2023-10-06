import { Link } from "react-router-dom";

const navItemsList = {
  about: "О студии",
  team: "Наша команда",
  media: "Галерея",
  contacts: "Контакты",
};

export const Nav = () => {
  return (
    <div className="menu">
      {Object.keys(navItemsList).map((key) => (
        <Link to={"/" + key}>
          <div className="menu--item">{navItemsList[key]}</div>
        </Link>
      ))}
    </div>
  );
};
