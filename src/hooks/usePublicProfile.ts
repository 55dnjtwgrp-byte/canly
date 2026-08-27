import { useEffect, useState } from "react";
import { getSupabase } from "../lib/supabase";
import type { Profile, Rating } from "../types";

export interface PublicProfileData {
  userId: string;
  profile: Profile;
  ratings: Record<string, Rating>;
  favorites: (string | null)[];
}

type Status = "loading" | "not-configured" | "not-found" | "ready";

export function usePublicProfile(username: string) {
  const supabase = getSupabase();
  const [status, setStatus] = useState<Status>(supabase ? "loading" : "not-configured");
  const [data, setData] = useState<PublicProfileData | null>(null);

  useEffect(() => {
    if (!supabase) {
      setStatus("not-configured");
      return;
    }
    let cancelled = false;
    setStatus("loading");

    (async () => {
      const { data: profileRow, error: profileError } = await supabase
        .from("profiles")
        .select("*")
        .eq("username", username)
        .maybeSingle();

      if (cancelled) return;
      if (profileError || !profileRow) {
        setStatus("not-found");
        return;
      }

      const [{ data: ratingRows }, { data: favoriteRows }] = await Promise.all([
        supabase.from("ratings").select("*").eq("user_id", profileRow.id),
        supabase.from("favorites").select("*").eq("user_id", profileRow.id),
      ]);
      if (cancelled) return;

      const ratings: Record<string, Rating> = {};
      for (const row of ratingRows ?? []) {
        ratings[row.drink_id] = { stars: row.stars, review: row.review, updatedAt: row.updated_at };
      }

      const favorites: (string | null)[] = [null, null, null];
      for (const row of favoriteRows ?? []) {
        if (row.slot >= 0 && row.slot < 3) favorites[row.slot] = row.drink_id;
      }

      setData({
        userId: profileRow.id,
        profile: {
          displayName: profileRow.display_name,
          bio: profileRow.bio,
          avatarDataUrl: profileRow.avatar_url,
          username: profileRow.username,
        },
        ratings,
        favorites,
      });
      setStatus("ready");
    })();

    return () => {
      cancelled = true;
    };
  }, [supabase, username]);

  return { status, data };
}
