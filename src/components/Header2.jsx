import React, { useEffect, useState } from "react";
import { Link, useLocation} from "react-router-dom";
import { Nav } from "./Nav";
import { getAuth, onAuthStateChanged} from "firebase/auth";
import { UserInfo } from "./UserInfo";

export const Header = () => {
  const [user, setUser] = useState(null);
  const auth = getAuth();


  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

  if (useLocation().pathname === "/") {
    return null;
  }

  return (
    <header>
      <Link to="/" onClick={window.location.reload}>
        <img className="logo" src="logo.jpg" alt="" />
      </Link>
      <Nav />
      <UserInfo user={user} />
    </header>
  );
};

