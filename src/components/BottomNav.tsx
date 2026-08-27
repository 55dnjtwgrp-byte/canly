import { NavLink } from "react-router-dom";
import { useProfile } from "../hooks/useProfile";

export function BottomNav() {
  const { profile } = useProfile();
  const initials = profile.displayName.trim().slice(0, 2).toUpperCase() || "?";

  return (
    <nav className="bottom-nav">
      <div className="bottom-nav__inner">
        <NavLink
          to="/"
          end
          className={({ isActive }) => `bottom-nav__item ${isActive ? "bottom-nav__item--active" : ""}`}
          aria-label="Drinks"
        >
          <svg className="bottom-nav__icon" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
          <span className="bottom-nav__label">Drinks</span>
        </NavLink>

        <NavLink
          to="/pins"
          className={({ isActive }) => `bottom-nav__item ${isActive ? "bottom-nav__item--active" : ""}`}
          aria-label="Pins"
        >
          <svg className="bottom-nav__icon" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
              d="M12 21s7-7.2 7-12.5A7 7 0 0 0 5 8.5C5 13.8 12 21 12 21z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinejoin="round"
            />
            <circle cx="12" cy="8.5" r="2.4" stroke="currentColor" strokeWidth="2" />
          </svg>
          <span className="bottom-nav__label">Pins</span>
        </NavLink>

        <NavLink
          to="/log"
          className={({ isActive }) => `bottom-nav__item bottom-nav__item--add ${isActive ? "bottom-nav__item--active" : ""}`}
          aria-label="Log a drink"
        >
          <span className="bottom-nav__add-icon">+</span>
          <span className="bottom-nav__label">Log</span>
        </NavLink>

        <NavLink
          to="/profile"
          className={({ isActive }) => `bottom-nav__item ${isActive ? "bottom-nav__item--active" : ""}`}
          aria-label="Profile"
        >
          <span className="bottom-nav__avatar">
            {profile.avatarDataUrl ? (
              <img src={profile.avatarDataUrl} alt="" className="bottom-nav__avatar-img" />
            ) : (
              <span className="bottom-nav__avatar-initials">{initials}</span>
            )}
          </span>
          <span className="bottom-nav__label">Profile</span>
        </NavLink>
      </div>
    </nav>
  );
}
