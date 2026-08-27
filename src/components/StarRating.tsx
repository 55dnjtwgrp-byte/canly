interface StarRatingProps {
  value: number;
  onChange?: (stars: number) => void;
  size?: "sm" | "lg";
}

export function StarRating({ value, onChange, size = "sm" }: StarRatingProps) {
  const interactive = Boolean(onChange);
  const stars = [1, 2, 3, 4, 5];

  return (
    <div className={`star-rating star-rating--${size}`} role={interactive ? "radiogroup" : undefined} aria-label="Rating">
      {stars.map((star) => (
        <button
          type="button"
          key={star}
          className={`star ${star <= value ? "star--filled" : ""}`}
          disabled={!interactive}
          aria-label={`${star} star${star > 1 ? "s" : ""}`}
          aria-pressed={interactive ? star <= value : undefined}
          onClick={interactive ? () => onChange!(star) : undefined}
        >
          ★
        </button>
      ))}
    </div>
  );
}
