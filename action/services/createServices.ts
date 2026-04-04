/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { ServiceInput, servicesService } from "@/services/services.service";
import { cookies } from "next/headers";

export const createService = async (serviceData: ServiceInput) => {
  const cookieStore = cookies(); // get server-side cookies

  try {
    const res = await servicesService.createServiceProvider(cookieStore, serviceData);
    console.log("Service created:", res);
    return res;
  } catch (err: any) {
    console.error("Error creating service:", err);
    return { success: false, message: err?.message || "Failed to create service" };
  }
};