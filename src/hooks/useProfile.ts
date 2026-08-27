import { useCallback, useEffect, useState } from "react";
import { useAuth } from "./useAuth";
import { getSupabase } from "../lib/supabase";
import type { Profile } from "../types";

const STORAGE_KEY = "canly:profile";

const DEFAULT_PROFILE: Profile = {
  displayName: "",
  bio: "",
  avatarDataUrl: null,
};

function loadLocalProfile(): Profile {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? { ...DEFAULT_PROFILE, ...(JSON.parse(raw) as Profile) } : DEFAULT_PROFILE;
  } catch {
    return DEFAULT_PROFILE;
  }
}

export function useProfile() {
  const { user } = useAuth();
  const supabase = getSupabase();
  const [profile, setProfile] = useState<Profile>(() => loadLocalProfile());

  useEffect(() => {
    if (user) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
    } catch {
      // storage unavailable (e.g. private browsing) — profile stays in-memory for this session
    }
  }, [profile, user]);

  useEffect(() => {
    if (!user) {
      setProfile(loadLocalProfile());
      return;
    }
    if (!supabase) return;
    let cancelled = false;
    supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .maybeSingle()
      .then(({ data, error }) => {
        if (cancelled || error || !data) return;
        setProfile({
          displayName: data.display_name,
          bio: data.bio,
          avatarDataUrl: data.avatar_url,
          username: data.username,
        });
      });
    return () => {
      cancelled = true;
    };
  }, [user, supabase]);

  const updateProfile = useCallback(
    (updates: Partial<Profile>) => {
      setProfile((prev) => ({ ...prev, ...updates }));
      if (user && supabase) {
        const dbUpdates: Record<string, unknown> = {};
        if ("displayName" in updates) dbUpdates.display_name = updates.displayName;
        if ("bio" in updates) dbUpdates.bio = updates.bio;
        if ("avatarDataUrl" in updates) dbUpdates.avatar_url = updates.avatarDataUrl;
        if (Object.keys(dbUpdates).length > 0) {
          supabase.from("profiles").update(dbUpdates).eq("id", user.id);
        }
      }
    },
    [user, supabase]
  );

  return { profile, updateProfile };
}
