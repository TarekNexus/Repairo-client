"use server";







import { providerService } from "@/services/provider.service";
import { cookies } from "next/headers";

export  const deleteServiceProvider = async (id: string) => {
    const cookieStore = await cookies();
    try {
      const res = await providerService.deleteServiceProvider( id, cookieStore);
      console.log(res);
      return res;
    } catch (err) {
      console.error(err);
      return { success: false, message: "Failed to delete service" };
    }
};