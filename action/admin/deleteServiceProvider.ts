/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { cookies } from "next/headers";
import { adminUserService } from "@/services/admin.service";

/**
 * Delete service by ID (server action)
 */
export const deleteServiceProviderAction = async (id: string) => {
  const cookieStore = cookies(); // gets request cookies automatically

  try {
    const res = await adminUserService.deleteServiceProvider(id, cookieStore);
    if (!res.success) throw new Error(res.message || "Delete failed");
    return res;
  } catch (err: any) {
    console.error("Failed to delete service:", err);
    return {
      success: false,
      message: err?.message || "Failed to delete service",
    };
  }
};