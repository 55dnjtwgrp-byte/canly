import type { Drink } from "../types";
import { amazonSearchUrl } from "../lib/affiliate";

interface BuyLinkProps {
  drink: Drink;
  label?: string;
  className?: string;
}

export function BuyLink({ drink, label = "Buy on Amazon", className = "" }: BuyLinkProps) {
  return (
    <a
      href={amazonSearchUrl(drink)}
      target="_blank"
      rel="sponsored noopener noreferrer"
      className={`buy-link ${className}`}
    >
      {label}
    </a>
  );
}
