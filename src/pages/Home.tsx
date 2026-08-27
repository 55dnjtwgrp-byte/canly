import { useMemo, useState } from "react";
import { drinks, trendingDrinkIds } from "../data/drinks";
import { useRatings } from "../hooks/useRatings";
import { RateModal } from "../components/RateModal";
import { DrinkRow } from "../components/DrinkRow";
import type { Drink } from "../types";

const drinkById = new Map(drinks.map((d) => [d.id, d]));

export function Home() {
  const [activeDrink, setActiveDrink] = useState<Drink | null>(null);
  const { ratings, rateDrink, clearRating } = useRatings();

  const trending = useMemo(
    () => trendingDrinkIds.map((id) => drinkById.get(id)).filter((d): d is Drink => Boolean(d)),
    []
  );

  const recentlyLogged = useMemo(
    () =>
      Object.entries(ratings)
        .sort((a, b) => new Date(b[1].updatedAt).getTime() - new Date(a[1].updatedAt).getTime())
        .slice(0, 8)
        .map(([id]) => drinkById.get(id))
        .filter((d): d is Drink => Boolean(d)),
    [ratings]
  );

  return (
    <div className="page">
      <header className="header header--feed">
        <p className="tagline">Your energy drink feed.</p>
      </header>

      <main>
        <section className="drink-row">
          <h2 className="section-title section-title--row">Friends Activity</h2>
          <div className="friends-placeholder">
            <p className="friends-placeholder__text">
              See what your friends are drinking here once profiles go public.
            </p>
          </div>
        </section>

        <DrinkRow title="Popular This Week" drinks={trending} ratings={ratings} onSelect={setActiveDrink} />
        <DrinkRow title="Recently Logged" drinks={recentlyLogged} ratings={ratings} onSelect={setActiveDrink} />
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
