"use server";







import { providerService } from "@/services/provider.service";
import { cookies } from "next/headers";

export  const getMedicineById = async (id: string) => {
    const cookieStore = await cookies();
    try {
      const res = await providerService. getServiceById( cookieStore, id);
      console.log(res);
      return res;
    } catch (err) {
      console.error(err);
      return { success: false, message: "Failed to fetch service" };
    }
};