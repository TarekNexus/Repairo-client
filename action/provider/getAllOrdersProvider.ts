"use server";







import { providerService } from "@/services/provider.service";
import { cookies } from "next/headers";

export  const getAllOrdersProvider = async () => {
    const cookieStore = await cookies();
    try {
      const res = await providerService.getAllOrdersProvider( cookieStore,);
      console.log(res);
      return res;
    } catch (err) {
      console.error(err);
      return { success: false, message: "Failed to fetch orders" };
    }
};