"use server";

import { paymentService, PaymentPayload } from "@/services/payment.service";
import { cookies } from "next/headers";

export const createPayment = async (data: PaymentPayload) => {
  const cookieStore = await cookies();

  try {
    const res = await paymentService.createPayment(data, cookieStore);
    return res;
  } catch (err) {
    console.error(err);
    return {
      success: false,
      message: "Failed to create payment",
    };
  }
};