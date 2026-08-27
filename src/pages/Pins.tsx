import { useMemo, useState } from "react";
import { drinks } from "../data/drinks";
import { usePins } from "../hooks/usePins";
import { useRatings } from "../hooks/useRatings";
import { CanArt } from "../components/CanArt";
import { DrinkCard } from "../components/DrinkCard";
import { timeAgo } from "../lib/timeAgo";
import type { Drink } from "../types";

const drinkById = new Map(drinks.map((d) => [d.id, d]));

type Mode = "list" | "pick" | "details" | "confirm";

export function Pins() {
  const { pins, addPin, removePin } = usePins();
  const { ratings } = useRatings();
  const [mode, setMode] = useState<Mode>("list");
  const [query, setQuery] = useState("");
  const [selectedDrink, setSelectedDrink] = useState<Drink | null>(null);
  const [storeName, setStoreName] = useState("");
  const [city, setCity] = useState("");
  const [note, setNote] = useState("");

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

  const clearForm = () => {
    setQuery("");
    setSelectedDrink(null);
    setStoreName("");
    setCity("");
    setNote("");
  };

  const backToList = () => {
    clearForm();
    setMode("list");
  };

  const handleSelectDrink = (drink: Drink) => {
    setSelectedDrink(drink);
    setMode("details");
  };

  const handleSave = () => {
    if (!selectedDrink || !storeName.trim()) return;
    addPin({
      drinkId: selectedDrink.id,
      storeName: storeName.trim(),
      city: city.trim() || undefined,
      note: note.trim() || undefined,
    });
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
      </div>
    );
  }

  if (mode === "details" && selectedDrink) {
    return (
      <div className="page">
        <div className="pin-entry">
          <button type="button" className="link-btn pin-entry__back" onClick={() => setMode("pick")}>
            ← Choose a different drink
          </button>

          <div className="drink-can pin-entry__can">
            <CanArt drink={selectedDrink} />
          </div>
          <h2 className="pin-entry__name">{selectedDrink.name}</h2>

          <label className="form-field">
            <span className="form-field__label">Store name</span>
            <input
              type="text"
              className="form-field__input"
              value={storeName}
              onChange={(e) => setStoreName(e.target.value)}
              placeholder="e.g. Walgreens on 5th"
              autoFocus
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
            disabled={!storeName.trim()}
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
          <p className="log-confirm__check">Pinned</p>
          <h2 className="log-confirm__name">{selectedDrink.name}</h2>
          <p className="pin-confirm__store">
            {storeName}
            {city ? ` · ${city}` : ""}
          </p>
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

        {pins.length === 0 ? (
          <p className="empty pins-empty">
            No pins yet. Drop one next time you spot a new flavor in the wild.
          </p>
        ) : (
          <ul className="pin-list">
            {pins.map((pin) => {
              const drink = drinkById.get(pin.drinkId);
              if (!drink) return null;
              return (
                <li className="pin-item" key={pin.id}>
                  <div className="pin-item__swatch">
                    <CanArt drink={drink} showLabel={false} />
                  </div>
                  <div className="pin-item__body">
                    <div className="pin-item__top">
                      <span className="pin-item__name">{drink.name}</span>
                      <span className="pin-item__time">{timeAgo(pin.createdAt)}</span>
                    </div>
                    <p className="pin-item__location">
                      {pin.storeName}
                      {pin.city ? ` · ${pin.city}` : ""}
                    </p>
                    {pin.note && <p className="pin-item__note">{pin.note}</p>}
                  </div>
                  <button
                    type="button"
                    className="link-btn link-btn--danger pin-item__remove"
                    onClick={() => removePin(pin.id)}
                  >
                    Remove
                  </button>
                </li>
              );
            })}
          </ul>
        )}
      </main>
    </div>
  );
}
