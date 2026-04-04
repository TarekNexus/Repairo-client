"use client";

import React from "react";
import { motion } from "framer-motion";
import { Building2, Shield } from "lucide-react";
import { IoConstruct } from "react-icons/io5";
import Link from "next/link";

const Hero = () => {
  return (
    <section
      className="relative h-screen w-full mb-6 mx-auto bg-contain object-fill flex items-center justify-center"
      style={{
        backgroundImage: `url('/banner.png')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent z-1" />

      <div className="flex flex-col lg:flex-row w-11/12 lg:px-14 justify-between items-center md:items-start">
        {/* Left Column */}
        <div className="relative z-10 flex-1 text-white px-4 sm:px-6 md:px-8 lg:px-0 mt-16 md:mt-16 lg:mt-20 text-left max-w-3xl">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="inline-flex items-center px-3 sm:px-4 py-1.5 mb-4 sm:mb-6 h-7.5 rounded-3xl border bg-white/15"
            style={{
              boxSizing: "border-box",
              border: "1px solid rgba(255, 255, 255, 0.5)",
              boxShadow:
                "inset 3px 3px 15px 5px rgba(255, 255, 255, 0.15), inset -3px -3px 15px 5px rgba(217, 217, 217, 0.15)",
              backdropFilter: "blur(4px)",
            }}
            aria-label="Trusted Home Service Booking"
          >
            <span className="text-[10px] sm:text-[11px] font-satoshi font-medium tracking-widest uppercase">
              Trusted Home Service Providers Near You
            </span>
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="font-neue font-normal leading-[1.1] text-3xl sm:text-4xl md:text-[45px] lg:text-[64px] mb-4"
          >
            Reliable Home Services <br className="hidden md:block" /> Whenever You Need
          </motion.h1>

          {/* Paragraph */}
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.15 }}
            className="font-satoshi text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed text-white/90 mb-6 md:mb-8"
          >
            Find and book trusted electricians, plumbers, cleaners, AC mechanics, and more. <br />
            Pay online, track your bookings, and get quality services done at your doorstep with RepairLagbe.
          </motion.p>

          {/* Icon Pills */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="flex flex-wrap gap-2 sm:gap-3 mb-4 sm:mb-6"
            aria-label="Key highlights"
          >
            {[{ Icon: IoConstruct, label: "Skilled Providers" },
              { Icon: Building2, label: "Trusted Services" },
              { Icon: Shield, label: "Safe & Reliable" },
            ].map(({ Icon, label }, i) => (
              <span
                key={i}
                className="inline-flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full border border-white/25 bg-white/10 backdrop-blur-sm"
                title={label}
              >
                <Icon className="h-4 w-4 sm:h-5 sm:w-5" aria-hidden="true" />
                <span className="sr-only">{label}</span>
              </span>
            ))}
          </motion.div>

          {/* Buttons */}
   <motion.div
  initial={{ opacity: 0, y: 16 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, amount: 0.5 }}
  transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
  className="flex flex-row items-center gap-2 sm:gap-3 md:gap-4 w-full sm:w-auto"
>
  <Link href={"/services"}>
    <motion.button
      whileHover={{ scale: 1.05, boxShadow: "0 8px 20px rgba(87, 207, 213, 0.5)" }}
      transition={{ type: "spring", stiffness: 300 }}
      className="w-full sm:w-auto h-10.5 sm:h-12 md:h-12.5 font-satoshi font-medium text-[12px] sm:text-sm md:text-base px-3 sm:px-4 md:px-4 rounded-[10px] bg-[#57cfd5] text-white shadow-[0_1px_4px_0_rgba(24,45,92,0.4)] transition"
    >
      Browse Services
    </motion.button>
  </Link>

  <Link href={"/contact"}>
    <motion.button
      whileHover={{ scale: 1.05, boxShadow: "0 8px 20px rgba(24,54,84,0.4)" }}
      transition={{ type: "spring", stiffness: 300 }}
      className="w-full sm:w-auto h-10.5 sm:h-12 md:h-12.5 font-satoshi font-medium text-[12px] sm:text-sm md:text-base px-3 sm:px-4 md:px-4 rounded-[10px] bg-white text-[#183654] shadow-[0_1px_4px_0_rgba(24,45,92,0.4)] transition"
    >
      Contact Us
    </motion.button>
  </Link>
</motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;