"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";

import { createPayment } from "@/action/payment/createPayment";
import { createBooking } from "@/action/booking/createBooking";
import Hero from "@/components/shop/Hero";

export default function CheckoutPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const serviceId = searchParams.get("serviceId") || "";

  const [date, setDate] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [method, setMethod] = useState<"STRIPE" | "CASH_ON_DELIVERY">("STRIPE");
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    if (!serviceId) {
      toast.error("Service id missing");
      return;
    }
    if (!date || !address || !phone) {
      toast.error("Please fill all fields");
      return;
    }

    try {
      setLoading(true);
      const bookingRes = await createBooking({
        items: [{ serviceId }],
        date: new Date(date).toISOString(),
        address,
        phone,
      });

      if (!bookingRes?.success) {
        toast.error(bookingRes?.message || "Booking failed");
        return;
      }

      const booking = bookingRes.data?.[0];
      if (!booking?.id) {
        toast.error("Booking id not found");
        return;
      }

      const paymentRes = await createPayment({ bookingId: booking.id, method });
      if (!paymentRes?.success) {
        toast.error(paymentRes?.message || "Payment failed");
        return;
      }

      if (method === "STRIPE") {
        const stripeUrl = paymentRes?.data?.url;
        if (stripeUrl) {
          window.location.href = stripeUrl;
          return;
        }
        toast.error("Stripe checkout url not found");
      }

      if (method === "CASH_ON_DELIVERY") {
        router.push(`/payment-success?bookingId=${booking.id}`);
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Hero />

      <div className="max-w-4xl mx-auto pb-10 px-4 relative">
        {/* Decorative Gradient Circles */}
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-linear-to-r from-[#00aeff]/40 to-[#5ce1e6]/30 rounded-full blur-3xl -z-10 animate-blob"></div>
        <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-linear-to-l from-[#00aeff]/30 to-[#5ce1e6]/40 rounded-full blur-3xl -z-10 animate-blob animation-delay-2000"></div>

        <div className="bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl p-10 md:p-16 flex flex-col gap-8 border-4 border-[#00aeff]/30">
          <h1 className="text-4xl md:text-4xl font-bold text-gray-800 text-center">
            Complete Your Booking
          </h1>

          {/* Form Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col">
              <label className="mb-2 font-medium text-gray-700">Date & Time</label>
              <input
                type="datetime-local"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-[#00aeff] outline-none"
              />
            </div>

            <div className="flex flex-col">
              <label className="mb-2 font-medium text-gray-700">Phone Number</label>
              <input
                type="text"
                placeholder="Enter phone number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-[#00aeff] outline-none"
              />
            </div>

            <div className="flex flex-col md:col-span-2">
              <label className="mb-2 font-medium text-gray-700">Address</label>
              <input
                type="text"
                placeholder="Enter address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-[#00aeff] outline-none"
              />
            </div>
          </div>

          {/* Payment Options */}
          <div className="flex flex-col md:flex-row gap-6 items-center justify-center">
            <label className="flex items-center gap-2 cursor-pointer bg-[#00aeff]/10 p-3 rounded-xl hover:bg-[#00aeff]/20 transition">
              <input
                type="radio"
                checked={method === "STRIPE"}
                onChange={() => setMethod("STRIPE")}
                className="accent-[#00aeff]"
              />
              Stripe Payment
            </label>

            <label className="flex items-center gap-2 cursor-pointer bg-[#00aeff]/10 p-3 rounded-xl hover:bg-[#00aeff]/20 transition">
              <input
                type="radio"
                checked={method === "CASH_ON_DELIVERY"}
                onChange={() => setMethod("CASH_ON_DELIVERY")}
                className="accent-[#00aeff]"
              />
              Cash On Delivery
            </label>
          </div>

          {/* Submit Button */}
          <button
            onClick={handleCheckout}
            disabled={loading}
            className="w-full py-4 text-white font-bold rounded-2xl bg-linear-to-r from-[#00aeff] to-[#5ce1e6] hover:from-[#0095db] hover:to-[#00c8ff] transition-all shadow-lg text-lg disabled:opacity-50"
          >
            {loading ? "Processing..." : "Confirm Booking & Pay"}
          </button>
        </div>
      </div>

      <style jsx>{`
        @keyframes blob {
          0%, 100% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
        }
        .animate-blob {
          animation: blob 8s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
      `}</style>
    </>
  );
}