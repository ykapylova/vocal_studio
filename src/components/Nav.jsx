import { Link } from "react-router-dom";

export const NavItem = (props) => {
  return (
    <Link to={"/" + props.item}>
      <div className="menu--item">{props.text}</div>
    </Link>
  );
};

export const Nav = () => {
  const navItemsList = [
    "about",
    "team",
    // "schedule",
    // "news",
    "media",
    "contacts",
  ];
  const navItemsText = [
    "О студии",
    "Наша команда",
    // "Расписание",
    // "Новости",
    "Галерея",
    "Контакты",
  ];

  const navItems = navItemsList.map((menuItem, key) => (
    <NavItem key={key} item={menuItem} text={navItemsText[key]} />
  ));

  return <div className="menu">{navItems}</div>;
};
