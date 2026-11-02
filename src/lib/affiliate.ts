import type { Drink } from "../types";

// Your Amazon Associates tracking ID (looks like "canly-20"). Leave empty until
// you're approved: buy links still work, they just earn nothing and the
// commission disclosure stays hidden.
export const AMAZON_TAG = "";

export function hasAffiliateTag(): boolean {
  return AMAZON_TAG.length > 0;
}

export function amazonSearchUrl(drink: Pick<Drink, "name">): string {
  const params = new URLSearchParams({ k: `${drink.name} energy drink` });
  if (AMAZON_TAG) params.set("tag", AMAZON_TAG);
  return `https://www.amazon.com/s?${params.toString()}`;
}
