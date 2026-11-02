import { LegalPage } from "../components/LegalPage";
import { MIN_AGE } from "../lib/legal";

export function Privacy() {
  return (
    <LegalPage title="Privacy Policy">
      <p>
        This explains what Canly collects, why, and your choices. We keep it simple: we collect only what the app
        needs, we don't sell your data, and we don't run ads or third-party trackers.
      </p>

      <h2>What we collect</h2>
      <ul>
        <li>
          <strong>Account info:</strong> your email address and password (the password is handled by our
          authentication provider and never visible to us in plain text), plus the username you choose.
        </li>
        <li>
          <strong>Profile and activity:</strong> display name, bio, profile photo, ratings, reviews, favorite
          drinks, and who you follow.
        </li>
        <li>
          <strong>Pins:</strong> the drink, store name, city, note, and map location you choose when you drop a pin,
          along with your display name.
        </li>
        <li>
          <strong>Your device's location:</strong> if you allow it, your browser's location is used only on your
          device to center the map. It is not saved unless you drop a pin at a spot you choose.
        </li>
        <li>
          <strong>On your device:</strong> without an account, your ratings, favorites, profile, and pins are stored
          in your browser's local storage and stay on your device.
        </li>
      </ul>

      <h2>What is public</h2>
      <p>
        If you create an account, your username, display name, bio, photo, ratings, reviews, favorites, follower
        counts, and pins are visible to anyone, including people who aren't signed in. Don't put anything in them
        that you want to keep private.
      </p>

      <h2>Who handles your data</h2>
      <ul>
        <li>
          <strong>Supabase</strong> stores accounts and shared data on our behalf.
        </li>
        <li>
          <strong>GitHub Pages</strong> hosts the app, and like any web host may log technical data such as IP
          addresses.
        </li>
        <li>
          <strong>OpenStreetMap</strong> map tiles are requested from OpenStreetMap servers when you view a map,
          which means your IP address is visible to them.
        </li>
        <li>
          <strong>Amazon</strong>: if you tap a buy link, you leave Canly and Amazon's privacy policy applies. Amazon
          may use cookies to credit us for purchases.
        </li>
      </ul>
      <p>We do not sell your personal information or share it for advertising.</p>

      <h2>Children</h2>
      <p>
        Canly is not for children under {MIN_AGE}. We don't knowingly collect their information. If you think a child
        has made an account, contact us and we'll delete it.
      </p>

      <h2>Your choices</h2>
      <ul>
        <li>Edit or remove your ratings, reviews, favorites, and profile details in the app at any time.</li>
        <li>Clear data stored on your device by clearing your browser's site data.</li>
        <li>
          Ask us to delete your account and all associated data, or to give you a copy of it, using the contact
          below. Depending on where you live (for example California or the EU/UK), you may have additional rights
          to access, correct, or delete your data, and we honor those requests.
        </li>
      </ul>

      <h2>Keeping data</h2>
      <p>
        We keep account data until you ask us to delete it. We make reasonable efforts to protect your data, but no
        online service can guarantee perfect security.
      </p>

      <h2>Changes</h2>
      <p>If we change this policy in a meaningful way, we'll update the date above.</p>
    </LegalPage>
  );
}
