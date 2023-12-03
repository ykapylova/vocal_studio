import "./css/App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './css/home.css'
import "./css/header.css";
import "./css/footer.css";
import "./css/icons.css";
import "./css/banner.css";
import "./css/error.css";
import "./css/about.css";
import "./css/contacts.css";
import "./css/team.css";
import "./css/media.css";
import "./css/profile.css";
import "./css/login.css";
import "./css/admin.css";
import "./css/chat.css";
import "./css/schedule.css";
import "./css/schedule_admin.css";
import "./css/404.css";
import "./css/burger.css";

import { Home } from "./pages/home";
import { Header } from "./components/Header";
import { About } from "./pages/about";
import { Footer } from "./components/Footer";
import { Icons } from "./components/Icons";
import { Contact } from "./pages/contacts";
import { Team } from "./pages/team";
import { Media } from "./pages/media";
import { NotFound } from "./pages/404";
import { Schedule } from "./pages/schedule2";
import { ScheduleAdmin } from "./pages/schedule_admin";
import { Chat } from "./pages/chat";
import { Profile} from "./pages/profile";
import { Admin } from "./pages/admin";
import { Burger } from "./components/Burger";

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Burger />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/media" element={<Media />} />
          <Route path="/schedule" element={<Schedule />} />
          <Route path="/schedule_admin" element={<ScheduleAdmin />} />
          <Route path="/contacts" element={<Contact />} />
          <Route path="/team" element={<Team />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
        <Icons />
      </Router>
    </div>
  );
}

export default App;
