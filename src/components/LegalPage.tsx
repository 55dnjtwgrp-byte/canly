import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { CONTACT_EMAIL, LEGAL_UPDATED } from "../lib/legal";

export function LegalPage({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="page legal">
      <p className="legal__back">
        <Link to="/" className="link-btn">
          ← Back to Canly
        </Link>
      </p>
      <h1 className="legal__title">{title}</h1>
      <p className="legal__updated">Last updated {LEGAL_UPDATED}</p>
      {children}
      <h2>Contact</h2>
      <p>
        {CONTACT_EMAIL ? (
          <>
            Questions, takedown requests, or account deletion requests: <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
          </>
        ) : (
          "Questions, takedown requests, or account deletion requests: contact the Canly team."
        )}
      </p>
    </div>
  );
}
