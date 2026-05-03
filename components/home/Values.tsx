"use client";

import { cn } from "@/lib/utils";
import React from "react";
import { motion } from "framer-motion";

const values = [
  {
    title: "TRUST",
    description:
      "We connect customers with verified and skilled service providers, ensuring safety, reliability, and peace of mind in every booking.",
  },
  {
    title: "CUSTOMER FIRST",
    description:
      "Our users are at the heart of everything we do — from seamless booking to fast support and transparent service experiences.",
  },
  {
    title: "INNOVATION",
    description:
      "We use modern technology to simplify home services, making it faster and easier to book trusted professionals anytime.",
  },
  {
    title: "RELIABILITY",
    description:
      "From booking to completion, we ensure consistent, dependable service so customers can rely on RepairLagbe every time.",
  },
  {
    title: "QUALITY SERVICE",
    description:
      "We focus on delivering high-quality services by working with experienced professionals and maintaining strict standards.",
  },
  {
    title: "COMMUNITY",
    description:
      "We empower local service providers by giving them a platform to grow while serving customers across Bangladesh.",
  },
];

const ValuesSection = () => {
  return (
    <section className="xl:px-32 px-6 py-10 font-satoshi">
      {/* Container */}
      <div className="max-w-480 mx-auto">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="w-full flex lg:flex-row flex-col lg:items-center justify-between sm:mb-14 mb-6 sm:gap-y-5"
        >
          <h1
            className="relative font-bold text-black/15 capitalize
            lg:text-[80px] sm:text-6xl text-[42px]
            w-fit"
          >
            Core values
            <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 lg:text-[25px] sm:text-[20px] text-[13px] text-[#00aeff] font-bold uppercase block w-fit">
              our core values
            </span>
          </h1>

          <p className="max-w-135.25 lg:text-right text-left sm:text-[20px] text-[12px] font-semibold text-black">
            At RepairLagbe, our values guide how we serve customers, support providers,
            and build a trusted home service platform.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="lg:h-145.25 sm:h-240 h-auto grid lg:grid-cols-6 grid-cols-2 md:grid-cols-3">
          {values.map((value, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 60, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              transition={{
                duration: 0.5,
                delay: index * 0.1,
                ease: "easeOut",
              }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.03 }}
              className={cn(
                "w-full h-full p-4 overflow-hidden flex flex-col justify-between transition-all duration-300",
                index % 2 !== 0
                  ? "bg-black/5 text-[#00aeff]"
                  : "bg-[#00aeff] text-white"
              )}
            >
              {/* Description */}
              <div
                className={cn(index % 2 !== 0 ? "order-1" : "order-2")}
              >
                <p className="sm:text-lg text-[12px] font-medium leading-relaxed">
                  {value.description}
                </p>
              </div>

              {/* Title + Number */}
              <div
                className={cn(
                  "relative text-center",
                  index % 2 !== 0 ? "order-2" : "order-1"
                )}
              >
                <p
                  className={cn(
                    "sm:text-[22px] text-[14px] font-extrabold",
                    index % 2 !== 0 ? "sm:mb-4" : "sm:mt-37.5"
                  )}
                >
                  {value.title}
                </p>

                <h1
                  className={cn(
                    "absolute left-1/2 -translate-x-1/2 sm:text-[220px] text-[120px] font-extrabold tracking-[-0.099em] leading-[100%]",
                    index % 2 !== 0
                      ? "-bottom-8 text-black/5"
                      : "top-0 text-white/15"
                  )}
                >
                  0{index + 1}
                </h1>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ValuesSection;