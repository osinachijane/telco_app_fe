import { Link, useLocation } from "react-router-dom";

import { SidebarData } from "../SidebarData";
import "./Navbar.css";

const Navbar = () => {
  const location = useLocation();

  const currentPath =
    location.pathname.split("/")[1] === ""
      ? "home"
      : location.pathname.split("/")[1];

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  const checkMode = () => {
    const isTestMode = process.env.REACT_APP_MONO_PK.includes("test");
    return (
      <div className={`mode ${isTestMode ? "test" : "live"}`}>
        <h5>{`${isTestMode ? "test" : "live"} Mode`}</h5>
      </div>
    );
  };

  return (
    <>
      <nav className="nav-menu active">
        <ul className="nav-menu-items">
          <h2 className="header-nav">Coinly</h2>
          {checkMode()}
          {SidebarData.map((item, i) => (
            <li
              key={i}
              className={item.cName}
              onClick={item.title === "Logout" ? handleLogout : null}
            >
              <Link
                className={`${
                  item.path === location.pathname
                    ? "active-nav"
                    : "inactive-nav"
                }`}
                to={item.path}
              >
                {item.icon}
                <span>{item.title}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <div className="navbar">
        <div className="menu-bars-wrapper">
          <p className="nav-pathname">{currentPath}</p>
        </div>
      </div>
    </>
  );
};

export default Navbar;
