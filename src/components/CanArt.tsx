import { useId } from "react";
import type { Drink } from "../types";
import { shade } from "../lib/color";

interface CanArtProps {
  drink: Drink;
  showLabel?: boolean;
  className?: string;
}

function wrapFlavor(text: string, maxCharsPerLine = 15, maxLines = 2): string[] {
  if (!text) return [];
  const words = text.split(" ");
  const lines: string[] = [];
  let current = "";
  for (const word of words) {
    const test = current ? `${current} ${word}` : word;
    if (test.length > maxCharsPerLine && current) {
      lines.push(current);
      current = word;
      if (lines.length === maxLines) break;
    } else {
      current = test;
    }
  }
  if (lines.length < maxLines && current) lines.push(current);
  return lines.slice(0, maxLines);
}

export function CanArt({ drink, showLabel = true, className }: CanArtProps) {
  const uid = useId().replace(/:/g, "");
  const bodyGrad = `can-body-${uid}`;
  const shineGrad = `can-shine-${uid}`;

  const light = shade(drink.color, 22);
  const dark = shade(drink.color, -30);
  const rimLight = shade(drink.color, 38);
  const rimDark = shade(drink.color, -42);

  const flavorLines = wrapFlavor(drink.flavor ?? "");

  return (
    <svg
      viewBox="0 0 120 260"
      className={`can-art ${className ?? ""}`}
      preserveAspectRatio="xMidYMid meet"
      role="img"
      aria-label={drink.name}
    >
      <defs>
        <linearGradient id={bodyGrad} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor={dark} />
          <stop offset="16%" stopColor={light} />
          <stop offset="48%" stopColor={drink.color} />
          <stop offset="88%" stopColor={dark} />
          <stop offset="100%" stopColor={dark} />
        </linearGradient>
        <linearGradient id={shineGrad} x1="0" y1="0" x2="1" y2="1">
          <stop offset="28%" stopColor="#fff" stopOpacity="0" />
          <stop offset="42%" stopColor="#fff" stopOpacity="0.22" />
          <stop offset="54%" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
      </defs>

      <ellipse cx="60" cy="251" rx="40" ry="8" fill={rimDark} />
      <rect x="20" y="16" width="80" height="234" rx="10" fill={`url(#${bodyGrad})`} />
      <rect x="20" y="16" width="80" height="234" rx="10" fill={`url(#${shineGrad})`} />
      <ellipse cx="60" cy="16" rx="40" ry="8" fill={rimLight} stroke={rimDark} strokeWidth="1.5" />
      <ellipse cx="60" cy="12.5" rx="24" ry="3" fill={rimDark} opacity="0.55" />
      <rect x="52" y="4" width="16" height="5" rx="2.5" fill={rimDark} opacity="0.6" />

      {showLabel && (
        <>
          <rect x="20" y="118" width="80" height="56" fill="#000" opacity="0.15" />
          <text x="60" y="138" textAnchor="middle" className="can-art__brand">
            {drink.brand}
          </text>
          {flavorLines.map((line, i) => (
            <text key={i} x="60" y={154 + i * 13} textAnchor="middle" className="can-art__flavor">
              {line}
            </text>
          ))}
        </>
      )}
    </svg>
  );
}
