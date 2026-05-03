"use client";
import Link from "next/link";
import React from "react";
import { FiArrowUpRight } from "react-icons/fi";
import { motion } from "framer-motion";

export default function Join() {
  return (
    <section className="rounded-3xl mt-10 py-12 bg-[#00aeff] flex justify-center text-center items-center px-4 w-11/12 mx-auto mb-12  ">
      <div className="max-w-4xl">
        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-3xl sm:text-4xl md:text-5xl lg:text-[55px] text-white font-semibold leading-snug md:leading-tight mb-4"
        >
          Need a Service? We’ve Got You Covered
        </motion.h2>

        {/* Paragraph */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          className="mb-6 text-base sm:text-lg md:text-xl text-white leading-relaxed"
        >
          Book trusted electricians, plumbers, AC mechanics, and more in just a few clicks. <br />
          Fast, reliable, and right at your doorstep with RepairLagbe.
        </motion.p>

        {/* Button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, delay: 0.4, type: "spring", stiffness: 120 }}
          className="flex justify-center"
        >
          <Link href={"/services"}>
            <button className="cursor-pointer text-white bg-black/80 w-42.5 sm:w-50 h-12 sm:h-13.5 backdrop-blur-md border hover:bg-black/90 rounded-full flex items-center justify-between px-2">
              <span className="flex-1 text-lg sm:text-xl pl-2 text-left">
                Book Now
              </span>
              <span className="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-full bg-white">
                <FiArrowUpRight
                  size={22}
                  className="sm:size-7 text-[#00aeff] font-bold"
                />
              </span>
            </button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}