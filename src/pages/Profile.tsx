import { useState } from "react";
import { drinks } from "../data/drinks";
import { useFavorites } from "../hooks/useFavorites";
import { useRatings } from "../hooks/useRatings";
import { DrinkPickerModal } from "../components/DrinkPickerModal";
import type { Drink } from "../types";

const drinkById = new Map(drinks.map((d) => [d.id, d]));

export function Profile() {
  const { favorites, setFavorite, clearFavorite } = useFavorites();
  const { ratings } = useRatings();
  const [pickingSlot, setPickingSlot] = useState<number | null>(null);

  const ratedCount = Object.keys(ratings).length;
  const favoriteCount = favorites.filter(Boolean).length;

  const handlePick = (drink: Drink) => {
    if (pickingSlot === null) return;
    setFavorite(pickingSlot, drink.id);
    setPickingSlot(null);
  };

  return (
    <div className="page">
      <header className="header">
        <p className="tagline">Your Canly profile.</p>
        <div className="profile-stats">
          <div>
            <span className="profile-stats__num">{ratedCount}</span>
            <span className="profile-stats__label">rated</span>
          </div>
          <div>
            <span className="profile-stats__num">{favoriteCount}</span>
            <span className="profile-stats__label">favorites</span>
          </div>
        </div>
      </header>

      <main>
        <h2 className="section-title">Top 3 Favorite Energy Drinks</h2>
        <div className="favorites-row">
          {favorites.map((drinkId, slot) => {
            const drink = drinkId ? drinkById.get(drinkId) : undefined;
            return (
              <div className="favorite-slot" key={slot}>
                <span className="favorite-slot__rank">{slot + 1}</span>
                {drink ? (
                  <div className="favorite-slot__filled">
                    <div
                      className="drink-can drink-can--favorite"
                      style={{ background: `linear-gradient(160deg, ${drink.color}, #0000 140%)` }}
                    >
                      <span className="drink-can__brand">{drink.brand}</span>
                      <span className="drink-can__flavor">{drink.flavor}</span>
                    </div>
                    <p className="favorite-slot__name">{drink.name}</p>
                    <div className="favorite-slot__actions">
                      <button type="button" className="link-btn" onClick={() => setPickingSlot(slot)}>
                        Change
                      </button>
                      <button type="button" className="link-btn link-btn--danger" onClick={() => clearFavorite(slot)}>
                        Remove
                      </button>
                    </div>
                  </div>
                ) : (
                  <button type="button" className="favorite-slot__empty" onClick={() => setPickingSlot(slot)}>
                    <span className="favorite-slot__plus">+</span>
                    <span>Add favorite</span>
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </main>

      {pickingSlot !== null && (
        <DrinkPickerModal
          onClose={() => setPickingSlot(null)}
          onPick={handlePick}
          excludeIds={favorites.filter((id): id is string => Boolean(id))}
        />
      )}
    </div>
  );
}
