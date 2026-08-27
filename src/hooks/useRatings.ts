import { useCallback, useEffect, useState } from "react";
import type { Rating } from "../types";

const STORAGE_KEY = "canly:ratings";

type RatingsMap = Record<string, Rating>;

function loadRatings(): RatingsMap {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as RatingsMap) : {};
  } catch {
    return {};
  }
}

export function useRatings() {
  const [ratings, setRatings] = useState<RatingsMap>(() => loadRatings());

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(ratings));
    } catch {
      // storage unavailable (e.g. private browsing) — ratings stay in-memory for this session
    }
  }, [ratings]);

  const rateDrink = useCallback((drinkId: string, stars: number, review: string) => {
    setRatings((prev) => ({
      ...prev,
      [drinkId]: { stars, review, updatedAt: new Date().toISOString() },
    }));
  }, []);

  const clearRating = useCallback((drinkId: string) => {
    setRatings((prev) => {
      const next = { ...prev };
      delete next[drinkId];
      return next;
    });
  }, []);

  return { ratings, rateDrink, clearRating };
}
