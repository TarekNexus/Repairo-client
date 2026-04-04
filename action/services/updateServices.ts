"use server";




import {  ServiceInput, servicesService } from "@/services/services.service";
import { cookies } from "next/headers";

export  const updateService = async (id: string, serviceData: ServiceInput) => {
    const cookieStore = await cookies();
    try {
      const res = await servicesService.updateServiceProvider( id, serviceData, cookieStore);
      console.log(res);
      return res;
    } catch (err) {
      console.error(err);
      return { success: false, message: "Failed to update service" };
    }
};