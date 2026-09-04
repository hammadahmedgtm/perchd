import type { UserRole } from "@/lib/types";

export const ROLE_HOME: Record<UserRole, string> = {
  seller: "/dashboard/seller",
  brand: "/dashboard/brand",
  admin: "/dashboard/admin",
};
