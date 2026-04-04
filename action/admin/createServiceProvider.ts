/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { cookies } from "next/headers";

import { adminUserService, ServiceInput } from "@/services/admin.service";

export const createServiceProvider = async (
  serviceData: ServiceInput
) => {
  const cookieStore = await cookies();

  try {
    const res = await adminUserService.createServiceProvider(
      serviceData,
      cookieStore
    );

    return res;
  } catch (err: any) {
    console.error("Failed to create service:", err);

    return {
      success: false,
      message: err?.message || "Failed to create service",
    };
  }
};