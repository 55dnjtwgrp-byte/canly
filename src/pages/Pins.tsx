import { useMemo, useState } from "react";
import { drinks } from "../data/drinks";
import { usePins } from "../hooks/usePins";
import { useSharedPins } from "../hooks/useSharedPins";
import { useRatings } from "../hooks/useRatings";
import { useProfile } from "../hooks/useProfile";
import { useGeolocation } from "../hooks/useGeolocation";
import { CanArt } from "../components/CanArt";
import { DrinkCard } from "../components/DrinkCard";
import { PinMap } from "../components/PinMap";
import { timeAgo } from "../lib/timeAgo";
import { resolvePinDrink } from "../lib/pinDrink";
import type { Drink, Pin } from "../types";

const drinkById = new Map(drinks.map((d) => [d.id, d]));

type Mode = "list" | "pick" | "custom" | "details" | "confirm";

function makeId(): string {
  return typeof crypto !== "undefined" && "randomUUID" in crypto
    ? crypto.randomUUID()
    : `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

function isCustomDrink(drink: Drink): boolean {
  return drink.id.startsWith("custom:");
}

export function Pins() {
  const { pins, addPin } = usePins();
  const { sharedPins, isShared, insertSharedPin } = useSharedPins();
  const { ratings } = useRatings();
  const { profile } = useProfile();
  const userLocation = useGeolocation();

  const [mode, setMode] = useState<Mode>("list");
  const [query, setQuery] = useState("");
  const [customNameInput, setCustomNameInput] = useState("");
  const [selectedDrink, setSelectedDrink] = useState<Drink | null>(null);
  const [storeName, setStoreName] = useState("");
  const [city, setCity] = useState("");
  const [note, setNote] = useState("");
  const [isRare, setIsRare] = useState(false);
  const [pickedLocation, setPickedLocation] = useState<[number, number] | null>(null);
  const [savedPin, setSavedPin] = useState<Pin | null>(null);

  const displayPins = isShared ? sharedPins : pins;

  const filteredDrinks = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return drinks;
    return drinks.filter(
      (d) =>
        d.name.toLowerCase().includes(q) ||
        d.brand.toLowerCase().includes(q) ||
        d.flavor?.toLowerCase().includes(q)
    );
  }, [query]);

  const mapMarkers = useMemo(
    () =>
      displayPins
        .filter((p): p is Pin & { lat: number; lng: number } => p.lat !== undefined && p.lng !== undefined)
        .map((p) => {
          const drink = resolvePinDrink(p, drinkById);
          return {
            id: p.id,
            lat: p.lat,
            lng: p.lng,
            color: drink?.color ?? "#8a99a8",
            label: `${drink?.name ?? "Drink"} — ${p.storeName}`,
          };
        }),
    [displayPins]
  );

  const clearForm = () => {
    setQuery("");
    setCustomNameInput("");
    setSelectedDrink(null);
    setStoreName("");
    setCity("");
    setNote("");
    setIsRare(false);
    setPickedLocation(null);
  };

  const backToList = () => {
    clearForm();
    setMode("list");
  };

  const handleSelectDrink = (drink: Drink) => {
    setSelectedDrink(drink);
    setMode("details");
  };

  const handleCustomSubmit = () => {
    const name = customNameInput.trim();
    if (!name) return;
    setSelectedDrink({ id: "custom:pending", name, brand: name, color: "#8a99a8" });
    setIsRare(true);
    setMode("details");
  };

  const handleSave = async () => {
    if (!selectedDrink || !storeName.trim() || !pickedLocation) return;
    const custom = isCustomDrink(selectedDrink);
    const pin: Pin = {
      id: makeId(),
      drinkId: custom ? undefined : selectedDrink.id,
      customName: custom ? selectedDrink.name : undefined,
      isRare,
      storeName: storeName.trim(),
      city: city.trim() || undefined,
      note: note.trim() || undefined,
      lat: pickedLocation[0],
      lng: pickedLocation[1],
      postedBy: profile.displayName.trim() || undefined,
      createdAt: new Date().toISOString(),
    };
    addPin(pin);
    if (isShared) await insertSharedPin(pin);
    setSavedPin(pin);
    setMode("confirm");
  };

  const startAnother = () => {
    clearForm();
    setMode("pick");
  };

  if (mode === "pick") {
    return (
      <div className="page">
        <header className="header">
          <p className="tagline">What drink did you find?</p>
          <input
            type="search"
            className="search"
            placeholder="Search Red Bull, Monster, Alani Nu..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
          />
        </header>
        <main className="grid">
          {filteredDrinks.map((drink) => (
            <DrinkCard
              key={drink.id}
              drink={drink}
              rating={ratings[drink.id]}
              onClick={() => handleSelectDrink(drink)}
            />
          ))}
          {filteredDrinks.length === 0 && <p className="empty">No drinks found for "{query}".</p>}
        </main>
        <p className="pins-custom-cta">
          <button type="button" className="link-btn" onClick={() => setMode("custom")}>
            Can't find it? It's a rare or limited find →
          </button>
        </p>
      </div>
    );
  }

  if (mode === "custom") {
    return (
      <div className="page">
        <div className="pin-entry">
          <button type="button" className="link-btn pin-entry__back" onClick={() => setMode("pick")}>
            ← Back to the list
          </button>

          <h2 className="pin-entry__name">What did you find?</h2>
          <p className="pin-entry__map-hint">
            A new or limited-run flavor that's not in our list yet — type its name.
          </p>

          <label className="form-field">
            <span className="form-field__label">Drink name</span>
            <input
              type="text"
              className="form-field__input"
              value={customNameInput}
              onChange={(e) => setCustomNameInput(e.target.value)}
              placeholder="e.g. Monster Ultra Paradise (LTO)"
              autoFocus
            />
          </label>

          <button
            type="button"
            className="btn btn--primary pin-entry__save"
            onClick={handleCustomSubmit}
            disabled={!customNameInput.trim()}
          >
            Continue
          </button>
        </div>
      </div>
    );
  }

  if (mode === "details" && selectedDrink) {
    return (
      <div className="page">
        <div className="pin-entry">
          <button
            type="button"
            className="link-btn pin-entry__back"
            onClick={() => setMode(isCustomDrink(selectedDrink) ? "custom" : "pick")}
          >
            ← Choose a different drink
          </button>

          <div className="drink-can pin-entry__can">
            <CanArt drink={selectedDrink} />
          </div>
          <h2 className="pin-entry__name">{selectedDrink.name}</h2>

          <label className="form-field form-field--checkbox">
            <input type="checkbox" checked={isRare} onChange={(e) => setIsRare(e.target.checked)} />
            <span>This is a rare or limited find</span>
          </label>

          <p className="pin-entry__map-hint">
            {pickedLocation ? "Tap the map again to move your pin." : "Tap the map where you found it."}
          </p>
          <PinMap
            markers={[]}
            center={userLocation}
            onMapClick={(lat, lng) => setPickedLocation([lat, lng])}
            pickedLocation={pickedLocation}
            className="pin-entry__map"
          />

          <label className="form-field">
            <span className="form-field__label">Store name</span>
            <input
              type="text"
              className="form-field__input"
              value={storeName}
              onChange={(e) => setStoreName(e.target.value)}
              placeholder="e.g. Walgreens on 5th"
            />
          </label>

          <label className="form-field">
            <span className="form-field__label">City (optional)</span>
            <input
              type="text"
              className="form-field__input"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="e.g. Austin, TX"
            />
          </label>

          <label className="form-field">
            <span className="form-field__label">Note (optional)</span>
            <textarea
              className="form-field__input form-field__input--textarea"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Still in stock as of..."
              rows={3}
            />
          </label>

          <button
            type="button"
            className="btn btn--primary pin-entry__save"
            onClick={handleSave}
            disabled={!storeName.trim() || !pickedLocation}
          >
            Drop pin
          </button>
        </div>
      </div>
    );
  }

  if (mode === "confirm" && selectedDrink) {
    return (
      <div className="page">
        <div className="log-confirm">
          <div className="drink-can log-confirm__can">
            <CanArt drink={selectedDrink} />
          </div>
          <p className="log-confirm__check">{isRare ? "Rare find pinned" : "Pinned"}</p>
          <h2 className="log-confirm__name">{selectedDrink.name}</h2>
          <p className="pin-confirm__store">
            {storeName}
            {city ? ` · ${city}` : ""}
          </p>
          {isShared && savedPin && <p className="pin-confirm__shared">Visible to everyone with this app.</p>}
          <div className="log-confirm__actions">
            <button type="button" className="btn btn--primary" onClick={startAnother}>
              Drop another
            </button>
            <button type="button" className="btn btn--ghost-outline" onClick={backToList}>
              View pins
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="page">
      <header className="header">
        <p className="tagline">Where have you found new drinks?</p>
      </header>

      <main>
        <button type="button" className="btn btn--primary pins-add-btn" onClick={() => setMode("pick")}>
          + Drop a pin
        </button>

        {mapMarkers.length > 0 && (
          <PinMap markers={mapMarkers} center={userLocation} className="pins-list__map" />
        )}

        {displayPins.length === 0 ? (
          <p className="empty pins-empty">
            No pins yet. Drop one next time you spot a new flavor in the wild.
          </p>
        ) : (
          <ul className="pin-list">
            {displayPins.map((pin) => {
              const drink = resolvePinDrink(pin, drinkById);
              if (!drink) return null;
              return (
                <li className="pin-item" key={pin.id}>
                  <div className="pin-item__swatch">
                    <CanArt drink={drink} showLabel={false} />
                  </div>
                  <div className="pin-item__body">
                    <div className="pin-item__top">
                      <span className="pin-item__name">
                        {drink.name}
                        {pin.isRare && <span className="pin-item__rare-badge">Rare</span>}
                      </span>
                      <span className="pin-item__time">{timeAgo(pin.createdAt)}</span>
                    </div>
                    <p className="pin-item__location">
                      {pin.storeName}
                      {pin.city ? ` · ${pin.city}` : ""}
                    </p>
                    {pin.note && <p className="pin-item__note">{pin.note}</p>}
                    {isShared && pin.postedBy && <p className="pin-item__by">— {pin.postedBy}</p>}
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </main>
    </div>
  );
}
