"use client";
/**
 * Leaflet map adapter for the SCHEMATIC sample campus (CRS.Simple, no tiles, no real coordinates).
 * To use real GPS data later, add a sibling adapter (e.g. MapLibre) with the same props.
 */
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useEffect, useRef } from "react";
import type { CampusLocation, CampusRoute } from "@/types/domain";

export interface CampusMapProps {
  locations: CampusLocation[]; selectedId?: string; originId?: string; destId?: string;
  route: CampusRoute | null; onSelect: (id: string) => void;
}
const W = 1000, H = 700;
const toLatLng = (x: number, y: number): L.LatLngTuple => [H - y, x];

const BACKDROP = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}"><rect width="${W}" height="${H}" fill="#12192e"/>
<g stroke="#293149" stroke-width="1">${Array.from({ length: 19 }, (_, i) => `<line x1="${(i + 1) * 50}" y1="0" x2="${(i + 1) * 50}" y2="${H}"/>`).join("")}${Array.from({ length: 13 }, (_, i) => `<line x1="0" y1="${(i + 1) * 50}" x2="${W}" y2="${(i + 1) * 50}"/>`).join("")}</g>
<path d="M70 350 H930 M470 120 V620" stroke="#202841" stroke-width="22" fill="none" stroke-linecap="round"/>
<circle cx="470" cy="350" r="60" fill="#171e34" stroke="#293149"/><text x="500" y="40" fill="#8089a3" font-size="20" font-family="sans-serif">Sample layout, not a real map</text></svg>`;

const COLORS: Record<string, string> = { gate: "#8089a3", hostel: "#8b5cf6", food: "#f59e0b", medical: "#ef4444", sports: "#22c55e", library: "#6c63ff", academic: "#6c63ff", admin: "#a5a9be", landmark: "#06b6d4" };

export default function CampusMap({ locations, selectedId, originId, destId, route, onSelect }: CampusMapProps) {
  const el = useRef<HTMLDivElement>(null);
  const map = useRef<L.Map | null>(null);
  const layer = useRef<L.LayerGroup | null>(null);
  const onSelectRef = useRef(onSelect);
  useEffect(() => { onSelectRef.current = onSelect; });

  useEffect(() => {
    if (!el.current || map.current) return;
    const m = L.map(el.current, { crs: L.CRS.Simple, minZoom: -1, maxZoom: 2, zoomSnap: 0.25, attributionControl: false, maxBoundsViscosity: 0.8 });
    const bounds: L.LatLngBoundsLiteral = [[0, 0], [H, W]];
    const svg = new DOMParser().parseFromString(BACKDROP, "image/svg+xml").documentElement as unknown as SVGElement;
    L.svgOverlay(svg, bounds).addTo(m);
    m.fitBounds(bounds); m.setMaxBounds([[-100, -100], [H + 100, W + 100]]);
    layer.current = L.layerGroup().addTo(m); map.current = m;
    const ro = new ResizeObserver(() => { m.invalidateSize(); });
    ro.observe(el.current);
    return () => { ro.disconnect(); m.remove(); map.current = null; };
  }, []);

  useEffect(() => {
    const g = layer.current; if (!g) return;
    g.clearLayers();
    if (route) {
      L.polyline(route.waypoints.map((w) => toLatLng(w.x, w.y)), { color: "#06b6d4", weight: 4, dashArray: "8 8" }).addTo(g);
    }
    locations.forEach((l) => {
      const sel = l.id === selectedId, role = l.id === originId ? "From" : l.id === destId ? "To" : "";
      const icon = L.divIcon({ className: "", iconSize: [28, 28], iconAnchor: [14, 14],
        html: `<span aria-hidden="true" style="display:flex;align-items:center;justify-content:center;width:28px;height:28px;border-radius:9999px;border:2px solid ${sel || role ? "#fff" : "#0B1023"};background:${COLORS[l.category] ?? "#6c63ff"};box-shadow:0 0 0 ${sel ? 4 : 0}px rgba(139,92,246,.45);color:#fff;font:600 10px sans-serif">${role}</span>` });
      const mk = L.marker(toLatLng(l.schematic.x, l.schematic.y), { icon, keyboard: true, title: l.name, alt: l.name }).addTo(g);
      mk.bindTooltip(l.name, { direction: "top", offset: [0, -14] });
      mk.on("click", () => onSelectRef.current(l.id));
    });
  }, [locations, selectedId, originId, destId, route]);

  useEffect(() => {
    const l = locations.find((x) => x.id === selectedId);
    if (l && map.current) map.current.panTo(toLatLng(l.schematic.x, l.schematic.y), { animate: true });
  }, [selectedId, locations]);

  return <div ref={el} role="application" aria-label="Interactive sample campus map. Use the location list for a keyboard-friendly alternative." className="size-full min-h-[320px] rounded-2xl border border-border" style={{ background: "var(--elevated)" }} />;
}
