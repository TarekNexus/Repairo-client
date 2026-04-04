/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { providerService, ServiceInput } from "@/services/provider.service";
import { cookies } from "next/headers";

export const createServiceProvider = async (serviceData: ServiceInput) => {
  const cookieStore = await cookies();
  try {
    const res = await providerService.createServiceProvider(cookieStore, serviceData);
    console.log("Service created successfully:", res);
    return res;
  } catch (err: any) {
    console.error("Failed to create service:", err.message || err);
    return { success: false, message: err.message || "Failed to create service" };
  }
};