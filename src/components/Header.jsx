import { Link, useLocation } from "react-router-dom";
import { Nav } from "./Nav";
import { UserInfo } from "./UserInfo";

export const Header = () => {
  // if (useLocation().pathname == "/") {
  //   return null
  // }
  return (
    <header>
      <Link to="/" onClick={window.location.reload}>
        <img className="logo" src="logo.jpg" alt="" />
      </Link>
      <Nav />
      <UserInfo />
    </header>
  );
};
