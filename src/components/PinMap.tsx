import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

export interface MapMarker {
  id: string;
  lat: number;
  lng: number;
  color: string;
  label: string;
}

interface PinMapProps {
  markers: MapMarker[];
  center?: [number, number] | null;
  zoom?: number;
  onMapClick?: (lat: number, lng: number) => void;
  pickedLocation?: [number, number] | null;
  height?: number;
  className?: string;
}

const DEFAULT_CENTER: [number, number] = [39.8283, -98.5795]; // continental US

function dotIcon(color: string) {
  return L.divIcon({
    className: "pin-map__dot-wrap",
    html: `<span class="pin-map__dot" style="background:${color}"></span>`,
    iconSize: [14, 14],
    iconAnchor: [7, 7],
  });
}

const pickedIcon = L.divIcon({
  className: "pin-map__pick-wrap",
  html: `<span class="pin-map__pick"></span>`,
  iconSize: [22, 22],
  iconAnchor: [11, 20],
});

export function PinMap({
  markers,
  center,
  zoom = 12,
  onMapClick,
  pickedLocation,
  height = 240,
  className,
}: PinMapProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);
  const markerLayerRef = useRef<L.Marker[]>([]);
  const pickMarkerRef = useRef<L.Marker | null>(null);
  const hasCenteredRef = useRef(false);

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;
    const map = L.map(containerRef.current, {
      center: center ?? DEFAULT_CENTER,
      zoom: center ? zoom : 4,
    });
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 19,
    }).addTo(map);
    mapRef.current = map;
    hasCenteredRef.current = Boolean(center);

    return () => {
      map.remove();
      mapRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const map = mapRef.current;
    if (!map || !center || hasCenteredRef.current) return;
    map.setView(center, zoom);
    hasCenteredRef.current = true;
  }, [center, zoom]);

  useEffect(() => {
    const map = mapRef.current;
    if (!map || !onMapClick) return;
    const handler = (e: L.LeafletMouseEvent) => onMapClick(e.latlng.lat, e.latlng.lng);
    map.on("click", handler);
    return () => {
      map.off("click", handler);
    };
  }, [onMapClick]);

  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;
    markerLayerRef.current.forEach((m) => m.remove());
    markerLayerRef.current = markers.map((marker) =>
      L.marker([marker.lat, marker.lng], { icon: dotIcon(marker.color) }).addTo(map).bindPopup(marker.label)
    );
  }, [markers]);

  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;
    if (pickMarkerRef.current) {
      pickMarkerRef.current.remove();
      pickMarkerRef.current = null;
    }
    if (pickedLocation) {
      pickMarkerRef.current = L.marker(pickedLocation, { icon: pickedIcon }).addTo(map);
    }
  }, [pickedLocation]);

  return <div ref={containerRef} className={`pin-map ${className ?? ""}`} style={{ height }} />;
}
