"use server";

import { orderService } from "@/services/order.service";
import { cookies } from "next/headers";

// Define allowed statuses
export type OrderStatus = "PENDING" | "ACCEPTED" | "ON_THE_WAY" | "COMPLETED" | "CANCELLED";

export const updateOrderStatus = async (orderId: string, status: OrderStatus) => {
  const cookieStore = await cookies();

  try {
    const res = await orderService.updateOrderStatus(orderId, status, cookieStore);
    console.log("Updated Order:", res);
    return res; // will return the updated order or null
  } catch (err) {
    console.error("Failed to update order status:", err);
    return { success: false, message: "Failed to update order status" };
  }
};