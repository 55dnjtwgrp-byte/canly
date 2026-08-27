import { NavLink } from "react-router-dom";

export function NavBar() {
  return (
    <nav className="navbar">
      <NavLink to="/" end className="navbar__logo">
        can<span className="logo__accent">ly</span>
      </NavLink>
      <div className="navbar__tabs">
        <NavLink to="/" end className={({ isActive }) => `navbar__link ${isActive ? "navbar__link--active" : ""}`}>
          Drinks
        </NavLink>
        <NavLink
          to="/log"
          className={({ isActive }) => `navbar__add ${isActive ? "navbar__add--active" : ""}`}
          aria-label="Log a drink"
        >
          +
        </NavLink>
        <NavLink to="/profile" className={({ isActive }) => `navbar__link ${isActive ? "navbar__link--active" : ""}`}>
          Profile
        </NavLink>
      </div>
      <div className="navbar__spacer" aria-hidden="true" />
    </nav>
  );
}
