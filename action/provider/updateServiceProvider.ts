"use server";



import { providerService, ServiceInput } from "@/services/provider.service";
import { cookies } from "next/headers";

export  const updateServiceProvider = async (id: string, servicsData: ServiceInput) => {
    const cookieStore = await cookies();
    try {
      const res = await providerService.updateServiceProvider(  id, servicsData, cookieStore);
      console.log(res);
      return res;
    } catch (err) {
      console.error(err);
      return { success: false, message: "Failed to update service" };
    }
};