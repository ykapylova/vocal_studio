import { Link, useLocation } from "react-router-dom";
import { Menu } from "./Menu";

export const Nav = () => {
  // if (useLocation().pathname === "/") {
  //   return null;
  // }
  return (
    <header>
      <Link to="/">
        <img src="logo.jpg" alt="я тут" />
      </Link>
      <Menu />
    </header>
  );
};
