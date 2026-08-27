import { useEffect, useState } from "react";

export function useGeolocation(): [number, number] | null {
  const [position, setPosition] = useState<[number, number] | null>(null);

  useEffect(() => {
    if (!navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition(
      (pos) => setPosition([pos.coords.latitude, pos.coords.longitude]),
      () => {
        // permission denied or unavailable — map just stays at its default view
      },
      { timeout: 8000 }
    );
  }, []);

  return position;
}
