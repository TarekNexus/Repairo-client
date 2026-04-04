/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { cookies } from "next/headers";
import { adminUserService, ServiceInput } from "@/services/admin.service";

export const updateServiceProvider = async (
  id: string,
  serviceData: ServiceInput
) => {
  const cookieStore = await cookies();

  try {
    const res = await adminUserService.updateServiceProvider(
      id,            // <-- ID goes first
      serviceData,   // <-- payload second
      cookieStore
    );

    return res;
  } catch (err: any) {
    console.error("Failed to update service:", err);

    return {
      success: false,
      message: err?.message || "Failed to update service",
    };
  }
};