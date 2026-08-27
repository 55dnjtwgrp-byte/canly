import type { Drink, Rating } from "../types";
import { StarRating } from "./StarRating";

interface DrinkCardProps {
  drink: Drink;
  rating?: Rating;
  onClick: () => void;
}

export function DrinkCard({ drink, rating, onClick }: DrinkCardProps) {
  return (
    <button type="button" className="drink-card" onClick={onClick}>
      <div className="drink-can" style={{ background: `linear-gradient(160deg, ${drink.color}, #0000 140%)` }}>
        <span className="drink-can__brand">{drink.brand}</span>
        <span className="drink-can__flavor">{drink.flavor}</span>
      </div>
      <div className="drink-card__name">{drink.name}</div>
      {rating ? (
        <StarRating value={rating.stars} />
      ) : (
        <span className="drink-card__unrated">Not rated</span>
      )}
    </button>
  );
}
