/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { servicesService } from "@/services/services.service";
import { cookies } from "next/headers";

export const getServiceById = async (id: string) => {
  const cookieStore =await cookies(); // server-side cookies

  try {
    const res = await servicesService.getServicesById(id, cookieStore);
    console.log("Fetched service by ID:", res);
    return res;
  } catch (err: any) {
    console.error(`Error fetching service with id ${id}:`, err);
    return { success: false, message: err?.message || "Failed to fetch service data" };
  }
};