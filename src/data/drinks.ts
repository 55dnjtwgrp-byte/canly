import type { Drink } from "../types";

export const drinks: Drink[] = [
  // Red Bull
  { id: "redbull-original", name: "Red Bull", brand: "Red Bull", flavor: "Original", color: "#0a3a8c" },
  { id: "redbull-sugarfree", name: "Red Bull Sugarfree", brand: "Red Bull", flavor: "Sugarfree", color: "#7a7d80" },
  { id: "redbull-zero", name: "Red Bull Zero", brand: "Red Bull", flavor: "Zero Sugar", color: "#4a5a6a" },
  { id: "redbull-tropical", name: "Red Bull Tropical", brand: "Red Bull", flavor: "Yellow Edition · Tropical", color: "#e08a1e" },
  { id: "redbull-watermelon", name: "Red Bull Watermelon", brand: "Red Bull", flavor: "Red Edition · Watermelon", color: "#e0507a" },
  { id: "redbull-blueberry", name: "Red Bull Blueberry", brand: "Red Bull", flavor: "Blue Edition · Blueberry", color: "#1e3a8c" },
  { id: "redbull-dragonfruit", name: "Red Bull Dragon Fruit", brand: "Red Bull", flavor: "Green Edition · Dragon Fruit", color: "#2e8c6e" },
  { id: "redbull-acai", name: "Red Bull Açaí Berry", brand: "Red Bull", flavor: "Purple Edition · Açaí Berry", color: "#5a1e8c" },
  { id: "redbull-peach", name: "Red Bull Peach Nectarine", brand: "Red Bull", flavor: "Peach Edition", color: "#e0a05a" },
  { id: "redbull-coconut", name: "Red Bull Coconut Berry", brand: "Red Bull", flavor: "White Edition · Coconut Berry", color: "#d6c9a8" },
  { id: "redbull-strawberry-apricot", name: "Red Bull Strawberry Apricot", brand: "Red Bull", flavor: "Apricot Edition", color: "#e0785a" },

  // Monster
  { id: "monster-original", name: "Monster Energy", brand: "Monster", flavor: "Original", color: "#0d3a0d" },
  { id: "monster-lo-carb", name: "Monster Lo-Carb", brand: "Monster", flavor: "Lo-Carb", color: "#2e5a2e" },
  { id: "monster-absolute-zero", name: "Monster Absolute Zero", brand: "Monster", flavor: "Absolute Zero", color: "#d6d6d6" },
  { id: "monster-zero-sugar", name: "Monster Zero Sugar", brand: "Monster", flavor: "Zero Sugar", color: "#1e5a1e" },
  { id: "monster-ultra", name: "Monster Ultra", brand: "Monster", flavor: "Ultra", color: "#8a8d90" },
  { id: "monster-ultra-red", name: "Monster Ultra Red", brand: "Monster", flavor: "Ultra Red", color: "#8c1622" },
  { id: "monster-ultra-blue", name: "Monster Ultra Blue", brand: "Monster", flavor: "Ultra Blue", color: "#1e5ac9" },
  { id: "monster-ultra-violet", name: "Monster Ultra Violet", brand: "Monster", flavor: "Ultra Violet", color: "#6a2e9b" },
  { id: "monster-ultra-sunrise", name: "Monster Ultra Sunrise", brand: "Monster", flavor: "Ultra Sunrise", color: "#e0781e" },
  { id: "monster-ultra-fiesta", name: "Monster Ultra Fiesta", brand: "Monster", flavor: "Ultra Fiesta", color: "#c9781e" },
  { id: "monster-ultra-gold", name: "Monster Ultra Gold", brand: "Monster", flavor: "Ultra Gold", color: "#d6b81e" },
  { id: "monster-ultra-watermelon", name: "Monster Ultra Watermelon", brand: "Monster", flavor: "Ultra Watermelon", color: "#e0507a" },
  { id: "monster-ultra-peachy-keen", name: "Monster Ultra Peachy Keen", brand: "Monster", flavor: "Ultra Peachy Keen", color: "#e0a878" },
  { id: "monster-ultra-paradise", name: "Monster Ultra Paradise", brand: "Monster", flavor: "Ultra Paradise", color: "#2ea89b" },
  { id: "monster-mango-loco", name: "Monster Mango Loco", brand: "Monster", flavor: "Mango Loco", color: "#e0951e" },
  { id: "monster-pipeline-punch", name: "Monster Pipeline Punch", brand: "Monster", flavor: "Pipeline Punch", color: "#e0781e" },
  { id: "monster-pacific-punch", name: "Monster Pacific Punch", brand: "Monster", flavor: "Pacific Punch", color: "#c92e5a" },
  { id: "monster-khaos", name: "Monster Khaos", brand: "Monster", flavor: "Khaos", color: "#7a1ea0" },
  { id: "monster-assault", name: "Monster Assault", brand: "Monster", flavor: "Assault", color: "#3a3a3a" },
  { id: "monster-nitro-super-dry", name: "Monster Nitro Super Dry", brand: "Monster", flavor: "Nitro Super Dry", color: "#1e1e1e" },
  { id: "java-monster-salted-caramel", name: "Java Monster Salted Caramel", brand: "Monster", flavor: "Java · Salted Caramel", color: "#6a4a2e" },
  { id: "java-monster-mean-bean", name: "Java Monster Mean Bean", brand: "Monster", flavor: "Java · Mean Bean", color: "#3a2a1e" },

  // Alani Nu
  { id: "alani-hawaiian-shaved-ice", name: "Alani Nu Hawaiian Shaved Ice", brand: "Alani Nu", flavor: "Hawaiian Shaved Ice", color: "#2e9bd6" },
  { id: "alani-witchs-brew", name: "Alani Nu Witch's Brew", brand: "Alani Nu", flavor: "Witch's Brew", color: "#7a2ea0" },
  { id: "alani-cosmic-stardust", name: "Alani Nu Cosmic Stardust", brand: "Alani Nu", flavor: "Cosmic Stardust", color: "#3a1e8c" },
  { id: "alani-breezeberry", name: "Alani Nu Breezeberry", brand: "Alani Nu", flavor: "Breezeberry", color: "#2e6fd6" },
  { id: "alani-tropsicle", name: "Alani Nu Tropsicle", brand: "Alani Nu", flavor: "Tropsicle", color: "#e0781e" },
  { id: "alani-rainbow-candy", name: "Alani Nu Rainbow Candy", brand: "Alani Nu", flavor: "Rainbow Candy", color: "#c92e8c" },
  { id: "alani-mimosa", name: "Alani Nu Mimosa", brand: "Alani Nu", flavor: "Mimosa", color: "#e0c020" },
  { id: "alani-arctic-white", name: "Alani Nu Arctic White", brand: "Alani Nu", flavor: "Arctic White", color: "#d6d6d6" },

  // Celsius
  { id: "celsius-sparkling-orange", name: "Celsius Sparkling Orange", brand: "Celsius", flavor: "Sparkling Orange", color: "#e0731e" },
  { id: "celsius-grape-rush", name: "Celsius Sparkling Grape Rush", brand: "Celsius", flavor: "Sparkling Grape Rush", color: "#5a1e8c" },
  { id: "celsius-cherry-lime", name: "Celsius Sparkling Cherry Lime", brand: "Celsius", flavor: "Sparkling Cherry Lime", color: "#c9203a" },
  { id: "celsius-wild-berry", name: "Celsius Sparkling Wild Berry", brand: "Celsius", flavor: "Sparkling Wild Berry", color: "#7a2e6a" },
  { id: "celsius-kiwi-guava", name: "Celsius Kiwi Guava", brand: "Celsius", flavor: "Kiwi Guava", color: "#5aa32e" },
  { id: "celsius-peach-vibe", name: "Celsius Peach Vibe", brand: "Celsius", flavor: "Peach Vibe", color: "#e0a11e" },
  { id: "celsius-watermelon-berry", name: "Celsius Watermelon Berry", brand: "Celsius", flavor: "Watermelon Berry", color: "#e0507a" },
  { id: "celsius-tropical-vibe", name: "Celsius Tropical Vibe", brand: "Celsius", flavor: "Tropical Vibe", color: "#e0a11e" },
  { id: "celsius-fuji-apple-pear", name: "Celsius Sparkling Fuji Apple Pear", brand: "Celsius", flavor: "Sparkling Fuji Apple Pear", color: "#8cc92e" },
  { id: "celsius-cosmic-vibe", name: "Celsius Cosmic Vibe", brand: "Celsius", flavor: "Cosmic Vibe", color: "#2e3a8c" },
  { id: "celsius-arctic-vibe", name: "Celsius Arctic Vibe", brand: "Celsius", flavor: "Arctic Vibe", color: "#2e9bd6" },

  // Bang
  { id: "bang-original", name: "Bang Energy", brand: "Bang", flavor: "Original", color: "#111111" },
  { id: "bang-rainbow-unicorn", name: "Bang Rainbow Unicorn", brand: "Bang", flavor: "Rainbow Unicorn", color: "#c92e8c" },
  { id: "bang-star-blast", name: "Bang Star Blast", brand: "Bang", flavor: "Star Blast", color: "#2e6fc9" },
  { id: "bang-purple-guava-pear", name: "Bang Purple Guava Pear", brand: "Bang", flavor: "Purple Guava Pear", color: "#7a2e9b" },
  { id: "bang-cotton-candy", name: "Bang Cotton Candy", brand: "Bang", flavor: "Cotton Candy", color: "#e0a1c9" },
  { id: "bang-lemon-drop", name: "Bang Lemon Drop", brand: "Bang", flavor: "Lemon Drop", color: "#e0d61e" },
  { id: "bang-peach-mango", name: "Bang Peach Mango", brand: "Bang", flavor: "Peach Mango", color: "#e0a11e" },
  { id: "bang-champagne", name: "Bang Champagne", brand: "Bang", flavor: "Champagne", color: "#d6c078" },

  // Reign
  { id: "reign-original", name: "Reign Total Body Fuel", brand: "Reign", flavor: "Original", color: "#1e1e1e" },
  { id: "reign-melon-mania", name: "Reign Melon Mania", brand: "Reign", flavor: "Melon Mania", color: "#4ba32e" },
  { id: "reign-white-gummy-bear", name: "Reign White Gummy Bear", brand: "Reign", flavor: "White Gummy Bear", color: "#d6d6d6" },
  { id: "reign-sour-apple", name: "Reign Sour Apple", brand: "Reign", flavor: "Sour Apple", color: "#8cc92e" },
  { id: "reign-carnival-candy", name: "Reign Carnival Candy", brand: "Reign", flavor: "Carnival Candy", color: "#c92e8c" },
  { id: "reign-peach-fizz", name: "Reign Peach Fizz", brand: "Reign", flavor: "Peach Fizz", color: "#e0a878" },
  { id: "reign-razzle-berry", name: "Reign Razzle Berry", brand: "Reign", flavor: "Razzle Berry", color: "#7a2e6a" },
  { id: "reign-lilikoi-lychee-lime", name: "Reign Lilikoi Lychee Lime", brand: "Reign", flavor: "Lilikoi Lychee Lime", color: "#c9e020" },
  { id: "reign-orange-dreamsicle", name: "Reign Orange Dreamsicle", brand: "Reign", flavor: "Orange Dreamsicle", color: "#e0781e" },

  // Ghost
  { id: "ghost-energy", name: "Ghost Energy", brand: "Ghost", flavor: "Original", color: "#3a3a3a" },
  { id: "ghost-swedish-fish", name: "Ghost Swedish Fish", brand: "Ghost", flavor: "Swedish Fish", color: "#c92e3a" },
  { id: "ghost-cherry-limeade", name: "Ghost Cherry Limeade", brand: "Ghost", flavor: "Cherry Limeade", color: "#c9203a" },
  { id: "ghost-orange-cream", name: "Ghost Orange Cream", brand: "Ghost", flavor: "Orange Cream", color: "#e0a11e" },
  { id: "ghost-watermelon", name: "Ghost Watermelon", brand: "Ghost", flavor: "Watermelon", color: "#2e9b5a" },
  { id: "ghost-grape", name: "Ghost Grape", brand: "Ghost", flavor: "Grape", color: "#5a1e8c" },
  { id: "ghost-sour-patch-blue-raspberry", name: "Ghost Sour Patch Kids Blue Raspberry", brand: "Ghost", flavor: "Sour Patch Kids Blue Raspberry", color: "#1e5ac9" },
  { id: "ghost-warheads-green-apple", name: "Ghost Warheads Sour Green Apple", brand: "Ghost", flavor: "Warheads Sour Green Apple", color: "#8cc92e" },
  { id: "ghost-krispy-kreme", name: "Ghost Krispy Kreme Original Glazed", brand: "Ghost", flavor: "Krispy Kreme Original Glazed", color: "#e0c020" },

  // C4
  { id: "c4-original", name: "C4 Energy", brand: "C4", flavor: "Original", color: "#e02020" },
  { id: "c4-frozen-bombsicle", name: "C4 Frozen Bombsicle", brand: "C4", flavor: "Frozen Bombsicle", color: "#2e6fd6" },
  { id: "c4-icy-blue-razz", name: "C4 Icy Blue Razz", brand: "C4", flavor: "Icy Blue Razz", color: "#1e5ac9" },
  { id: "c4-starblast", name: "C4 Starblast", brand: "C4", flavor: "Starblast", color: "#7a2e9b" },
  { id: "c4-strawberry-watermelon", name: "C4 Strawberry Watermelon", brand: "C4", flavor: "Strawberry Watermelon", color: "#e0507a" },
  { id: "c4-twisted-limeade", name: "C4 Twisted Limeade", brand: "C4", flavor: "Twisted Limeade", color: "#8cc92e" },
  { id: "c4-orange-slice", name: "C4 Orange Slice", brand: "C4", flavor: "Orange Slice", color: "#e0781e" },
  { id: "c4-fruit-punch", name: "C4 Fruit Punch", brand: "C4", flavor: "Fruit Punch", color: "#c9203a" },

  // Rockstar
  { id: "rockstar-original", name: "Rockstar Energy", brand: "Rockstar", flavor: "Original", color: "#e0c020" },
  { id: "rockstar-punched", name: "Rockstar Punched", brand: "Rockstar", flavor: "Punched Guava", color: "#c92e5a" },
  { id: "rockstar-zero-carb", name: "Rockstar Zero Carb", brand: "Rockstar", flavor: "Zero Carb", color: "#3a3a3a" },
  { id: "rockstar-recovery-lemonade", name: "Rockstar Recovery Lemon Lime", brand: "Rockstar", flavor: "Recovery · Lemon Lime", color: "#c9e020" },
  { id: "rockstar-xdurance", name: "Rockstar Xdurance Fruit Punch", brand: "Rockstar", flavor: "Xdurance · Fruit Punch", color: "#c9203a" },
  { id: "rockstar-pure-zero-punched", name: "Rockstar Pure Zero Punched", brand: "Rockstar", flavor: "Pure Zero Punched", color: "#e0507a" },

  // NOS
  { id: "nos-original", name: "NOS Energy", brand: "NOS", flavor: "Original", color: "#1e1e8c" },
  { id: "nos-grape", name: "NOS Grape", brand: "NOS", flavor: "Grape", color: "#5a1e8c" },
  { id: "nos-charged", name: "NOS Charged", brand: "NOS", flavor: "Charged", color: "#1e5ac9" },
  { id: "nos-loaded-cherry-freeze", name: "NOS Loaded Cherry Freeze", brand: "NOS", flavor: "Loaded Cherry Freeze", color: "#c9203a" },

  // Rip It
  { id: "rip-it-power", name: "Rip It Power Force", brand: "Rip It", flavor: "Power Force", color: "#d6c92e" },
  { id: "rip-it-berry-blitz", name: "Rip It Berry Blitz", brand: "Rip It", flavor: "Berry Blitz", color: "#5a1e8c" },
  { id: "rip-it-tropical-punch", name: "Rip It Tropical Punch", brand: "Rip It", flavor: "Tropical Punch", color: "#e0781e" },

  // Bucked Up
  { id: "buckedup-woke-af", name: "Bucked Up Woke AF", brand: "Bucked Up", flavor: "Woke AF", color: "#1e5ac9" },
  { id: "buckedup-rocket-pop", name: "Bucked Up Rocket Pop", brand: "Bucked Up", flavor: "Rocket Pop", color: "#c9203a" },
  { id: "buckedup-georgia-peach", name: "Bucked Up Georgia Peach", brand: "Bucked Up", flavor: "Georgia Peach", color: "#e0a878" },
  { id: "buckedup-grape", name: "Bucked Up Grape", brand: "Bucked Up", flavor: "Grape", color: "#5a1e8c" },

  // Bloom
  { id: "bloom-nutrition", name: "Bloom Sparkling Energy", brand: "Bloom", flavor: "Blue Raspberry", color: "#2e9bd6" },
  { id: "bloom-watermelon", name: "Bloom Sparkling Energy Watermelon", brand: "Bloom", flavor: "Watermelon", color: "#e0507a" },

  // Prime
  { id: "prime-energy-blue-raspberry", name: "Prime Energy", brand: "Prime", flavor: "Blue Raspberry", color: "#2e6fd6" },
  { id: "prime-energy-tropical-punch", name: "Prime Energy Tropical Punch", brand: "Prime", flavor: "Tropical Punch", color: "#e0781e" },
  { id: "prime-energy-lemon-lime", name: "Prime Energy Lemon Lime", brand: "Prime", flavor: "Lemon Lime", color: "#c9e020" },

  // Ryse
  { id: "ryse-fuel", name: "Ryse Fuel", brand: "Ryse", flavor: "Original", color: "#1e1e1e" },
  { id: "ryse-fuel-watermelon", name: "Ryse Fuel Watermelon", brand: "Ryse", flavor: "Watermelon", color: "#e0507a" },
];

// Curated picks shown in the "Popular This Week" row when there isn't enough
// real activity yet to rank it live. Editorial, kept intentionally small.
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
