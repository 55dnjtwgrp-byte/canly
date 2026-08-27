import { useEffect, useState } from "react";
import { useAuth } from "./useAuth";
import { getSupabase } from "../lib/supabase";

export function useFollowing(): string[] {
  const { user } = useAuth();
  const supabase = getSupabase();
  const [followingIds, setFollowingIds] = useState<string[]>([]);

  useEffect(() => {
    if (!supabase || !user) {
      setFollowingIds([]);
      return;
    }
    let cancelled = false;

    supabase
      .from("follows")
      .select("followee_id")
      .eq("follower_id", user.id)
      .then(({ data, error }) => {
        if (cancelled || error || !data) return;
        setFollowingIds((data as { followee_id: string }[]).map((row) => row.followee_id));
      });

    return () => {
      cancelled = true;
    };
  }, [supabase, user]);

  return followingIds;
}
