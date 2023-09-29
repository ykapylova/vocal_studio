import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import './css/style.css'
import "./css/about.css";
import "./css/header.css";
import "./css/footer.css";
import "./css/icons.css";
import "./css/banner.css";
import "./css/contacts.css";
import "./css/employees.css";
import "./css/news.css";
import "./css/media.css";

import { Home } from "./pages/home";
import { Nav } from "./components/Header";
import { About } from "./pages/about";
import { Footer } from "./components/Footer";
import { Icons } from "./components/Icons";
import { Contact } from "./pages/contacts";
import { Employee } from "./pages/employees";
import { News } from "./pages/news";
import { Media } from "./pages/media";

function App() {
  return (
    <div className="App">
      <Router>
        <Nav />
        <Routes>
          <Route path="/" element={<About />} />
          <Route path="/about" element={<About />} />
          <Route path="/media" element={<Media />} />
          <Route path="/news" element={<News />} />
          <Route path="/schedule" element={<Home />} />
          <Route path="/contacts" element={<Contact />} />
          <Route path="/employees" element={<Employee />} />
        </Routes>
        <Footer />
        <Icons />
      </Router>
    </div>
  );
}

export default App;
