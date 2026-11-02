import { Link } from "react-router-dom";

export function LegalFooter() {
  return (
    <footer className="legal-footer">
      <p>
        <Link to="/legal/terms">Terms</Link> · <Link to="/legal/privacy">Privacy</Link>
      </p>
      <p>Canly isn't affiliated with any drink brand. Caffeine and sugar info is approximate — check the label.</p>
    </footer>
  );
}
