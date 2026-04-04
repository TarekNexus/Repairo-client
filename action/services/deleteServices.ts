/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { servicesService } from "@/services/services.service";
import { cookies } from "next/headers";

export const deleteService = async (id: string) => {
  const cookieStore = cookies(); // get server-side cookies

  try {
    const res = await servicesService.deleteServiceProvider(id, cookieStore);
    console.log("Service deleted:", res);
    return res;
  } catch (err: any) {
    console.error("Error deleting service:", err);
    return { success: false, message: err?.message || "Failed to delete service" };
  }
};