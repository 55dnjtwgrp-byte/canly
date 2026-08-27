import type { Drink, Rating } from "../types";
import { StarRating } from "./StarRating";
import { CanArt } from "./CanArt";

interface DrinkCardProps {
  drink: Drink;
  rating?: Rating;
  onClick: () => void;
}

export function DrinkCard({ drink, rating, onClick }: DrinkCardProps) {
  return (
    <button type="button" className="drink-card" onClick={onClick}>
      <div className="drink-can">
        <CanArt drink={drink} />
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
