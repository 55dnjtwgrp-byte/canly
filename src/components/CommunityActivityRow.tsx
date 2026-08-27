import { Link } from "react-router-dom";
import { drinks } from "../data/drinks";
import { CanArt } from "./CanArt";
import { StarRating } from "./StarRating";
import { timeAgo } from "../lib/timeAgo";
import type { CommunityActivityEntry } from "../types";

const drinkById = new Map(drinks.map((d) => [d.id, d]));

interface CommunityActivityRowProps {
  title: string;
  entries: CommunityActivityEntry[];
}

export function CommunityActivityRow({ title, entries }: CommunityActivityRowProps) {
  const visible = entries
    .map((entry) => {
      const drink = drinkById.get(entry.drinkId);
      return drink ? { entry, drink } : null;
    })
    .filter((item): item is { entry: CommunityActivityEntry; drink: (typeof drinks)[number] } => item !== null)
    .slice(0, 6);

  return (
    <section className="drink-row">
      <h2 className="section-title section-title--row">{title}</h2>
      {visible.length === 0 ? (
        <div className="friends-placeholder">
          <p className="friends-placeholder__text">
            Real ratings from other Canly users will show up here once people start logging drinks.
          </p>
        </div>
      ) : (
        <ul className="activity-list">
          {visible.map(({ entry, drink }) => (
            <li key={`${entry.userId}-${entry.drinkId}`}>
              <Link to={`/u/${entry.username}`} className="activity-item__hit">
                <div className="activity-item__swatch">
                  <CanArt drink={drink} showLabel={false} />
                </div>
                <div className="activity-item__body">
                  <div className="activity-item__top">
                    <span className="activity-item__name">{drink.name}</span>
                    <StarRating value={entry.stars} />
                  </div>
                  <p className="pin-item__by">
                    — {entry.displayName} · {timeAgo(entry.updatedAt)}
                  </p>
                  {entry.review && <p className="activity-item__review">{entry.review}</p>}
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
