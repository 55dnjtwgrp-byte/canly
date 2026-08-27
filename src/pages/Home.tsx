import { useMemo, useState } from "react";
import { drinks, trendingDrinkIds } from "../data/drinks";
import { useRatings } from "../hooks/useRatings";
import { usePins } from "../hooks/usePins";
import { useSharedPins } from "../hooks/useSharedPins";
import { useCommunityActivity } from "../hooks/useCommunityActivity";
import { useFollowing } from "../hooks/useFollowing";
import { useWeeklyPopular } from "../hooks/useWeeklyPopular";
import { resolvePinDrink } from "../lib/pinDrink";
import { RateModal } from "../components/RateModal";
import { DrinkRow } from "../components/DrinkRow";
import { RareFindsRow } from "../components/RareFindsRow";
import { CommunityActivityRow } from "../components/CommunityActivityRow";
import type { Drink } from "../types";

const drinkById = new Map(drinks.map((d) => [d.id, d]));

export function Home() {
  const [activeDrink, setActiveDrink] = useState<Drink | null>(null);
  const { ratings, rateDrink, clearRating } = useRatings();
  const { pins } = usePins();
  const { sharedPins, isShared } = useSharedPins();
  const followingIds = useFollowing();
  const friendsActivity = useCommunityActivity(followingIds);
  const communityActivity = useCommunityActivity();
  const weeklyPopular = useWeeklyPopular();

  const activityEntries = friendsActivity.length > 0 ? friendsActivity : communityActivity;
  const activityTitle = friendsActivity.length > 0 ? "Friends Activity" : "Community Activity";

  const displayPins = isShared ? sharedPins : pins;

  const rareFinds = useMemo(
    () =>
      displayPins
        .filter((p) => p.isRare)
        .slice(0, 8)
        .map((pin) => {
          const drink = resolvePinDrink(pin, drinkById);
          return drink ? { pin, drink } : null;
        })
        .filter((item): item is { pin: (typeof displayPins)[number]; drink: Drink } => item !== null),
    [displayPins]
  );

  const trending = useMemo(() => {
    if (weeklyPopular.length > 0) return weeklyPopular;
    return trendingDrinkIds.map((id) => drinkById.get(id)).filter((d): d is Drink => Boolean(d));
  }, [weeklyPopular]);

  const recentlyLogged = useMemo(
    () =>
      Object.entries(ratings)
        .sort((a, b) => new Date(b[1].updatedAt).getTime() - new Date(a[1].updatedAt).getTime())
        .slice(0, 8)
        .map(([id]) => drinkById.get(id))
        .filter((d): d is Drink => Boolean(d)),
    [ratings]
  );

  return (
    <div className="page">
      <header className="header header--feed">
        <p className="tagline">Your energy drink feed.</p>
      </header>

      <main>
        <CommunityActivityRow title={activityTitle} entries={activityEntries} />

        <RareFindsRow items={rareFinds} />

        <DrinkRow title="Popular This Week" drinks={trending} ratings={ratings} onSelect={setActiveDrink} />
        <DrinkRow title="Recently Logged" drinks={recentlyLogged} ratings={ratings} onSelect={setActiveDrink} />
      </main>

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
    </div>
  );
}
