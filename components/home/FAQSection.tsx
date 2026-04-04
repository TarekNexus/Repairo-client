"use client";

import { useState } from "react";
import { Plus, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";

const faqs = [
  {
    question: "What types of home services can I book on Repairo?",
    answer:
      "You can book a wide range of home services including electricians, plumbers, AC mechanics, home cleaners, WiFi technicians, painters, and more.",
  },
  {
    question: "How do I book a service on Repairo?",
    answer:
      "Simply browse the available services, choose the one you need, select a provider, enter your address and preferred date, then confirm your booking online.",
  },
  {
    question: "Can I pay online for my booking?",
    answer:
      "Yes. Repairo supports secure online payments through Stripe and SSLCommerz, so you can complete your booking quickly and safely.",
  },
  {
    question: "How can I track the status of my booking?",
    answer:
      "You can track your booking from your dashboard. Booking statuses update in real time from Pending to Accepted, On The Way, Completed, or Cancelled.",
  },
  {
    question: "Are the service providers verified?",
    answer:
      "Absolutely. Every provider on Repairo is verified before joining the platform to ensure you receive safe, trusted, and high-quality service.",
  },
];

export default function FaqSection() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="mx-auto w-11/12 bg-white py-6 sm:py-8 md:py-10">
      <div className="">
        {/* Header */}
        <div className="mb-10 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <h2 className="text-2xl sm:text-3xl md:text-[56px] text-[#00aeff] font-satoshi font-medium  leading-tight text-center sm:text-left">
            Home Service Questions,
            <br className="hidden sm:block" />
            Clearly Answered
          </h2>

          <div>
            <p className="mx-auto mb-6 max-w-140 text-lg font-satoshi text-[#191919] lg:text-justify">
              Find answers to the most common questions about Repairo and home
              service booking. Need more help?{" "}
              <Link
                href="/contact"
                className="font-medium text-[#00aeff] transition hover:underline"
              >
                Contact our support team
              </Link>
              .
            </p>
          </div>
        </div>

        {/* FAQ List */}
        <motion.div
          initial={{ opacity: 0, y: -40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="space-y-4"
        >
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="box-border rounded-2xl border-2 border-white bg-white shadow-[0px_2px_6px_rgba(0,174,255,0.35)] transition-all hover:shadow-[0px_4px_12px_rgba(0,174,255,0.5)]"
            >
              <button
                onClick={() => toggle(i)}
                className="flex w-full items-center justify-between px-4 py-4 text-left font-satoshi text-base font-medium text-[#0A244D] focus:outline-none sm:px-6 sm:text-[17px]"
              >
                <span>{faq.question}</span>

                {activeIndex === i ? (
                  <X className="h-5 w-5 shrink-0 text-[#00aeff]" />
                ) : (
                  <Plus className="h-5 w-5 shrink-0 text-[#00aeff]" />
                )}
              </button>

              <AnimatePresence initial={false}>
                {activeIndex === i && (
                  <motion.div
                    key="content"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="px-4 pb-4 font-satoshi text-sm leading-relaxed text-gray-600 sm:px-6 sm:pb-5 sm:text-[15px]">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}