import { getSupabase } from "./supabase";
import type { Rating, Profile } from "../types";

export function hasLocalDataToImport(): boolean {
  try {
    const ratingsRaw = localStorage.getItem("canly:ratings");
    if (ratingsRaw && Object.keys(JSON.parse(ratingsRaw)).length > 0) return true;
    const favoritesRaw = localStorage.getItem("canly:favorites");
    if (favoritesRaw) {
      const parsed = JSON.parse(favoritesRaw) as (string | null)[];
      if (parsed.some(Boolean)) return true;
    }
    return false;
  } catch {
    return false;
  }
}

export async function importLocalDataToAccount(userId: string): Promise<{ error: string | null }> {
  const supabase = getSupabase();
  if (!supabase) return { error: "Accounts aren't set up." };

  try {
    const ratingsRaw = localStorage.getItem("canly:ratings");
    const ratings: Record<string, Rating> = ratingsRaw ? JSON.parse(ratingsRaw) : {};
    const ratingRows = Object.entries(ratings).map(([drinkId, r]) => ({
      user_id: userId,
      drink_id: drinkId,
      stars: r.stars,
      review: r.review,
      updated_at: r.updatedAt,
    }));
    if (ratingRows.length > 0) {
      const { error } = await supabase.from("ratings").upsert(ratingRows);
      if (error) return { error: error.message };
    }

    const favoritesRaw = localStorage.getItem("canly:favorites");
    const favorites: (string | null)[] = favoritesRaw ? JSON.parse(favoritesRaw) : [];
    const favoriteRows = favorites
      .map((drinkId, slot) => (drinkId ? { user_id: userId, slot, drink_id: drinkId } : null))
      .filter((row): row is { user_id: string; slot: number; drink_id: string } => row !== null);
    if (favoriteRows.length > 0) {
      const { error } = await supabase.from("favorites").upsert(favoriteRows);
      if (error) return { error: error.message };
    }

    const profileRaw = localStorage.getItem("canly:profile");
    if (profileRaw) {
      const profile = JSON.parse(profileRaw) as Profile;
      const updates: Record<string, unknown> = {};
      if (profile.displayName) updates.display_name = profile.displayName;
      if (profile.bio) updates.bio = profile.bio;
      if (profile.avatarDataUrl) updates.avatar_url = profile.avatarDataUrl;
      if (Object.keys(updates).length > 0) {
        const { error } = await supabase.from("profiles").update(updates).eq("id", userId);
        if (error) return { error: error.message };
      }
    }

    return { error: null };
  } catch {
    return { error: "Something went wrong reading your local data." };
  }
}
