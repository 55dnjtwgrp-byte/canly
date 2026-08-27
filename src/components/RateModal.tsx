import { useState } from "react";
import type { Drink, Rating } from "../types";
import { StarRating } from "./StarRating";
import { CanArt } from "./CanArt";

interface RateModalProps {
  drink: Drink;
  existing?: Rating;
  onClose: () => void;
  onSave: (stars: number, review: string) => void;
  onDelete: () => void;
}

export function RateModal({ drink, existing, onClose, onSave, onDelete }: RateModalProps) {
  const [stars, setStars] = useState(existing?.stars ?? 0);
  const [review, setReview] = useState(existing?.review ?? "");

  const handleSave = () => {
    if (stars === 0) return;
    onSave(stars, review.trim());
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <button type="button" className="modal__close" onClick={onClose} aria-label="Close">
          ×
        </button>
        <div className="modal__can">
          <CanArt drink={drink} />
        </div>
        <h2 className="modal__title">{drink.name}</h2>
        <p className="modal__brand">{drink.brand}</p>

        <div className="modal__rating">
          <StarRating value={stars} onChange={setStars} size="lg" />
        </div>

        <textarea
          className="modal__review"
          placeholder="Write a review... (optional)"
          value={review}
          onChange={(e) => setReview(e.target.value)}
          rows={5}
        />

        <div className="modal__actions">
          {existing && (
            <button type="button" className="btn btn--ghost" onClick={onDelete}>
              Remove rating
            </button>
          )}
          <button type="button" className="btn btn--primary" onClick={handleSave} disabled={stars === 0}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
