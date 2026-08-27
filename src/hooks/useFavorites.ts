import { useCallback, useEffect, useState } from "react";
import { useAuth } from "./useAuth";
import { getSupabase } from "../lib/supabase";

const STORAGE_KEY = "canly:favorites";
const MAX_FAVORITES = 3;

function loadLocalFavorites(): (string | null)[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const parsed = raw ? (JSON.parse(raw) as (string | null)[]) : [];
    return [...parsed, null, null, null].slice(0, MAX_FAVORITES);
  } catch {
    return [null, null, null];
  }
}

export function useFavorites() {
  const { user } = useAuth();
  const supabase = getSupabase();
  const [favorites, setFavorites] = useState<(string | null)[]>(() => loadLocalFavorites());

  useEffect(() => {
    if (user) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
    } catch {
      // storage unavailable (e.g. private browsing) — favorites stay in-memory for this session
    }
  }, [favorites, user]);

  useEffect(() => {
    if (!user) {
      setFavorites(loadLocalFavorites());
      return;
    }
    if (!supabase) return;
    let cancelled = false;
    supabase
      .from("favorites")
      .select("*")
      .eq("user_id", user.id)
      .then(({ data, error }) => {
        if (cancelled || error || !data) return;
        const slots: (string | null)[] = [null, null, null];
        for (const row of data) {
          if (row.slot >= 0 && row.slot < MAX_FAVORITES) slots[row.slot] = row.drink_id;
        }
        setFavorites(slots);
      });
    return () => {
      cancelled = true;
    };
  }, [user, supabase]);

  const setFavorite = useCallback(
    (slot: number, drinkId: string) => {
      setFavorites((prev) => {
        const next = [...prev];
        next[slot] = drinkId;
        return next;
      });
      if (user && supabase) {
        supabase.from("favorites").upsert({ user_id: user.id, slot, drink_id: drinkId });
      }
    },
    [user, supabase]
  );

  const clearFavorite = useCallback(
    (slot: number) => {
      setFavorites((prev) => {
        const next = [...prev];
        next[slot] = null;
        return next;
      });
      if (user && supabase) {
        supabase.from("favorites").delete().eq("user_id", user.id).eq("slot", slot);
      }
    },
    [user, supabase]
  );

  return { favorites, setFavorite, clearFavorite };
}
