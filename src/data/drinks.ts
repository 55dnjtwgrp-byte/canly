import type { Drink } from "../types";

export const drinks: Drink[] = [
  { id: "redbull-original", name: "Red Bull", brand: "Red Bull", flavor: "Original", color: "#0a3a8c" },
  { id: "redbull-sugarfree", name: "Red Bull Sugarfree", brand: "Red Bull", flavor: "Sugarfree", color: "#7a7d80" },
  { id: "redbull-tropical", name: "Red Bull Tropical", brand: "Red Bull", flavor: "Tropical", color: "#e08a1e" },
  { id: "redbull-watermelon", name: "Red Bull Watermelon", brand: "Red Bull", flavor: "Watermelon", color: "#e0507a" },

  { id: "monster-original", name: "Monster Energy", brand: "Monster", flavor: "Original", color: "#0d3a0d" },
  { id: "monster-ultra", name: "Monster Ultra", brand: "Monster", flavor: "Ultra (Zero)", color: "#8a8d90" },
  { id: "monster-ultra-red", name: "Monster Ultra Red", brand: "Monster", flavor: "Ultra Red", color: "#8c1622" },
  { id: "monster-mango-loco", name: "Monster Mango Loco", brand: "Monster", flavor: "Mango Loco", color: "#e0951e" },
  { id: "monster-zero-ultra", name: "Monster Zero Ultra", brand: "Monster", flavor: "Zero Ultra", color: "#c9c9c9" },
  { id: "monster-khaos", name: "Monster Khaos", brand: "Monster", flavor: "Khaos", color: "#7a1ea0" },

  { id: "alani-hawaiian-shaved-ice", name: "Alani Nu Hawaiian Shaved Ice", brand: "Alani Nu", flavor: "Hawaiian Shaved Ice", color: "#2e9bd6" },
  { id: "alani-witchs-brew", name: "Alani Nu Witch's Brew", brand: "Alani Nu", flavor: "Witch's Brew", color: "#7a2ea0" },
  { id: "alani-cosmic-stardust", name: "Alani Nu Cosmic Stardust", brand: "Alani Nu", flavor: "Cosmic Stardust", color: "#3a1e8c" },
  { id: "alani-breezeberry", name: "Alani Nu Breezeberry", brand: "Alani Nu", flavor: "Breezeberry", color: "#2e6fd6" },

  { id: "celsius-sparkling-orange", name: "Celsius Sparkling Orange", brand: "Celsius", flavor: "Sparkling Orange", color: "#e0731e" },
  { id: "celsius-kiwi-guava", name: "Celsius Kiwi Guava", brand: "Celsius", flavor: "Kiwi Guava", color: "#5aa32e" },
  { id: "celsius-peach-vibe", name: "Celsius Peach Vibe", brand: "Celsius", flavor: "Peach Vibe", color: "#e0a11e" },

  { id: "bang-original", name: "Bang Energy", brand: "Bang", flavor: "Original", color: "#111111" },
  { id: "bang-rainbow-unicorn", name: "Bang Rainbow Unicorn", brand: "Bang", flavor: "Rainbow Unicorn", color: "#c92e8c" },
  { id: "bang-star-blast", name: "Bang Star Blast", brand: "Bang", flavor: "Star Blast", color: "#2e6fc9" },

  { id: "reign-original", name: "Reign Total Body Fuel", brand: "Reign", flavor: "Original", color: "#1e1e1e" },
  { id: "reign-melon-mania", name: "Reign Melon Mania", brand: "Reign", flavor: "Melon Mania", color: "#4ba32e" },

  { id: "ghost-energy", name: "Ghost Energy", brand: "Ghost", flavor: "Original", color: "#3a3a3a" },
  { id: "ghost-swedish-fish", name: "Ghost Swedish Fish", brand: "Ghost", flavor: "Swedish Fish", color: "#c92e3a" },

  { id: "c4-original", name: "C4 Energy", brand: "C4", flavor: "Original", color: "#e02020" },
  { id: "c4-frozen-bombsicle", name: "C4 Frozen Bombsicle", brand: "C4", flavor: "Frozen Bombsicle", color: "#2e6fd6" },

  { id: "rockstar-original", name: "Rockstar Energy", brand: "Rockstar", flavor: "Original", color: "#e0c020" },
  { id: "rockstar-punched", name: "Rockstar Punched", brand: "Rockstar", flavor: "Punched Guava", color: "#c92e5a" },

  { id: "nos-original", name: "NOS Energy", brand: "NOS", flavor: "Original", color: "#1e1e8c" },
  { id: "rip-it-power", name: "Rip It Power Force", brand: "Rip It", flavor: "Power Force", color: "#d6c92e" },
  { id: "bloom-nutrition", name: "Bloom Sparkling Energy", brand: "Bloom", flavor: "Blue Raspberry", color: "#2e9bd6" },
  { id: "prime-energy-blue-raspberry", name: "Prime Energy", brand: "Prime", flavor: "Blue Raspberry", color: "#2e6fd6" },
  { id: "ryse-fuel", name: "Ryse Fuel", brand: "Ryse", flavor: "Original", color: "#1e1e1e" },
];

// Curated picks shown in the "Popular This Week" row. Editorial for now —
// swap for real aggregate rating/log data once ratings live on a backend.
export const trendingDrinkIds = [
  "redbull-original",
  "monster-ultra",
  "alani-hawaiian-shaved-ice",
  "celsius-sparkling-orange",
  "bang-original",
  "ghost-swedish-fish",
  "c4-original",
  "prime-energy-blue-raspberry",
];
