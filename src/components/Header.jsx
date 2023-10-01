import { Link, useLocation } from "react-router-dom";
import { Nav } from "./Nav";

export const Header = () => {
  if (useLocation().pathname === "/") {
    return null;
  }
  return (
    <header>
      <Link to="/" onClick={window.location.reload}>
        <img src="logo.jpg" alt="" />
      </Link>
      <Nav />
    </header>
  );
};
