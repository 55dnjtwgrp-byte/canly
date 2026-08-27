import { useCallback, useEffect, useState } from "react";
import type { Pin } from "../types";

const STORAGE_KEY = "canly:pins";

function loadPins(): Pin[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Pin[]) : [];
  } catch {
    return [];
  }
}

export function usePins() {
  const [pins, setPins] = useState<Pin[]>(() => loadPins());

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(pins));
    } catch {
      // storage unavailable (e.g. private browsing) — pins stay in-memory for this session
    }
  }, [pins]);

  const addPin = useCallback((pin: Omit<Pin, "id" | "createdAt">) => {
    const newPin: Pin = {
      ...pin,
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      createdAt: new Date().toISOString(),
    };
    setPins((prev) => [newPin, ...prev]);
  }, []);

  const removePin = useCallback((id: string) => {
    setPins((prev) => prev.filter((p) => p.id !== id));
  }, []);

  return { pins, addPin, removePin };
}
