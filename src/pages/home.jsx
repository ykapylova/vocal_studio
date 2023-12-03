import { Link } from "react-router-dom";
import { Nav } from "../components/Nav";

export const Home = () => {
  return (
    <main>
      <div className="homeWrapper">
        <Nav />
        <div className="logo">
          <img src="logo.jpg" alt="Logo" />
        </div>
      </div>
    </main>
  );
};
