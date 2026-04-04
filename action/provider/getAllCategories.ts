"use server";



import { servicesService } from "@/services/services.service";
import { cookies } from "next/headers";

export  const getAllCategories = async () => {
    const cookieStore = await cookies();
    try {
      const res = await servicesService.getAllCategories( cookieStore);
      console.log(res);
      return res;
    } catch (err) {
      console.error(err);
      return { success: false, message: "Failed to fetch all categories" };
    }
};