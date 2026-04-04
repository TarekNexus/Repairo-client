/* eslint-disable @typescript-eslint/no-explicit-any */
// 2026-04-02
const NEXT_PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL;

export const orderService = {
  // ✅ Get all orders
  getAllOrders: async (cookieStore: any) => {
    try {
      const response = await fetch(`${NEXT_PUBLIC_API_URL}/api/bookings/`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieStore.toString(),
        },
        cache: "no-store",
      });

      const result = await response.json();
      if (!result.success) throw new Error(result.message || "Failed to fetch orders");

      return result.data; // array of bookings
    } catch (error) {
      console.error("Error fetching orders:", error);
      return [];
    }
  },

  // ✅ Update order status
  updateOrderStatus: async (
    bookingId: string,
    status: "PENDING" | "ACCEPTED" | "ON_THE_WAY" | "COMPLETED" | "CANCELLED",
    cookieStore: any
  ) => {
    try {
      const response = await fetch(`${NEXT_PUBLIC_API_URL}/api/bookings/${bookingId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieStore.toString(),
        },
        body: JSON.stringify({ status }),
      });

      const result = await response.json();
      if (!result.success) throw new Error(result.message || "Failed to update order");

      return result.data; // updated booking
    } catch (error) {
      console.error(`Error updating order ${bookingId}:`, error);
      return null;
    }
  },


};