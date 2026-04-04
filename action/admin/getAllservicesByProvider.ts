/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { cookies } from "next/headers";

import { adminUserService } from "@/services/admin.service";

export const getAllservicesByProvider = async () => {
  const cookieStore = await cookies();

  try {
    const res = await  adminUserService.getAllservicesByProvider(
      cookieStore
    );

    return res;
  } catch (err: any) {
    console.error("Failed to fetch services:", err);

    return {
      success: false,
      message: err?.message || "Failed to fetch services",
      data: [],
    };
  }
};