export type SponsorEntry = { id: string; name: string | null; tagline?: string };

// A fixed, site-wide inventory of rail positions — the same slot ids show up
// wherever a sponsor rail renders (browse, a listing page, ...), same as
// real sponsors occupying the same L1/L2/R1 positions everywhere. Pages
// slice however many fit their rail; empty ones are individually bookable
// via /advertise?slot=<id>.
export const LEFT_AD_SLOTS: SponsorEntry[] = [
  { id: "L1", name: "Northwind", tagline: "Design tools" },
  { id: "L2", name: "Fieldnote", tagline: "Note-taking app" },
  { id: "L3", name: null },
  { id: "L4", name: null },
  { id: "L5", name: null },
];

export const RIGHT_AD_SLOTS: SponsorEntry[] = [
  { id: "R1", name: "Cursorly", tagline: "AI code review" },
  { id: "R2", name: null },
  { id: "R3", name: null },
  { id: "R4", name: null },
  { id: "R5", name: null },
];
