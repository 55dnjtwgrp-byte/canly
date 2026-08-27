import { useMemo, useState } from "react";
import { drinks } from "../data/drinks";
import { useRatings } from "../hooks/useRatings";
import { DrinkCard } from "../components/DrinkCard";
import { RateModal } from "../components/RateModal";
import type { Drink } from "../types";

export function Home() {
  const [query, setQuery] = useState("");
  const [activeDrink, setActiveDrink] = useState<Drink | null>(null);
  const { ratings, rateDrink, clearRating } = useRatings();

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

  const ratedCount = Object.keys(ratings).length;

  return (
    <div className="page">
      <header className="header">
        <p className="tagline">Rate your favorite energy drinks.</p>
        <input
          type="search"
          className="search"
          placeholder="Search Red Bull, Monster, Alani Nu..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          autoFocus
        />
        <p className="stats">
          {ratedCount} drink{ratedCount === 1 ? "" : "s"} rated
        </p>
      </header>

      <main className="grid">
        {filteredDrinks.map((drink) => (
          <DrinkCard
            key={drink.id}
            drink={drink}
            rating={ratings[drink.id]}
            onClick={() => setActiveDrink(drink)}
          />
        ))}
        {filteredDrinks.length === 0 && (
          <p className="empty">No drinks found for "{query}".</p>
        )}
      </main>

      {activeDrink && (
        <RateModal
          drink={activeDrink}
          existing={ratings[activeDrink.id]}
          onClose={() => setActiveDrink(null)}
          onSave={(stars, review) => {
            rateDrink(activeDrink.id, stars, review);
            setActiveDrink(null);
          }}
          onDelete={() => {
            clearRating(activeDrink.id);
            setActiveDrink(null);
          }}
        />
      )}
    </div>
  );
}
