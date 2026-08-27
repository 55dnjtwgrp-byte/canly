import { useCallback, useEffect, useState } from "react";
import { useAuth } from "./useAuth";
import { getSupabase } from "../lib/supabase";

interface FollowState {
  isFollowing: boolean;
  followerCount: number;
  loading: boolean;
  toggle: () => Promise<void>;
}

export function useFollow(targetUserId: string | null): FollowState {
  const { user } = useAuth();
  const supabase = getSupabase();
  const [isFollowing, setIsFollowing] = useState(false);
  const [followerCount, setFollowerCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!supabase || !targetUserId) {
      setLoading(false);
      return;
    }
    let cancelled = false;
    setLoading(true);

    (async () => {
      const countPromise = supabase
        .from("follows")
        .select("*", { count: "exact", head: true })
        .eq("followee_id", targetUserId);

      const followingPromise = user
        ? supabase
            .from("follows")
            .select("follower_id")
            .eq("follower_id", user.id)
            .eq("followee_id", targetUserId)
            .maybeSingle()
        : Promise.resolve({ data: null });

      const [{ count }, { data: existing }] = await Promise.all([countPromise, followingPromise]);
      if (cancelled) return;
      setFollowerCount(count ?? 0);
      setIsFollowing(Boolean(existing));
      setLoading(false);
    })();

    return () => {
      cancelled = true;
    };
  }, [supabase, user, targetUserId]);

  const toggle = useCallback(async () => {
    if (!supabase || !user || !targetUserId || user.id === targetUserId) return;

    if (isFollowing) {
      const { error } = await supabase
        .from("follows")
        .delete()
        .eq("follower_id", user.id)
        .eq("followee_id", targetUserId);
      if (!error) {
        setIsFollowing(false);
        setFollowerCount((c) => Math.max(0, c - 1));
      }
    } else {
      const { error } = await supabase.from("follows").insert({ follower_id: user.id, followee_id: targetUserId });
      if (!error) {
        setIsFollowing(true);
        setFollowerCount((c) => c + 1);
      }
    }
  }, [supabase, user, targetUserId, isFollowing]);

  return { isFollowing, followerCount, loading, toggle };
}
