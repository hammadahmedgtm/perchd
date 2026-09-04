import type { SVGProps } from "react";
import type { Category, SeenContext } from "@/lib/types";

type IconProps = SVGProps<SVGSVGElement>;

const base = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export function LaptopIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <rect x="4" y="5" width="16" height="10" rx="1.2" />
      <path d="M2 18h20l-1.5-3h-17L2 18z" />
    </svg>
  );
}

export function WaterBottleIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <rect x="8" y="2.5" width="4" height="3" rx="0.6" />
      <path d="M7 6.5h6l1 2.5v11a1.5 1.5 0 0 1-1.5 1.5h-5A1.5 1.5 0 0 1 6 20V9l1-2.5z" />
      <line x1="6" y1="12" x2="14" y2="12" />
    </svg>
  );
}

export function PhoneCaseIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <rect x="6" y="2" width="12" height="20" rx="2.5" />
      <line x1="9" y1="5" x2="15" y2="5" />
    </svg>
  );
}

export function BackpackIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M7 9V6.5a5 5 0 0 1 10 0V9" />
      <path d="M6 9h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2z" />
      <path d="M9 13h6" />
    </svg>
  );
}

export function BikeIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <circle cx="5.5" cy="17.5" r="3.5" />
      <circle cx="18.5" cy="17.5" r="3.5" />
      <path d="M5.5 17.5 10 8h5l3.5 9.5" />
      <path d="M10 8 8 5h-2" />
    </svg>
  );
}

export function CarIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M4 16v-3.5L6 8h12l2 4.5V16" />
      <path d="M2 16h20" />
      <circle cx="7" cy="16" r="1.6" />
      <circle cx="17" cy="16" r="1.6" />
    </svg>
  );
}

export const CATEGORY_ICON: Record<Category, (props: IconProps) => React.ReactElement> = {
  laptop: LaptopIcon,
  water_bottle: WaterBottleIcon,
  phone_case: PhoneCaseIcon,
  backpack: BackpackIcon,
  bike: BikeIcon,
  car: CarIcon,
};

export function CoffeeIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M4 8h13v6a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5V8z" />
      <path d="M17 9h1.5a2.5 2.5 0 0 1 0 5H17" />
    </svg>
  );
}

export function GymIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M3 12h2M19 12h2" />
      <rect x="5" y="9" width="2.4" height="6" rx="0.8" />
      <rect x="16.6" y="9" width="2.4" height="6" rx="0.8" />
      <line x1="7.4" y1="12" x2="16.6" y2="12" />
    </svg>
  );
}

export function CampusIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M12 4 2 8.5 12 13l10-4.5L12 4z" />
      <path d="M6 10.5V15c0 1.5 2.7 3 6 3s6-1.5 6-3v-4.5" />
    </svg>
  );
}

export function CommuteIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M5 20c0-5 4-4 4-9s-2-5-2-7" />
      <path d="M19 20c0-5-4-4-4-9s2-5 2-7" />
    </svg>
  );
}

export function VideoCallIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <rect x="2" y="5" width="15" height="11" rx="1.5" />
      <path d="M17 9.5l4.5-3v9l-4.5-3" />
    </svg>
  );
}

export const CONTEXT_ICON: Record<SeenContext, (props: IconProps) => React.ReactElement> = {
  coffee_shops: CoffeeIcon,
  gym: GymIcon,
  campus: CampusIcon,
  commute: CommuteIcon,
  video_calls: VideoCallIcon,
};

export function SearchIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <circle cx="11" cy="11" r="7" />
      <line x1="21" y1="21" x2="16.2" y2="16.2" />
    </svg>
  );
}

export function ArrowRightIcon(props: IconProps) {
  return (
    <svg {...base} strokeWidth={2} {...props}>
      <line x1="4" y1="12" x2="20" y2="12" />
      <path d="M14 6l6 6-6 6" />
    </svg>
  );
}

export function ShieldCheckIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3z" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  );
}

export function UploadIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M12 16V4M7 9l5-5 5 5" />
      <path d="M4 16v3a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-3" />
    </svg>
  );
}

export function ListIcon(props: IconProps) {
  return (
    <svg {...base} strokeWidth={2} {...props}>
      <line x1="4" y1="7" x2="20" y2="7" />
      <line x1="4" y1="12" x2="20" y2="12" />
      <line x1="4" y1="17" x2="14" y2="17" />
    </svg>
  );
}

export function GridIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <rect x="3" y="3" width="8" height="8" rx="1.5" />
      <rect x="13" y="3" width="8" height="8" rx="1.5" />
      <rect x="3" y="13" width="8" height="8" rx="1.5" />
      <rect x="13" y="13" width="8" height="8" rx="1.5" />
    </svg>
  );
}

export function CardIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <rect x="2.5" y="5.5" width="19" height="13" rx="2" />
      <line x1="2.5" y1="10" x2="21.5" y2="10" />
    </svg>
  );
}

export function GearIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09a1.65 1.65 0 0 0-1-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09a1.65 1.65 0 0 0 1.51-1 1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
    </svg>
  );
}

export function PeopleIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <circle cx="9" cy="8" r="3.2" />
      <path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6" />
      <circle cx="17.5" cy="9" r="2.4" />
      <path d="M15.5 20c.2-2.6 2-4.6 4.4-5" />
    </svg>
  );
}

export function BuildingIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <rect x="3" y="6" width="18" height="13" rx="2" />
      <path d="M3 10h18" />
    </svg>
  );
}

export function CheckCircleIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="M9 12.5l2.5 2.5L16 9" />
    </svg>
  );
}

export function MapPinIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M12 21s7-6.5 7-12a7 7 0 0 0-14 0c0 5.5 7 12 7 12z" />
      <circle cx="12" cy="9" r="2.5" />
    </svg>
  );
}
