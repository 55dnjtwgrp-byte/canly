import { useState } from "react";
import { drinks } from "../data/drinks";
import { useFavorites } from "../hooks/useFavorites";
import { useRatings } from "../hooks/useRatings";
import { useProfile } from "../hooks/useProfile";
import { DrinkPickerModal } from "../components/DrinkPickerModal";
import { EditProfileModal } from "../components/EditProfileModal";
import { StarRating } from "../components/StarRating";
import { CanArt } from "../components/CanArt";
import type { Drink } from "../types";

const drinkById = new Map(drinks.map((d) => [d.id, d]));

export function Profile() {
  const { favorites, setFavorite, clearFavorite } = useFavorites();
  const { ratings } = useRatings();
  const { profile, updateProfile } = useProfile();
  const [pickingSlot, setPickingSlot] = useState<number | null>(null);
  const [editingProfile, setEditingProfile] = useState(false);

  const ratedEntries = Object.entries(ratings).sort(
    (a, b) => new Date(b[1].updatedAt).getTime() - new Date(a[1].updatedAt).getTime()
  );
  const ratedCount = ratedEntries.length;
  const favoriteCount = favorites.filter(Boolean).length;
  const avgRating = ratedCount
    ? (ratedEntries.reduce((sum, [, r]) => sum + r.stars, 0) / ratedCount).toFixed(1)
    : null;

  const initials = profile.displayName.trim().slice(0, 2).toUpperCase() || "?";

  const handlePick = (drink: Drink) => {
    if (pickingSlot === null) return;
    setFavorite(pickingSlot, drink.id);
    setPickingSlot(null);
  };

  return (
    <div className="page">
      <div className="profile-banner" />

      <header className="profile-header">
        <div className="profile-avatar">
          {profile.avatarDataUrl ? (
            <img src={profile.avatarDataUrl} alt="" className="profile-avatar__img" />
          ) : (
            <span className="profile-avatar__initials">{initials}</span>
          )}
        </div>

        <div className="profile-header__info">
          <h1 className="profile-name">{profile.displayName || "Set your name"}</h1>
          {profile.bio ? (
            <p className="profile-bio">{profile.bio}</p>
          ) : (
            <p className="profile-bio profile-bio--empty">No bio yet.</p>
          )}
        </div>

        <button type="button" className="btn btn--ghost-outline profile-edit-btn" onClick={() => setEditingProfile(true)}>
          Edit profile
        </button>
      </header>

      <div className="profile-stats">
        <div>
          <span className="profile-stats__num">{ratedCount}</span>
          <span className="profile-stats__label">rated</span>
        </div>
        <div>
          <span className="profile-stats__num">{favoriteCount}</span>
          <span className="profile-stats__label">favorites</span>
        </div>
        <div>
          <span className="profile-stats__num">{avgRating ?? "—"}</span>
          <span className="profile-stats__label">avg rating</span>
        </div>
      </div>

      <main>
        <h2 className="section-title">Top 3 Favorite Energy Drinks</h2>
        <div className="favorites-row">
          {favorites.map((drinkId, slot) => {
            const drink = drinkId ? drinkById.get(drinkId) : undefined;
            return (
              <div className="favorite-slot" key={slot}>
                <span className="favorite-slot__rank">{slot + 1}</span>
                {drink ? (
                  <div className="favorite-slot__filled">
                    <div className="drink-can drink-can--favorite">
                      <CanArt drink={drink} />
                    </div>
                    <p className="favorite-slot__name">{drink.name}</p>
                    <div className="favorite-slot__actions">
                      <button type="button" className="link-btn" onClick={() => setPickingSlot(slot)}>
                        Change
                      </button>
                      <button type="button" className="link-btn link-btn--danger" onClick={() => clearFavorite(slot)}>
                        Remove
                      </button>
                    </div>
                  </div>
                ) : (
                  <button type="button" className="favorite-slot__empty" onClick={() => setPickingSlot(slot)}>
                    <span className="favorite-slot__plus">+</span>
                    <span>Add favorite</span>
                  </button>
                )}
              </div>
            );
          })}
        </div>

        {ratedCount > 0 && (
          <>
            <h2 className="section-title section-title--activity">Recently Rated</h2>
            <ul className="activity-list">
              {ratedEntries.slice(0, 8).map(([drinkId, rating]) => {
                const drink = drinkById.get(drinkId);
                if (!drink) return null;
                return (
                  <li className="activity-item" key={drinkId}>
                    <div className="activity-item__swatch">
                      <CanArt drink={drink} showLabel={false} />
                    </div>
                    <div className="activity-item__body">
                      <div className="activity-item__top">
                        <span className="activity-item__name">{drink.name}</span>
                        <StarRating value={rating.stars} />
                      </div>
                      {rating.review && <p className="activity-item__review">{rating.review}</p>}
                    </div>
                  </li>
                );
              })}
            </ul>
          </>
        )}
      </main>

      {pickingSlot !== null && (
        <DrinkPickerModal
          onClose={() => setPickingSlot(null)}
          onPick={handlePick}
          excludeIds={favorites.filter((id): id is string => Boolean(id))}
        />
      )}

      {editingProfile && (
        <EditProfileModal
          profile={profile}
          onClose={() => setEditingProfile(false)}
          onSave={(updated) => {
            updateProfile(updated);
            setEditingProfile(false);
          }}
        />
      )}
    </div>
  );
}
