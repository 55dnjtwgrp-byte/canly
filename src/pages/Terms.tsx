import { LegalPage } from "../components/LegalPage";
import { GOVERNING_STATE, MIN_AGE } from "../lib/legal";

export function Terms() {
  return (
    <LegalPage title="Terms of Service">
      <p>
        These terms apply to your use of Canly, a community app for rating and discovering energy drinks. By using
        Canly or creating an account, you agree to them.
      </p>

      <h2>Who can use Canly</h2>
      <p>
        You must be at least {MIN_AGE} years old to create an account. Energy drinks are not recommended for
        children, and Canly is not directed at them.
      </p>

      <h2>Your account</h2>
      <p>
        You are responsible for your login and for what happens under your account. Choose a username that isn't
        misleading or offensive. We may remove usernames or accounts that are.
      </p>

      <h2>Your content</h2>
      <p>
        Ratings, reviews, profile details, favorites, and pins you post are yours. By posting them you give Canly a
        non-exclusive, worldwide, royalty-free license to store, display, and share them in the app. Profiles,
        ratings, reviews, favorites, follows, and pins are public by design.
      </p>
      <p>Don't post anything that is unlawful, hateful, harassing, sexually explicit, spam, or that you don't have the right to share. Don't post other people's personal information. Don't drop pins that point to someone's home or private property.</p>
      <p>
        We may remove content or accounts at our discretion, and we respond to reports and takedown requests sent to
        the contact address below.
      </p>

      <h2>Drink information and health</h2>
      <p>
        Caffeine amounts, sugar information, sizes, and flavors shown in Canly are for general reference. They are
        compiled from typical products, may be incomplete or out of date, and can differ from what's on the can.
        Always check the product label.
      </p>
      <p>
        Canly does not give medical advice. Energy drinks contain caffeine and are not suitable for everyone,
        including children, people who are pregnant or nursing, and people sensitive to caffeine or with heart or
        other health conditions. Talk to a doctor if you're unsure, and don't exceed a safe amount of caffeine.
      </p>

      <h2>Brands and trademarks</h2>
      <p>
        Canly is an independent community app. It is not affiliated with, endorsed by, or sponsored by any of the
        energy drink brands or companies mentioned. All product names, brand names, and trademarks belong to their
        respective owners and are used only to identify the products. Drink illustrations in Canly are original
        artwork, not product photography.
      </p>

      <h2>Affiliate links</h2>
      <p>
        Some links to buy drinks go to Amazon. As an Amazon Associate I earn from qualifying purchases. This doesn't
        change the price you pay. Purchases are made with the retailer, not Canly, and are governed by their terms.
      </p>

      <h2>Where to find drinks (pins)</h2>
      <p>
        Pins are shared by community members and may be wrong, outdated, or sold out. Canly doesn't guarantee that a
        product is available anywhere. Use common sense and be respectful at stores.
      </p>

      <h2>No warranty and limits on liability</h2>
      <p>
        Canly is provided "as is" and "as available," without warranties of any kind. To the fullest extent the law
        allows, Canly and its operators are not liable for indirect, incidental, or consequential damages, or for any
        loss arising from your use of the app, including reliance on drink information or pins.
      </p>

      <h2>Changes and ending your account</h2>
      <p>
        We may update these terms and the app. Continued use after a change means you accept it. You can stop using
        Canly anytime and ask us to delete your account. We can suspend or end accounts that break these terms.
      </p>

      <h2>Governing law</h2>
      <p>
        These terms are governed by the laws of {GOVERNING_STATE || "the state in which Canly's operator is based"},
        without regard to conflict-of-law rules.
      </p>
    </LegalPage>
  );
}
