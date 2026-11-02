import { useEffect, useState } from "react";

const ASSET_PATTERN = /assets\/index-[\w-]+\.js/;

function currentBundle(): string | null {
  const script = document.querySelector<HTMLScriptElement>('script[src*="assets/index-"]');
  return script?.src.match(ASSET_PATTERN)?.[0] ?? null;
}

async function latestBundle(): Promise<string | null> {
  const res = await fetch(`${import.meta.env.BASE_URL}index.html?v=${Date.now()}`, { cache: "no-store" });
  if (!res.ok) return null;
  return (await res.text()).match(ASSET_PATTERN)?.[0] ?? null;
}

// Installed home-screen apps can keep running an old copy for days. This checks
// whether a newer build has been deployed whenever the app is opened or comes
// back to the foreground, and offers a one-tap refresh.
export function UpdatePrompt() {
  const [updateReady, setUpdateReady] = useState(false);

  useEffect(() => {
    const running = currentBundle();
    if (!running) return; // dev server or a build we can't compare

    const check = async () => {
      try {
        const latest = await latestBundle();
        if (latest && latest !== running) setUpdateReady(true);
      } catch {
        // offline — try again next time
      }
    };

    const onVisible = () => {
      if (document.visibilityState === "visible") check();
    };

    check();
    document.addEventListener("visibilitychange", onVisible);
    const timer = window.setInterval(check, 5 * 60 * 1000);
    return () => {
      document.removeEventListener("visibilitychange", onVisible);
      window.clearInterval(timer);
    };
  }, []);

  const refresh = async () => {
    try {
      const regs = await navigator.serviceWorker?.getRegistrations();
      await Promise.all((regs ?? []).map((r) => r.unregister()));
      const keys = await caches.keys();
      await Promise.all(keys.map((k) => caches.delete(k)));
    } catch {
      // best effort
    }
    window.location.reload();
  };

  if (!updateReady) return null;

  return (
    <div className="update-prompt" role="status">
      <span>A new version of Canly is ready.</span>
      <button type="button" className="update-prompt__btn" onClick={refresh}>
        Update
      </button>
    </div>
  );
}
