import { hasAffiliateTag } from "../lib/affiliate";

export function AffiliateDisclosure() {
  if (!hasAffiliateTag()) return null;
  return <p className="affiliate-disclosure">As an Amazon Associate, Canly earns from qualifying purchases.</p>;
}
