import { useCallback, useEffect, useState } from "react";
import { useAuth } from "./useAuth";
import { getSupabase } from "../lib/supabase";
import type { Rating } from "../types";

const STORAGE_KEY = "canly:ratings";

type RatingsMap = Record<string, Rating>;

function loadLocalRatings(): RatingsMap {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as RatingsMap) : {};
  } catch {
    return {};
  }
}

export function useRatings() {
  const { user } = useAuth();
  const supabase = getSupabase();
  const [ratings, setRatings] = useState<RatingsMap>(() => loadLocalRatings());

  // Local persistence only applies when logged out — once a user is signed
  // in, Supabase is the source of truth for their ratings.
  useEffect(() => {
    if (user) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(ratings));
    } catch {
      // storage unavailable (e.g. private browsing) — ratings stay in-memory for this session
    }
  }, [ratings, user]);

  // Switching between logged-out and logged-in (in either direction) means
  // switching data sources entirely, not merging — reload from scratch.
  useEffect(() => {
    if (!user) {
      setRatings(loadLocalRatings());
      return;
    }
    if (!supabase) return;
    let cancelled = false;
    supabase
      .from("ratings")
      .select("*")
      .eq("user_id", user.id)
      .then(({ data, error }) => {
        if (cancelled || error || !data) return;
        const map: RatingsMap = {};
        for (const row of data) {
          map[row.drink_id] = { stars: row.stars, review: row.review, updatedAt: row.updated_at };
        }
        setRatings(map);
      });
    return () => {
      cancelled = true;
    };
  }, [user, supabase]);

  const rateDrink = useCallback(
    (drinkId: string, stars: number, review: string) => {
      const updatedAt = new Date().toISOString();
      setRatings((prev) => ({ ...prev, [drinkId]: { stars, review, updatedAt } }));
      if (user && supabase) {
        supabase.from("ratings").upsert({ user_id: user.id, drink_id: drinkId, stars, review, updated_at: updatedAt });
      }
    },
    [user, supabase]
  );

  const clearRating = useCallback(
    (drinkId: string) => {
      setRatings((prev) => {
        const next = { ...prev };
        delete next[drinkId];
        return next;
      });
      if (user && supabase) {
        supabase.from("ratings").delete().eq("user_id", user.id).eq("drink_id", drinkId);
      }
    },
    [user, supabase]
  );

  return { ratings, rateDrink, clearRating };
}
