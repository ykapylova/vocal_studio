import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './css/pages/home.css'
import "./css/components/header.css";
import "./css/components/footer.css";
import "./css/components/icons.css";
import "./css/components/banner.css";
import "./css/pages/about.css";
import "./css/pages/contacts.css";
import "./css/pages/team.css";
import "./css/pages/news.css";
import "./css/pages/media.css";
import "./css/pages/404.css";

import { Home } from "./pages/home";
import { Header } from "./components/Header";
import { About } from "./pages/about";
import { Footer } from "./components/Footer";
import { Icons } from "./components/Icons";
import { Contact } from "./pages/contacts";
import { Team } from "./pages/team";
import { News } from "./pages/news";
import { Media } from "./pages/media";
import { NotFound } from "./pages/404";

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/media" element={<Media />} />
          <Route path="/news" element={<News />} />
          {/* <Route path="/schedule" element={<Home />} /> */}
          <Route path="/contacts" element={<Contact />} />
          <Route path="/team" element={<Team />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
        <Icons />
      </Router>
    </div>
  );
}

export default App;
