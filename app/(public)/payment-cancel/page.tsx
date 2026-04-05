"use client";

import Link from "next/link";
import { XCircle } from "lucide-react";

export default function PaymentCancelPage() {
  return (
   <>
   
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-[#ff6b6b]/20 to-[#ff8787]/20 px-4">
      <div className="max-w-md w-full bg-white/95 backdrop-blur-md border border-[#ff6b6b]/30 rounded-3xl shadow-2xl p-10 text-center relative overflow-hidden">
        {/* Floating gradient circles */}
        <div className="absolute -top-16 -right-16 w-40 h-40 bg-linear-to-tr from-[#ff6b6b]/40 to-[#ff8787]/40 rounded-full blur-3xl animate-blob"></div>
        <div className="absolute -bottom-16 -left-16 w-48 h-48 bg-linear-to-tr from-[#ff8787]/30 to-[#ff6b6b]/30 rounded-full blur-3xl animate-blob animation-delay-2000"></div>

        {/* Cancel Icon */}
        <XCircle className="mx-auto w-20 h-20 text-red-500 mb-6 animate-shake" />

        <h1 className="text-4xl font-bold text-red-600 mb-4">
          Payment Cancelled
        </h1>

        <p className="text-gray-600 mb-6 text-lg">
          Your payment was cancelled. Please try again or choose another method.
        </p>

        <Link
          href="/"
          className="inline-block px-8 py-3 bg-linear-to-r from-[#ff6b6b] to-[#ff8787] hover:from-[#e65555] hover:to-[#ff6b6b] text-white font-semibold rounded-2xl shadow-lg transition-all"
        >
          Back Home
        </Link>
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
        @keyframes shake {
          0%, 100% { transform: rotate(0deg); }
          25% { transform: rotate(-10deg); }
          50% { transform: rotate(10deg); }
          75% { transform: rotate(-10deg); }
        }
        .animate-shake {
          animation: shake 0.8s ease-in-out infinite;
        }
      `}</style>
    </div>
   </>
  );
}