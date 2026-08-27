import { useEffect, useState } from "react";
import { getSupabase } from "../lib/supabase";
import type { CommunityActivityEntry } from "../types";

interface RatingRow {
  user_id: string;
  drink_id: string;
  stars: number;
  review: string;
  updated_at: string;
}

interface ProfileRow {
  id: string;
  username: string;
  display_name: string;
  avatar_url: string | null;
}

/**
 * Recent ratings/reviews across all users, or restricted to `onlyUserIds`
 * when given (the signed-in user's "following" list) — an empty array
 * short-circuits to no results rather than falling back to global.
 */
export function useCommunityActivity(onlyUserIds?: string[], limit = 10): CommunityActivityEntry[] {
  const supabase = getSupabase();
  const [entries, setEntries] = useState<CommunityActivityEntry[]>([]);
  const filterKey = onlyUserIds?.join(",") ?? null;

  useEffect(() => {
    if (!supabase || onlyUserIds?.length === 0) {
      setEntries([]);
      return;
    }
    let cancelled = false;

    (async () => {
      let query = supabase
        .from("ratings")
        .select("user_id, drink_id, stars, review, updated_at")
        .order("updated_at", { ascending: false })
        .limit(limit);
      if (onlyUserIds) query = query.in("user_id", onlyUserIds);

      const { data: ratingRows, error: ratingsError } = await query;
      if (cancelled || ratingsError || !ratingRows || ratingRows.length === 0) {
        if (!cancelled) setEntries([]);
        return;
      }

      const userIds = [...new Set((ratingRows as RatingRow[]).map((r) => r.user_id))];
      const { data: profileRows, error: profilesError } = await supabase
        .from("profiles")
        .select("id, username, display_name, avatar_url")
        .in("id", userIds);
      if (cancelled || profilesError || !profileRows) return;

      const profileById = new Map((profileRows as ProfileRow[]).map((p) => [p.id, p]));
      const merged = (ratingRows as RatingRow[])
        .map((r): CommunityActivityEntry | null => {
          const profile = profileById.get(r.user_id);
          if (!profile) return null;
          return {
            userId: r.user_id,
            username: profile.username,
            displayName: profile.display_name || profile.username,
            avatarUrl: profile.avatar_url,
            drinkId: r.drink_id,
            stars: r.stars,
            review: r.review,
            updatedAt: r.updated_at,
          };
        })
        .filter((e): e is CommunityActivityEntry => e !== null);

      if (!cancelled) setEntries(merged);
    })();

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [supabase, filterKey, limit]);

  return entries;
}
