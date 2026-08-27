import type { Drink, Pin } from "../types";

const CUSTOM_PALETTE = ["#7a2ea0", "#e0731e", "#2e9bd6", "#c92e5a", "#4ba32e", "#d6c92e", "#1e1e8c"];

function hashColor(name: string): string {
  let hash = 0;
  for (let i = 0; i < name.length; i++) hash = (hash * 31 + name.charCodeAt(i)) >>> 0;
  return CUSTOM_PALETTE[hash % CUSTOM_PALETTE.length];
}

export function resolvePinDrink(pin: Pin, drinkById: Map<string, Drink>): Drink | null {
  if (pin.drinkId) {
    const drink = drinkById.get(pin.drinkId);
    if (drink) return drink;
  }
  if (pin.customName) {
    return {
      id: `custom:${pin.id}`,
      name: pin.customName,
      brand: pin.customName,
      color: hashColor(pin.customName),
    };
  }
  return null;
}
