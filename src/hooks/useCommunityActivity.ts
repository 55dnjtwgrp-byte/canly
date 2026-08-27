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

export function useCommunityActivity(limit = 10): CommunityActivityEntry[] {
  const supabase = getSupabase();
  const [entries, setEntries] = useState<CommunityActivityEntry[]>([]);

  useEffect(() => {
    if (!supabase) return;
    let cancelled = false;

    (async () => {
      const { data: ratingRows, error: ratingsError } = await supabase
        .from("ratings")
        .select("user_id, drink_id, stars, review, updated_at")
        .order("updated_at", { ascending: false })
        .limit(limit);
      if (cancelled || ratingsError || !ratingRows || ratingRows.length === 0) return;

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
  }, [supabase, limit]);

  return entries;
}
