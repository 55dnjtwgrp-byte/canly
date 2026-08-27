import { useState } from "react";
import { useAuth } from "../hooks/useAuth";

interface AuthModalProps {
  onClose: () => void;
  onAuthed: () => void;
}

type Mode = "signup" | "login";

export function AuthModal({ onClose, onAuthed }: AuthModalProps) {
  const { signUp, signIn } = useAuth();
  const [mode, setMode] = useState<Mode>("signup");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    const result = mode === "signup" ? await signUp(email, password, username) : await signIn(email, password);
    setSubmitting(false);
    if (result.error) {
      setError(result.error);
      return;
    }
    onAuthed();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal modal--auth" onClick={(e) => e.stopPropagation()}>
        <button type="button" className="modal__close" onClick={onClose} aria-label="Close">
          ×
        </button>
        <h2 className="modal__title">{mode === "signup" ? "Create your account" : "Log in"}</h2>

        <form onSubmit={handleSubmit}>
          {mode === "signup" && (
            <label className="form-field">
              <span className="form-field__label">Username</span>
              <input
                type="text"
                className="form-field__input"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="jordanbyte"
                autoFocus
                required
              />
            </label>
          )}

          <label className="form-field">
            <span className="form-field__label">Email</span>
            <input
              type="email"
              className="form-field__input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>

          <label className="form-field">
            <span className="form-field__label">Password</span>
            <input
              type="password"
              className="form-field__input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              minLength={6}
              required
            />
          </label>

          {error && <p className="form-error">{error}</p>}

          <button type="submit" className="btn btn--primary auth-modal__submit" disabled={submitting}>
            {submitting ? "One sec…" : mode === "signup" ? "Sign up" : "Log in"}
          </button>
        </form>

        <button
          type="button"
          className="link-btn auth-modal__toggle"
          onClick={() => {
            setMode(mode === "signup" ? "login" : "signup");
            setError(null);
          }}
        >
          {mode === "signup" ? "Already have an account? Log in" : "New here? Create an account"}
        </button>
      </div>
    </div>
  );
}
