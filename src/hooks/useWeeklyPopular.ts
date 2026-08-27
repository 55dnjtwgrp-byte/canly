import { useEffect, useState } from "react";
import { getSupabase } from "../lib/supabase";
import { drinks } from "../data/drinks";
import type { Drink } from "../types";

const drinkById = new Map(drinks.map((d) => [d.id, d]));

export function useWeeklyPopular(limit = 8): Drink[] {
  const supabase = getSupabase();
  const [popular, setPopular] = useState<Drink[]>([]);

  useEffect(() => {
    if (!supabase) return;
    let cancelled = false;

    const since = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString();

    supabase
      .from("ratings")
      .select("drink_id")
      .gte("updated_at", since)
      .then(({ data, error }) => {
        if (cancelled || error || !data || data.length === 0) return;

        const counts = new Map<string, number>();
        for (const row of data as { drink_id: string }[]) {
          counts.set(row.drink_id, (counts.get(row.drink_id) ?? 0) + 1);
        }

        const ranked = [...counts.entries()]
          .sort((a, b) => b[1] - a[1])
          .map(([id]) => drinkById.get(id))
          .filter((d): d is Drink => Boolean(d))
          .slice(0, limit);

        if (!cancelled) setPopular(ranked);
      });

    return () => {
      cancelled = true;
    };
  }, [supabase, limit]);

  return popular;
}
