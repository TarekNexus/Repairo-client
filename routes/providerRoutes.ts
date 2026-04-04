// routes/sellerRoutes.ts
import { LayoutDashboard, Pill, ShoppingCart } from "lucide-react";
import { Route } from "@/types";

export const providerRoutes: Route[] = [
  { href: "/provider", label: "Dashboard", icon: LayoutDashboard },
  { href: "/provider/services", label: "Services", icon: Pill },
  { href: "/provider/orders", label: "Orders", icon: ShoppingCart },
];