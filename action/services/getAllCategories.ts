/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { servicesService } from "@/services/services.service";
import { cookies } from "next/headers";

export const getAllCategories = async () => {        // ✅ add async
  const cookieStore = await cookies();               // ✅ add await

  try {
    const res = await servicesService.getAllCategories(cookieStore); // ✅ add await
    console.log("Fetched categories:", res);
    return res;
  } catch (err: any) {
    console.error("Error fetching categories:", err);
    return {
      success: false,
      message: err?.message || "Failed to fetch all categories",
    };
  }
};