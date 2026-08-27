import type { Drink, Rating } from "../types";
import { DrinkCard } from "./DrinkCard";

interface DrinkRowProps {
  title: string;
  drinks: Drink[];
  ratings?: Record<string, Rating>;
  onSelect: (drink: Drink) => void;
}

export function DrinkRow({ title, drinks, ratings, onSelect }: DrinkRowProps) {
  if (drinks.length === 0) return null;

  return (
    <section className="drink-row">
      <h2 className="section-title section-title--row">{title}</h2>
      <div className="drink-row__track">
        {drinks.map((drink) => (
          <div className="drink-row__item" key={drink.id}>
            <DrinkCard drink={drink} rating={ratings?.[drink.id]} onClick={() => onSelect(drink)} />
          </div>
        ))}
      </div>
    </section>
  );
}
