import { useCallback, useEffect, useState } from "react";
import type { Profile } from "../types";

const STORAGE_KEY = "canly:profile";

const DEFAULT_PROFILE: Profile = {
  displayName: "",
  bio: "",
  avatarDataUrl: null,
};

function loadProfile(): Profile {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? { ...DEFAULT_PROFILE, ...(JSON.parse(raw) as Profile) } : DEFAULT_PROFILE;
  } catch {
    return DEFAULT_PROFILE;
  }
}

export function useProfile() {
  const [profile, setProfile] = useState<Profile>(() => loadProfile());

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
    } catch {
      // storage unavailable (e.g. private browsing) — profile stays in-memory for this session
    }
  }, [profile]);

  const updateProfile = useCallback((updates: Partial<Profile>) => {
    setProfile((prev) => ({ ...prev, ...updates }));
  }, []);

  return { profile, updateProfile };
}
