"use client";

import { motion } from "framer-motion";
import HouseStarIcon from "@/icons/HouseStarIcon";
import PeopleIcon from "@/icons/PeopleIcon";
import ProfileIcon from "@/icons/ProfileIcon";
import SearchIcon from "@/icons/SearchIcon";

type Card = {
  icon: React.ReactNode;
  number: string;
  title: string;
  desc: string;
};

const cards: Card[] = [
  {
    icon: <PeopleIcon className="h-4 w-4" />,
    number: "01",
    title: "Verified & Trusted Service Providers",
    desc: "Every electrician, plumber, cleaner, and technician on Repairo is carefully verified so you can book with confidence.",
  },
  {
    icon: <HouseStarIcon className="h-4 w-4" />,
    number: "02",
    title: "Affordable Pricing With No Hidden Charges",
    desc: "Get clear service pricing before booking. Repairo helps you compare options and choose services that fit your budget.",
  },
  {
    icon: <ProfileIcon className="h-4 w-4" />,
    number: "03",
    title: "Easy Booking & Real-Time Updates",
    desc: "Book any home service in minutes and track your booking status from pending to completed directly from your dashboard.",
  },
  {
    icon: <SearchIcon className="h-4 w-4" />,
    number: "04",
    title: "Fast, Reliable & Doorstep Service",
    desc: "From AC repair to WiFi setup, trusted professionals arrive at your location on time and provide reliable service.",
  },
];

export default function Features() {
  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        when: "beforeChildren",
        staggerChildren: 0.15,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <motion.section
      className="mx-auto mt-10 w-11/12 rounded-4xl bg-[#00aeff] py-8 sm:py-10 md:py-12"
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      <div className="px-6 sm:px-10">
        {/* Header */}
        <div className="mb-8 flex flex-col items-start justify-between gap-6 sm:mb-10 md:mb-12 md:flex-row md:items-center">
          <h2 className="font-neue-haas-grotesk-display-pro text-[25px] leading-tight font-medium text-white text-balance sm:text-[35px] md:text-[45px]">
            Why Customers Trust
            <br className="hidden sm:block" />
            Repairo for Home Services
          </h2>

          <div className="flex flex-col items-start md:items-end">
            <p className="max-w-[38ch] text-left text-sm text-white/90 sm:text-base">
              From verified professionals to transparent pricing and real-time
              booking updates, Repairo makes home service booking simple and
              reliable.
            </p>
          </div>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4">
          {cards.map((card) => (
            <motion.div
              key={card.number}
              className="flex flex-col gap-4 rounded-2xl bg-white p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl sm:p-6"
              variants={cardVariants}
            >
              {/* Icon */}
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#00aeff] text-white">
                {card.icon}
              </div>

              {/* Number */}
              <span className="text-sm font-semibold tracking-[0.2em] text-[#00aeff]/70">
                {card.number}
              </span>

              {/* Title */}
              <h3 className="font-satoshi text-lg font-semibold leading-tight text-[#00aeff] sm:text-xl">
                {card.title}
              </h3>

              {/* Description */}
              <p className="font-satoshi text-sm leading-relaxed text-slate-500 sm:text-base">
                {card.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}