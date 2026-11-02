import type { Drink } from "../types";

export function DrinkFacts({ drink }: { drink: Drink }) {
  const facts: string[] = [];
  if (drink.caffeineMg !== undefined) facts.push(`${drink.caffeineMg} mg caffeine`);
  if (drink.sugarFree !== undefined) facts.push(drink.sugarFree ? "Sugar free" : "Has sugar");
  if (drink.sizeOz !== undefined) facts.push(`${drink.sizeOz} oz`);
  if (facts.length === 0) return null;

  return (
    <ul className="drink-facts">
      {facts.map((f) => (
        <li key={f} className={f === "Sugar free" ? "drink-facts__item drink-facts__item--good" : "drink-facts__item"}>
          {f}
        </li>
      ))}
    </ul>
  );
}
