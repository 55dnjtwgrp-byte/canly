import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { drinks } from "../data/drinks";
import { useFavorites } from "../hooks/useFavorites";
import { useRatings } from "../hooks/useRatings";
import { useProfile } from "../hooks/useProfile";
import { useAuth } from "../hooks/useAuth";
import { DrinkPickerModal } from "../components/DrinkPickerModal";
import { EditProfileModal } from "../components/EditProfileModal";
import { RateModal } from "../components/RateModal";
import { AuthModal } from "../components/AuthModal";
import { StarRating } from "../components/StarRating";
import { CanArt } from "../components/CanArt";
import { exportBackup, importBackup } from "../lib/backup";
import { hasLocalDataToImport, importLocalDataToAccount } from "../lib/importLocalData";
import type { Drink } from "../types";

const drinkById = new Map(drinks.map((d) => [d.id, d]));

export function Profile() {
  const { user, isConfigured, signOut } = useAuth();
  const { favorites, setFavorite, clearFavorite } = useFavorites();
  const { ratings, rateDrink, clearRating } = useRatings();
  const { profile, updateProfile } = useProfile();
  const [pickingSlot, setPickingSlot] = useState<number | null>(null);
  const [editingProfile, setEditingProfile] = useState(false);
  const [activeDrink, setActiveDrink] = useState<Drink | null>(null);
  const [importError, setImportError] = useState<string | null>(null);
  const [exportError, setExportError] = useState<string | null>(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showImportBanner, setShowImportBanner] = useState(false);
  const [importingLocal, setImportingLocal] = useState(false);
  const [shareCopied, setShareCopied] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (user) setShowImportBanner(hasLocalDataToImport());
  }, [user]);

  const handleImportLocalData = async () => {
    if (!user) return;
    setImportingLocal(true);
    const result = await importLocalDataToAccount(user.id);
    setImportingLocal(false);
    if (result.error) {
      setImportError(result.error);
      return;
    }
    window.location.reload();
  };

  const handleShare = async () => {
    if (!profile.username) return;
    const url = `${window.location.origin}${window.location.pathname}#/u/${profile.username}`;
    try {
      await navigator.clipboard.writeText(url);
      setShareCopied(true);
      setTimeout(() => setShareCopied(false), 2000);
    } catch {
      window.prompt("Copy your profile link:", url);
    }
  };

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

  const handleExport = async () => {
    setExportError(null);
    try {
      await exportBackup();
    } catch (err) {
      const code = (err as { code?: string } | undefined)?.code;
      if (code !== "declined") {
        setExportError("Couldn't save the backup — try again.");
      }
    }
  };

  const handleImportFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;

    const confirmed = window.confirm(
      "This replaces your current ratings, favorites, pins, and profile with the backup file. Continue?"
    );
    if (!confirmed) return;

    try {
      await importBackup(file);
      window.location.reload();
    } catch {
      setImportError("Couldn't read that file — make sure it's a Canly backup.");
    }
  };

  return (
    <div className="page">
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
          {user && profile.username && <p className="public-profile__username">@{profile.username}</p>}
          {profile.bio ? (
            <p className="profile-bio">{profile.bio}</p>
          ) : (
            <p className="profile-bio profile-bio--empty">No bio yet.</p>
          )}
        </div>

        <div className="profile-header__actions">
          <button type="button" className="btn btn--ghost-outline profile-edit-btn" onClick={() => setEditingProfile(true)}>
            Edit profile
          </button>
          {user ? (
            <button type="button" className="link-btn profile-signout-btn" onClick={signOut}>
              Sign out
            </button>
          ) : (
            isConfigured && (
              <button type="button" className="link-btn" onClick={() => setShowAuthModal(true)}>
                Sign up / Log in
              </button>
            )
          )}
        </div>
      </header>

      {user && profile.username && (
        <div className="profile-share">
          <button type="button" className="btn btn--ghost-outline" onClick={handleShare}>
            {shareCopied ? "Link copied!" : "Share profile"}
          </button>
          <Link to={`/u/${profile.username}`} className="link-btn">
            View public profile
          </Link>
        </div>
      )}

      {!user && isConfigured && (
        <p className="account-cta">
          <button type="button" className="link-btn" onClick={() => setShowAuthModal(true)}>
            Create an account
          </button>{" "}
          to save your profile and make it shareable.
        </p>
      )}

      {showImportBanner && (
        <div className="import-banner">
          <p className="import-banner__text">Found ratings and favorites from before you signed in.</p>
          <div className="import-banner__actions">
            <button type="button" className="btn btn--primary" onClick={handleImportLocalData} disabled={importingLocal}>
              {importingLocal ? "Importing…" : "Import into my account"}
            </button>
            <button type="button" className="link-btn" onClick={() => setShowImportBanner(false)}>
              Dismiss
            </button>
          </div>
        </div>
      )}

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
                    <button type="button" className="activity-item__hit" onClick={() => setActiveDrink(drink)}>
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
                    </button>
                  </li>
                );
              })}
            </ul>
          </>
        )}

        <h2 className="section-title section-title--activity">Your Data</h2>
        <p className="data-section__note">
          {user
            ? "Your ratings and profile are saved to your account. Pins still live in this browser only — export a backup so you don't lose them."
            : "Everything lives in this browser only. Export a backup so you don't lose it."}
        </p>
        <div className="data-section__actions">
          <button type="button" className="btn btn--ghost-outline" onClick={handleExport}>
            Export data
          </button>
          <button type="button" className="btn btn--ghost-outline" onClick={() => fileInputRef.current?.click()}>
            Import data
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="application/json"
            onChange={handleImportFile}
            className="visually-hidden"
          />
        </div>
        {exportError && <p className="form-error">{exportError}</p>}
        {importError && <p className="form-error">{importError}</p>}
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

      {activeDrink && (
        <RateModal
          drink={activeDrink}
          existing={ratings[activeDrink.id]}
          onClose={() => setActiveDrink(null)}
          onSave={(stars, review) => {
            rateDrink(activeDrink.id, stars, review);
            setActiveDrink(null);
          }}
          onDelete={() => {
            clearRating(activeDrink.id);
            setActiveDrink(null);
          }}
        />
      )}

      {showAuthModal && (
        <AuthModal onClose={() => setShowAuthModal(false)} onAuthed={() => setShowAuthModal(false)} />
      )}
    </div>
  );
}
