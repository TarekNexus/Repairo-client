
"use server";


import {  reviewService } from "@/services/review.service";
import { cookies } from "next/headers";

export  const  getReviewsByService = async (serviceId: string) => {
    const cookieStore = await cookies();
    try {
      const res = await reviewService.getReviewsByService( cookieStore, serviceId);
      console.log(res);
      return res;
    } catch (err) {
      console.error(err);
      return { success: false, message: "Failed to fetch reviews" };
    }
};