import { useMemo, useState } from "react";
import { drinks } from "../data/drinks";
import type { Drink } from "../types";

interface DrinkPickerModalProps {
  onClose: () => void;
  onPick: (drink: Drink) => void;
  excludeIds: string[];
}

export function DrinkPickerModal({ onClose, onPick, excludeIds }: DrinkPickerModalProps) {
  const [query, setQuery] = useState("");

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return drinks
      .filter((d) => !excludeIds.includes(d.id))
      .filter(
        (d) =>
          !q ||
          d.name.toLowerCase().includes(q) ||
          d.brand.toLowerCase().includes(q) ||
          d.flavor?.toLowerCase().includes(q)
      );
  }, [query, excludeIds]);

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal modal--picker" onClick={(e) => e.stopPropagation()}>
        <button type="button" className="modal__close" onClick={onClose} aria-label="Close">
          ×
        </button>
        <h2 className="modal__title">Choose a favorite</h2>
        <input
          type="search"
          className="search search--modal"
          placeholder="Search drinks..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          autoFocus
        />
        <div className="picker-list">
          {results.map((drink) => (
            <button type="button" key={drink.id} className="picker-list__item" onClick={() => onPick(drink)}>
              <span className="picker-list__swatch" style={{ background: drink.color }} />
              <span>
                <span className="picker-list__name">{drink.name}</span>
                <span className="picker-list__brand">{drink.brand}</span>
              </span>
            </button>
          ))}
          {results.length === 0 && <p className="empty">No drinks found.</p>}
        </div>
      </div>
    </div>
  );
}
