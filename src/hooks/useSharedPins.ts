import { useCallback, useEffect, useState } from "react";
import { getSupabase } from "../lib/supabase";
import type { Pin } from "../types";

interface PinRow {
  id: string;
  drink_id: string | null;
  custom_name: string | null;
  is_rare: boolean | null;
  store_name: string;
  city: string | null;
  note: string | null;
  lat: number | null;
  lng: number | null;
  posted_by: string | null;
  created_at: string;
}

function rowToPin(row: PinRow): Pin {
  return {
    id: row.id,
    drinkId: row.drink_id ?? undefined,
    customName: row.custom_name ?? undefined,
    isRare: row.is_rare ?? false,
    storeName: row.store_name,
    city: row.city ?? undefined,
    note: row.note ?? undefined,
    lat: row.lat ?? undefined,
    lng: row.lng ?? undefined,
    postedBy: row.posted_by ?? undefined,
    createdAt: row.created_at,
  };
}

export function useSharedPins() {
  const supabase = getSupabase();
  const isShared = Boolean(supabase);
  const [sharedPins, setSharedPins] = useState<Pin[]>([]);
  const [loading, setLoading] = useState(isShared);

  useEffect(() => {
    if (!supabase) return;
    let cancelled = false;

    supabase
      .from("pins")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(200)
      .then(({ data, error }) => {
        if (cancelled) return;
        if (!error && data) setSharedPins((data as PinRow[]).map(rowToPin));
        setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [supabase]);

  const insertSharedPin = useCallback(
    async (pin: Pin): Promise<boolean> => {
      if (!supabase) return false;
      const { error } = await supabase.from("pins").insert({
        id: pin.id,
        drink_id: pin.drinkId ?? null,
        custom_name: pin.customName ?? null,
        is_rare: pin.isRare ?? false,
        store_name: pin.storeName,
        city: pin.city ?? null,
        note: pin.note ?? null,
        lat: pin.lat ?? null,
        lng: pin.lng ?? null,
        posted_by: pin.postedBy ?? null,
        created_at: pin.createdAt,
      });
      if (error) return false;
      setSharedPins((prev) => [pin, ...prev]);
      return true;
    },
    [supabase]
  );

  return { sharedPins, loading, isShared, insertSharedPin };
}
