/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { servicesService } from "@/services/services.service";
import { cookies } from "next/headers";

export const getAllServices = async () => {
  const cookieStore = cookies(); // server-side cookies

  try {
    const res = await servicesService.getAllservices(cookieStore);
    console.log("Fetched services:", res);
    return res;
  } catch (err: any) {
    console.error("Error fetching all services:", err);
    return { success: false, message: err?.message || "Failed to fetch all services" };
  }
};