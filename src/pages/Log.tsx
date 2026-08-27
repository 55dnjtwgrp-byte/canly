import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { drinks } from "../data/drinks";
import { useRatings } from "../hooks/useRatings";
import { StarRating } from "../components/StarRating";
import type { Drink } from "../types";

export function Log() {
  const { ratings, rateDrink } = useRatings();
  const [query, setQuery] = useState("");
  const [selectedDrink, setSelectedDrink] = useState<Drink | null>(null);
  const [stars, setStars] = useState(0);
  const [review, setReview] = useState("");
  const [justSaved, setJustSaved] = useState(false);

  const filteredDrinks = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return drinks;
    return drinks.filter(
      (d) =>
        d.name.toLowerCase().includes(q) ||
        d.brand.toLowerCase().includes(q) ||
        d.flavor?.toLowerCase().includes(q)
    );
  }, [query]);

  const selectDrink = (drink: Drink) => {
    const existing = ratings[drink.id];
    setSelectedDrink(drink);
    setStars(existing?.stars ?? 0);
    setReview(existing?.review ?? "");
  };

  const reset = () => {
    setSelectedDrink(null);
    setQuery("");
    setStars(0);
    setReview("");
    setJustSaved(false);
  };

  const handleSave = () => {
    if (!selectedDrink || stars === 0) return;
    rateDrink(selectedDrink.id, stars, review.trim());
    setJustSaved(true);
  };

  if (justSaved && selectedDrink) {
    return (
      <div className="page">
        <div className="log-confirm">
          <div
            className="drink-can log-confirm__can"
            style={{ background: `linear-gradient(160deg, ${selectedDrink.color}, #0000 140%)` }}
          >
            <span className="drink-can__brand">{selectedDrink.brand}</span>
            <span className="drink-can__flavor">{selectedDrink.flavor}</span>
          </div>
          <p className="log-confirm__check">Logged</p>
          <h2 className="log-confirm__name">{selectedDrink.name}</h2>
          <StarRating value={stars} size="lg" />
          <div className="log-confirm__actions">
            <button type="button" className="btn btn--primary" onClick={reset}>
              Log another
            </button>
            <Link to="/profile" className="btn btn--ghost-outline">
              View profile
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (selectedDrink) {
    const isEditing = Boolean(ratings[selectedDrink.id]);
    return (
      <div className="page">
        <div className="log-entry">
          <button type="button" className="link-btn log-entry__back" onClick={() => setSelectedDrink(null)}>
            ← Choose a different drink
          </button>

          <div
            className="drink-can log-entry__can"
            style={{ background: `linear-gradient(160deg, ${selectedDrink.color}, #0000 140%)` }}
          >
            <span className="drink-can__brand">{selectedDrink.brand}</span>
            <span className="drink-can__flavor">{selectedDrink.flavor}</span>
          </div>
          <h2 className="log-entry__name">{selectedDrink.name}</h2>

          <div className="modal__rating">
            <StarRating value={stars} onChange={setStars} size="lg" />
          </div>

          <textarea
            className="modal__review log-entry__review"
            placeholder="Write a review... (optional)"
            value={review}
            onChange={(e) => setReview(e.target.value)}
            rows={5}
          />

          <button type="button" className="btn btn--primary log-entry__save" onClick={handleSave} disabled={stars === 0}>
            {isEditing ? "Update log" : "Save log"}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="page">
      <header className="header">
        <p className="tagline">What did you drink?</p>
        <input
          type="search"
          className="search"
          placeholder="Search Red Bull, Monster, Alani Nu..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          autoFocus
        />
      </header>

      <main className="grid">
        {filteredDrinks.map((drink) => (
          <button type="button" className="drink-card" key={drink.id} onClick={() => selectDrink(drink)}>
            <div
              className="drink-can"
              style={{ background: `linear-gradient(160deg, ${drink.color}, #0000 140%)` }}
            >
              <span className="drink-can__brand">{drink.brand}</span>
              <span className="drink-can__flavor">{drink.flavor}</span>
            </div>
            <div className="drink-card__name">{drink.name}</div>
          </button>
        ))}
        {filteredDrinks.length === 0 && <p className="empty">No drinks found for "{query}".</p>}
      </main>
    </div>
  );
}
