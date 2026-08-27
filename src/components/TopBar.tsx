import { Link } from "react-router-dom";

export function TopBar() {
  return (
    <header className="topbar">
      <Link to="/" className="topbar__logo">
        can<span className="logo__accent">ly</span>
      </Link>
    </header>
  );
}
