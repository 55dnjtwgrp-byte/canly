import { useCallback, useEffect, useState } from "react";

const STORAGE_KEY = "canly:favorites";
const MAX_FAVORITES = 3;

function loadFavorites(): (string | null)[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const parsed = raw ? (JSON.parse(raw) as (string | null)[]) : [];
    const slots = [...parsed, null, null, null].slice(0, MAX_FAVORITES);
    return slots;
  } catch {
    return [null, null, null];
  }
}

export function useFavorites() {
  const [favorites, setFavorites] = useState<(string | null)[]>(() => loadFavorites());

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
    } catch {
      // storage unavailable (e.g. private browsing) — favorites stay in-memory for this session
    }
  }, [favorites]);

  const setFavorite = useCallback((slot: number, drinkId: string) => {
    setFavorites((prev) => {
      const next = [...prev];
      next[slot] = drinkId;
      return next;
    });
  }, []);

  const clearFavorite = useCallback((slot: number) => {
    setFavorites((prev) => {
      const next = [...prev];
      next[slot] = null;
      return next;
    });
  }, []);

  return { favorites, setFavorite, clearFavorite };
}
