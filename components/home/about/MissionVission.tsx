"use client";

import { motion } from "framer-motion";

export default function MissionVission() {
  return (
    <div className="pb-5 font-satoshi">
      <div className="max-w-11/12 mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-gray-300">

        {/* Who We Are */}
        <motion.div
          className="px-6 py-6"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-xl sm:text-3xl md:text-4xl lg:text-[40px] font-bold text-[#00aeff] mb-2 md:mb-3">
            Who We Are
          </h2>

          <p className="text-xs sm:text-lg md:text-xl font-satoshi font-medium text-black leading-relaxed">
            RepairLagbe is a modern home service booking platform that connects
            customers with trusted and verified service providers such as electricians,
            plumbers, AC technicians, cleaners, and WiFi experts all in one place.
          </p>
        </motion.div>

        {/* Our Mission */}
        <motion.div
          className="px-6 py-6"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <h2 className="text-xl sm:text-3xl md:text-4xl lg:text-[40px] font-bold text-[#00aeff] mb-2 md:mb-3">
            Our Mission
          </h2>

          <p className="text-xs sm:text-lg md:text-xl font-satoshi font-medium text-black leading-relaxed">
            Our mission is to make home services simple, fast, and reliable by
            providing a digital platform where customers can easily book trusted
            professionals, make secure payments, and track their service in real time.
          </p>
        </motion.div>

        {/* Our Vision */}
        <motion.div
          className="px-6 py-6"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <h2 className="text-xl sm:text-3xl md:text-4xl lg:text-[40px] font-bold text-[#00aeff] mb-2 md:mb-3">
            Our Vision
          </h2>

          <p className="text-xs sm:text-lg md:text-xl font-satoshi font-medium text-black leading-relaxed">
            Our vision is to become the most trusted home service platform in Bangladesh
            by empowering skilled service providers and ensuring customers receive
            high-quality, hassle-free service anytime they need it.
          </p>
        </motion.div>

      </div>
    </div>
  );
}