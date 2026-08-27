import { NavLink } from "react-router-dom";

export function NavBar() {
  return (
    <nav className="navbar">
      <NavLink to="/" className="navbar__logo">
        can<span className="logo__accent">ly</span>
      </NavLink>
      <div className="navbar__links">
        <NavLink to="/" end className={({ isActive }) => `navbar__link ${isActive ? "navbar__link--active" : ""}`}>
          Drinks
        </NavLink>
        <NavLink to="/profile" className={({ isActive }) => `navbar__link ${isActive ? "navbar__link--active" : ""}`}>
          Profile
        </NavLink>
      </div>
    </nav>
  );
}
