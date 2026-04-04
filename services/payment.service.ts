/* eslint-disable @typescript-eslint/no-explicit-any */

const NEXT_PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL;

export type BookingPayload = {
  items: {
    serviceId: string;
  }[];
  date: string;
  address: string;
  phone: string;
};

export type PaymentPayload = {
  bookingId: string;
  method: "STRIPE" | "CASH_ON_DELIVERY";
};

export const paymentService = {
  createBooking: async (data: BookingPayload, cookieStore: any) => {
    try {
      const response = await fetch(
        `${NEXT_PUBLIC_API_URL}/api/customer/bookings`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Cookie: cookieStore.toString(),
          },
          body: JSON.stringify(data),
        }
      );

      return await response.json();
    } catch (error) {
      console.error("Booking create error:", error);
      return {
        success: false,
        message: "Failed to create booking",
      };
    }
  },

  createPayment: async (data: PaymentPayload, cookieStore: any) => {
    try {
      const response = await fetch(
        `${NEXT_PUBLIC_API_URL}/api/payment/create`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Cookie: cookieStore.toString(),
          },
          body: JSON.stringify(data),
        }
      );

      return await response.json();
    } catch (error) {
      console.error("Payment create error:", error);
      return {
        success: false,
        message: "Failed to create payment",
      };
    }
  },
};