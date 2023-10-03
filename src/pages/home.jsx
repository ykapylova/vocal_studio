import { Link } from "react-router-dom";
import { Nav } from "../components/Nav";

export const Home = () => {
  return (
    <div className="homeWrapper">
      <Link to={"/login"}>Вход</Link>
      <main>
        <Nav />
        <div className="logo">
          <img src="logo.jpg" alt="Logo" />
        </div>
      </main>
    </div>
  );
};
