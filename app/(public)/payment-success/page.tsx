"use client";

import { useSearchParams } from "next/navigation";

export default function PaymentSuccessPage() {
  const searchParams = useSearchParams();
  const bookingId = searchParams.get("bookingId");

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center border rounded-2xl p-8 shadow">
        <h1 className="text-3xl font-bold text-green-600 mb-4">
          Payment Successful
        </h1>

        <p className="text-gray-600 mb-2">
          Your booking has been confirmed.
        </p>

        <p className="text-sm text-gray-500 break-all">
          Booking ID: {bookingId}
        </p>
      </div>
    </div>
  );
}