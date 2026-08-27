import { useParams, Link } from "react-router-dom";
import { drinks } from "../data/drinks";
import { usePublicProfile } from "../hooks/usePublicProfile";
import { StarRating } from "../components/StarRating";
import { CanArt } from "../components/CanArt";

const drinkById = new Map(drinks.map((d) => [d.id, d]));

export function PublicProfile() {
  const { username = "" } = useParams();
  const { status, data } = usePublicProfile(username);

  if (status === "loading") {
    return (
      <div className="page">
        <p className="empty">Loading profile…</p>
      </div>
    );
  }

  if (status === "not-configured") {
    return (
      <div className="page">
        <p className="empty">Public profiles aren't set up yet.</p>
      </div>
    );
  }

  if (status === "not-found" || !data) {
    return (
      <div className="page">
        <p className="empty">No profile found for @{username}.</p>
        <p className="public-profile__back">
          <Link to="/" className="link-btn">
            ← Back to Canly
          </Link>
        </p>
      </div>
    );
  }

  const { profile, ratings, favorites } = data;
  const ratedEntries = Object.entries(ratings).sort(
    (a, b) => new Date(b[1].updatedAt).getTime() - new Date(a[1].updatedAt).getTime()
  );
  const ratedCount = ratedEntries.length;
  const favoriteCount = favorites.filter(Boolean).length;
  const avgRating = ratedCount
    ? (ratedEntries.reduce((sum, [, r]) => sum + r.stars, 0) / ratedCount).toFixed(1)
    : null;
  const initials = (profile.displayName.trim() || username).slice(0, 2).toUpperCase();

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
          <h1 className="profile-name">{profile.displayName || `@${username}`}</h1>
          <p className="public-profile__username">@{username}</p>
          {profile.bio && <p className="profile-bio">{profile.bio}</p>}
        </div>
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
                  </div>
                ) : (
                  <div className="favorite-slot__empty favorite-slot__empty--static">
                    <span>Empty</span>
                  </div>
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
                    <div className="activity-item__hit activity-item__hit--static">
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
                    </div>
                  </li>
                );
              })}
            </ul>
          </>
        )}
      </main>
    </div>
  );
}
