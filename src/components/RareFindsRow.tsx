import { Link } from "react-router-dom";
import { CanArt } from "./CanArt";
import { timeAgo } from "../lib/timeAgo";
import type { Drink, Pin } from "../types";

interface RareFindsRowProps {
  items: { pin: Pin; drink: Drink }[];
}

export function RareFindsRow({ items }: RareFindsRowProps) {
  if (items.length === 0) return null;

  return (
    <section className="drink-row">
      <div className="rare-finds__head">
        <h2 className="section-title section-title--row">Rare Finds</h2>
        <Link to="/pins" className="link-btn">
          See all
        </Link>
      </div>
      <div className="drink-row__track">
        {items.map(({ pin, drink }) => (
          <Link to="/pins" className="drink-row__item rare-find-card" key={pin.id}>
            <div className="drink-can">
              <CanArt drink={drink} showLabel={false} />
            </div>
            <p className="rare-find-card__name">{drink.name}</p>
            <p className="rare-find-card__location">
              {pin.storeName}
              {pin.city ? ` · ${pin.city}` : ""}
            </p>
            <p className="rare-find-card__time">{timeAgo(pin.createdAt)}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
