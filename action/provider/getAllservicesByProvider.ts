"use server";







import { providerService } from "@/services/provider.service";
import { cookies } from "next/headers";

export  const  getAllservicesByProvider = async () => {
    const cookieStore = await cookies();
    try {
      const res = await providerService.getAllservicesByProvider( cookieStore);
      console.log(res);
      return res;
    } catch (err) {
      console.error(err);
      return { success: false, message: "Failed to fetch all services" };
    }
};