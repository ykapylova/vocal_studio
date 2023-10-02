import { Link } from "react-router-dom";

// элемент навигации
export const NavItem = (props) => {
  return (
    <Link to={"/" + props.item}>
      <div className="menu--item">{props.text}</div>
    </Link>
  );
};

//списки с навигацией
const navItemsList = {
  about: "О студии",
  team: "Наша команда",
  // "schedule": "Расписание",
  // "news": "Новости",
  media: "Галерея",
  contacts: "Контакты",
};

//
export const Nav = () => {
  const navItems = Object.keys(navItemsList).map((text) => (
    <NavItem item={text} text={navItemsList[text]} />
  ));

  return <div className="menu">{navItems}</div>;
};
