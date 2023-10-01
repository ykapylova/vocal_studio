import { Nav } from "../components/Nav";

export const Home = () => {
  return (
    <div className="homeWrapper">
      <main>
        <Nav />
        <div className="logo">
          <img src="logo.jpg" alt="Logo" />
        </div>
      </main>
    </div>
  );
};
