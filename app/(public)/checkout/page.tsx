
"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";

import { createPayment } from "@/action/payment/createPayment";
import { createBooking } from "@/action/booking/createBooking";

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

      // Step 1: Create booking
      const bookingRes = await createBooking({
        items: [
          {
            serviceId,
          },
        ],
        date: new Date(date).toISOString(),
        address,
        phone,
      });

      if (!bookingRes?.success) {
        toast.error(bookingRes?.message || "Booking failed");
        return;
      }

      // your api returns data as array
      const booking = bookingRes.data?.[0];

      if (!booking?.id) {
        toast.error("Booking id not found");
        return;
      }

      // Step 2: Create payment
      const paymentRes = await createPayment({
        bookingId: booking.id,
        method,
      });

      if (!paymentRes?.success) {
        toast.error(paymentRes?.message || "Payment failed");
        return;
      }

      // Step 3: Redirect
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
    <div className="max-w-2xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-6">Checkout</h1>

      <div className="space-y-4">
        <input
          type="datetime-local"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="w-full border rounded-lg p-3"
        />

        <input
          type="text"
          placeholder="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="w-full border rounded-lg p-3"
        />

        <input
          type="text"
          placeholder="Phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="w-full border rounded-lg p-3"
        />

        <div className="space-y-2">
          <label className="flex items-center gap-2">
            <input
              type="radio"
              checked={method === "STRIPE"}
              onChange={() => setMethod("STRIPE")}
            />
            Stripe Payment
          </label>

          <label className="flex items-center gap-2">
            <input
              type="radio"
              checked={method === "CASH_ON_DELIVERY"}
              onChange={() => setMethod("CASH_ON_DELIVERY")}
            />
            Cash On Delivery
          </label>
        </div>

        <button
          onClick={handleCheckout}
          disabled={loading}
          className="w-full bg-blue-600 text-white rounded-lg py-3 disabled:opacity-50"
        >
          {loading ? "Processing..." : "Confirm Booking & Pay"}
        </button>
      </div>
    </div>
  );
}
