interface StarRatingProps {
  value: number;
  onChange?: (stars: number) => void;
  size?: "sm" | "lg";
}

export function StarRating({ value, onChange, size = "sm" }: StarRatingProps) {
  const stars = [1, 2, 3, 4, 5];

  if (!onChange) {
    return (
      <div className={`star-rating star-rating--${size}`} aria-label={`Rated ${value} out of 5 stars`}>
        {stars.map((star) => (
          <span key={star} className={`star ${star <= value ? "star--filled" : ""}`} aria-hidden="true">
            ★
          </span>
        ))}
      </div>
    );
  }

  return (
    <div className={`star-rating star-rating--${size}`} role="radiogroup" aria-label="Rating">
      {stars.map((star) => (
        <button
          type="button"
          key={star}
          className={`star ${star <= value ? "star--filled" : ""}`}
          aria-label={`${star} star${star > 1 ? "s" : ""}`}
          aria-pressed={star <= value}
          onClick={() => onChange(star)}
        >
          ★
        </button>
      ))}
    </div>
  );
}
