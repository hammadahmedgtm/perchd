export type Category =
  | "laptop"
  | "water_bottle"
  | "phone_case"
  | "backpack"
  | "bike"
  | "car";

export const CATEGORY_LABEL: Record<Category, string> = {
  laptop: "Laptop",
  water_bottle: "Water bottle",
  phone_case: "Phone case",
  backpack: "Backpack",
  bike: "Bike",
  car: "Car",
};

export type SeenContext =
  | "coffee_shops"
  | "gym"
  | "campus"
  | "commute"
  | "video_calls";

export const CONTEXT_LABEL: Record<SeenContext, string> = {
  coffee_shops: "Coffee shops",
  gym: "Gym",
  campus: "Campus",
  commute: "Commute",
  video_calls: "Video calls",
};

export type ListingStatus = "draft" | "pending_review" | "live" | "expired";

export type SpotSize = "small" | "medium" | "large";

export const SPOT_SIZE_LABEL: Record<SpotSize, string> = {
  small: "Small",
  medium: "Medium",
  large: "Large",
};

export type Spot = {
  id: string;
  label: string;
  size: SpotSize;
  dimensionsCm: string;
  price: number;
  takenBy: string | null;
};

export type Seller = {
  id: string;
  name: string;
  handle: string;
  avatarInitial: string;
  memberSince: string;
  listingsCount: number;
  followers: number;
  verified: boolean;
  role: string;
};

export type Listing = {
  id: string;
  title: string;
  category: Category;
  itemModel: string;
  status: ListingStatus;
  contexts: SeenContext[];
  city: string;
  state: string;
  lat: number;
  lng: number;
  spots: Spot[];
  durationMonths: number;
  endsAt: string;
  proofPhotoUrl: string | null;
  seller: Seller;
  createdAt: string;
};

export function spotsLeft(listing: Listing): number {
  return listing.spots.filter((s) => !s.takenBy).length;
}

export function spotsTotal(listing: Listing): number {
  return listing.spots.length;
}

export function priceFrom(listing: Listing): number {
  return Math.min(...listing.spots.map((s) => s.price));
}

export function soldValue(listing: Listing): number {
  return listing.spots.filter((s) => s.takenBy).reduce((sum, s) => sum + s.price, 0);
}

export function totalValue(listing: Listing): number {
  return listing.spots.reduce((sum, s) => sum + s.price, 0);
}

export type PurchaseStatus = "awaiting_approval" | "live" | "declined" | "expired";

export type Purchase = {
  id: string;
  listing: Listing;
  spotId: string;
  brandName: string;
  price: number;
  status: PurchaseStatus;
  purchasedAt: string;
};

export type AdSlotKind = "homepage_banner" | "category_sidebar" | "sponsored_listing";

export type AdSlot = {
  id: string;
  kind: AdSlotKind;
  title: string;
  description: string;
  price: number;
  available: boolean;
};

export type UserRole = "seller" | "brand" | "admin";
