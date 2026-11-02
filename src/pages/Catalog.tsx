import { useMemo, useState } from "react";
import { drinks } from "../data/drinks";
import { useRatings } from "../hooks/useRatings";
import { DrinkCard } from "../components/DrinkCard";
import { RateModal } from "../components/RateModal";
import type { Drink } from "../types";

type Sort = "az" | "rated" | "unrated";

const brands = [...new Set(drinks.map((d) => d.brand))].sort((a, b) => a.localeCompare(b));

export function Catalog() {
  const { ratings, rateDrink, clearRating } = useRatings();
  const [query, setQuery] = useState("");
  const [brand, setBrand] = useState<string | null>(null);
  const [sort, setSort] = useState<Sort>("az");
  const [activeDrink, setActiveDrink] = useState<Drink | null>(null);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    const list = drinks.filter(
      (d) =>
        (!brand || d.brand === brand) &&
        (!q ||
          d.name.toLowerCase().includes(q) ||
          d.brand.toLowerCase().includes(q) ||
          d.flavor?.toLowerCase().includes(q))
    );
    return [...list].sort((a, b) => {
      if (sort === "rated" || sort === "unrated") {
        const ra = ratings[a.id] ? 1 : 0;
        const rb = ratings[b.id] ? 1 : 0;
        if (ra !== rb) return sort === "rated" ? rb - ra : ra - rb;
      }
      return a.name.localeCompare(b.name);
    });
  }, [query, brand, sort, ratings]);

  return (
    <div className="page">
      <header className="header">
        <p className="tagline">Every drink on Canly.</p>
        <input
          type="search"
          className="search"
          placeholder="Search by name, brand, or flavor..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </header>

      <div className="catalog-filters">
        <div className="catalog-chips" role="group" aria-label="Filter by brand">
          <button
            type="button"
            className={`catalog-chip ${brand === null ? "catalog-chip--active" : ""}`}
            onClick={() => setBrand(null)}
          >
            All
          </button>
          {brands.map((b) => (
            <button
              key={b}
              type="button"
              className={`catalog-chip ${brand === b ? "catalog-chip--active" : ""}`}
              onClick={() => setBrand(brand === b ? null : b)}
            >
              {b}
            </button>
          ))}
        </div>

        <div className="catalog-meta">
          <span>
            {results.length} {results.length === 1 ? "drink" : "drinks"}
          </span>
          <label className="catalog-sort">
            Sort
            <select value={sort} onChange={(e) => setSort(e.target.value as Sort)}>
              <option value="az">A–Z</option>
              <option value="rated">Rated first</option>
              <option value="unrated">Not rated first</option>
            </select>
          </label>
        </div>
      </div>

      <main className="grid">
        {results.map((drink) => (
          <DrinkCard key={drink.id} drink={drink} rating={ratings[drink.id]} onClick={() => setActiveDrink(drink)} />
        ))}
        {results.length === 0 && <p className="empty">No drinks found. Missing one? Drop it as a Rare Find on the Pins tab.</p>}
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
