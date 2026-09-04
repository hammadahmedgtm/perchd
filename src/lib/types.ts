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

export type ListingStatus = "draft" | "pending_review" | "live" | "sold" | "expired";

export type Listing = {
  id: string;
  title: string;
  category: Category;
  placement: string;
  stickerSize: string;
  price: number;
  durationDays: number;
  status: ListingStatus;
  contexts: SeenContext[];
  city: string;
  state: string;
  lat: number;
  lng: number;
  seller: {
    id: string;
    name: string;
    avatarInitial: string;
    memberSince: string;
    listingsCount: number;
    rating: number;
  };
  createdAt: string;
};

export type PurchaseStatus = "awaiting_approval" | "live" | "declined" | "expired";

export type Purchase = {
  id: string;
  listing: Listing;
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
