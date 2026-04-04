"use server";

import { paymentService, BookingPayload } from "@/services/payment.service";
import { cookies } from "next/headers";

export const createBooking = async (data: BookingPayload) => {
  const cookieStore = await cookies();

  try {
    const res = await paymentService.createBooking(data, cookieStore);
    return res;
  } catch (err) {
    console.error(err);
    return {
      success: false,
      message: "Failed to create booking",
    };
  }
};