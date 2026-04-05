"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { CheckCircle2 } from "lucide-react";

export default function PaymentSuccessPage() {
  const searchParams = useSearchParams();
  const bookingId = searchParams.get("bookingId");
  const router = useRouter();

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-[#00aeff]/20 to-[#5ce1e6]/20 px-4">
      <div className="max-w-md w-full bg-white/95 backdrop-blur-md border border-[#00aeff]/30 rounded-3xl shadow-2xl p-10 text-center relative overflow-hidden">
        {/* Floating gradient circle */}
        <div className="absolute -top-16 -right-16 w-40 h-40 bg-linear-to-tr from-[#00aeff]/40 to-[#5ce1e6]/40 rounded-full blur-3xl animate-blob"></div>
        <div className="absolute -bottom-16 -left-16 w-48 h-48 bg-linear-to-tr from-[#5ce1e6]/30 to-[#00aeff]/30 rounded-full blur-3xl animate-blob animation-delay-2000"></div>

        {/* Success Icon */}
        <CheckCircle2 className="mx-auto w-20 h-20 text-green-500 mb-6 animate-bounce" />

        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Payment Successful!
        </h1>

        <p className="text-gray-600 mb-4 text-lg">
          Your booking has been confirmed. Thank you for choosing our service.
        </p>

        <p className="text-sm text-gray-500 break-all mb-8">
          Booking ID: <span className="font-mono text-gray-700">{bookingId}</span>
        </p>

        <button
          onClick={() => router.push("/customer")}
          className="px-8 py-3 bg-linear-to-r from-[#00aeff] to-[#5ce1e6] hover:from-[#0095db] hover:to-[#00c8ff] text-white font-semibold rounded-2xl shadow-lg transition-all"
        >
          See Your Bookings
        </button>
      </div>

      <style jsx>{`
        @keyframes blob {
          0%, 100% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }
        .animate-blob {
          animation: blob 8s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animate-bounce {
          animation: bounce 1s infinite;
        }
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
      `}</style>
    </div>
  );
}