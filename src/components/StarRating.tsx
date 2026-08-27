interface StarRatingProps {
  value: number;
  onChange?: (stars: number) => void;
  size?: "sm" | "lg";
}

function fillFraction(value: number, star: number): number {
  if (value >= star) return 1;
  if (value >= star - 0.5) return 0.5;
  return 0;
}

export function StarRating({ value, onChange, size = "sm" }: StarRatingProps) {
  const stars = [1, 2, 3, 4, 5];

  if (!onChange) {
    return (
      <div className={`star-rating star-rating--${size}`} aria-label={`Rated ${value} out of 5 stars`}>
        {stars.map((star) => (
          <span key={star} className="star-wrap" aria-hidden="true">
            <span className="star star--empty">★</span>
            <span className="star star--filled" style={{ width: `${fillFraction(value, star) * 100}%` }}>
              ★
            </span>
          </span>
        ))}
      </div>
    );
  }

  return (
    <div className={`star-rating star-rating--${size}`} role="radiogroup" aria-label="Rating">
      {stars.map((star) => (
        <span key={star} className="star-wrap star-wrap--interactive">
          <span className="star star--empty" aria-hidden="true">
            ★
          </span>
          <span
            className="star star--filled"
            aria-hidden="true"
            style={{ width: `${fillFraction(value, star) * 100}%` }}
          >
            ★
          </span>
          <button
            type="button"
            className="star-hit star-hit--half"
            aria-label={`${star - 0.5} stars`}
            aria-pressed={value === star - 0.5}
            onClick={() => onChange(star - 0.5)}
          />
          <button
            type="button"
            className="star-hit star-hit--full"
            aria-label={`${star} star${star > 1 ? "s" : ""}`}
            aria-pressed={value === star}
            onClick={() => onChange(star)}
          />
        </span>
      ))}
    </div>
  );
}
