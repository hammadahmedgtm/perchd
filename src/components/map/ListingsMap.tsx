"use client";

import { useState } from "react";
import L from "leaflet";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { priceFrom, type Listing } from "@/lib/types";

function pinIcon(price: number, selected: boolean) {
  return L.divIcon({
    className: "",
    html: `<div style="
      transform: translate(-50%, -100%);
      display: flex; flex-direction: column; align-items: center;
    ">
      <div style="
        background:${selected ? "#1d1d1f" : "#ffffff"};
        color:${selected ? "#ffffff" : "#1d1d1f"};
        border:1px solid #1d1d1f;
        border-radius:10px;
        padding:5px 10px;
        font: 700 12px -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
        white-space:nowrap;
        box-shadow:0 4px 10px -4px rgba(0,0,0,.25);
      ">$${price}</div>
      <div style="
        width:9px;height:9px;margin-top:-4px;
        background:${selected ? "#1d1d1f" : "#ffffff"};
        border:1px solid #1d1d1f;
        transform:rotate(45deg);
        border-radius:0 0 3px 0;
      "></div>
    </div>`,
    iconSize: [0, 0],
  });
}

export function ListingsMap({ listings }: { listings: Listing[] }) {
  const [selectedId, setSelectedId] = useState<string | null>(listings[0]?.id ?? null);
  const center: [number, number] =
    listings.length > 0 ? [listings[0].lat, listings[0].lng] : [39.5, -98.35];

  return (
    <MapContainer
      center={center}
      zoom={4}
      scrollWheelZoom={false}
      className="h-full w-full rounded-2xl"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {listings.map((l) => (
        <Marker
          key={l.id}
          position={[l.lat, l.lng]}
          icon={pinIcon(priceFrom(l), l.id === selectedId)}
          eventHandlers={{ click: () => setSelectedId(l.id) }}
        >
          <Popup>
            <strong>{l.title}</strong>
            <br />
            {l.city}, {l.state} &middot; from ${priceFrom(l)}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
