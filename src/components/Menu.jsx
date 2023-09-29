import { MenuItem } from "./MenuItem";

export const Menu = () => {
  const menuItemsList = [
    "about",
    "employees",
    // "schedule",
    // "news",
    "media",
    "contacts",
  ];
  const menuItemsText = [
    "О студии",
    "Наша команда",
    // "Расписание",
    // "Новости",
    "Галерея",
    "Контакты",
  ];

  const menuItems = menuItemsList.map((menuItem, key) => (
    <MenuItem key={key} item={menuItem} text={menuItemsText[key]} />
  ));

  // Верните созданный массив JSX-элементов
  return <div className="menu">{menuItems}</div>;
};
