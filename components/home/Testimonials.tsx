"use client";

import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowLeft, ArrowRight } from "lucide-react";

type Testimonial = {
  name: string;
  role: string;
  img: string;
  feedback: string;
};

const testimonials: Testimonial[] = [
  {
    name: "Rahim Khan",
    role: "Customer",
    img: "/Testimonials1.png",
    feedback:
      "Repairo made it so easy to book a plumber at my home. The provider arrived on time and did an amazing job. Highly recommend!",
  },
  {
    name: "Sara Ahmed",
    role: "Customer",
    img: "/Testimonials2.png",
    feedback:
      "I love using Repairo to find trusted electricians. The booking process is seamless and payment is super easy with Stripe.",
  },
  {
    name: "Jahid Hossain",
    role: "Customer",
    img: "/Testimonials3.png",
    feedback:
      "Thanks to Repairo, I could get my AC repaired in just one day. The providers are professional and reliable.",
  },
  {
    name: "Rahim Khan",
    role: "Customer",
    img: "/Testimonials1.png",
    feedback:
      "Repairo made it so easy to book a plumber at my home. The provider arrived on time and did an amazing job. Highly recommend!",
  },
  {
    name: "Sara Ahmed",
    role: "Customer",
    img: "/Testimonials2.png",
    feedback:
      "I love using Repairo to find trusted electricians. The booking process is seamless and payment is super easy with Stripe.",
  },
  {
    name: "Jahid Hossain",
    role: "Customer",
    img: "/Testimonials3.png",
    feedback:
      "Thanks to Repairo, I could get my AC repaired in just one day. The providers are professional and reliable.",
  },
  {
    name: "Rahim Khan",
    role: "Customer",
    img: "/Testimonials1.png",
    feedback:
      "Repairo made it so easy to book a plumber at my home. The provider arrived on time and did an amazing job. Highly recommend!",
  },
  {
    name: "Sara Ahmed",
    role: "Customer",
    img: "/Testimonials2.png",
    feedback:
      "I love using Repairo to find trusted electricians. The booking process is seamless and payment is super easy with Stripe.",
  },
  {
    name: "Jahid Hossain",
    role: "Customer",
    img: "/Testimonials3.png",
    feedback:
      "Thanks to Repairo, I could get my AC repaired in just one day. The providers are professional and reliable.",
  },

];

export default function Testimonials() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const indexRef = useRef(index);

  useEffect(() => {
    indexRef.current = index;
  }, [index]);

  const scroll = (dir: "left" | "right") => {
    const el = trackRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("[data-card]");
    if (!card) return;

    const step = card.offsetWidth + 24;
    let next = dir === "left" ? indexRef.current - 1 : indexRef.current + 1;

    if (next < 0) next = testimonials.length - 1;
    if (next >= testimonials.length) next = 0;

    el.scrollTo({ left: next * step, behavior: "smooth" });
    setIndex(next);
  };

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      scroll("right");
    }, 3000);
    return () => clearInterval(interval);
  }, [isPaused]);

  return (
    <motion.section
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      viewport={{ once: true, amount: 0.2 }}
      className="bg-white w-full py-6 sm:py-8 md:py-10"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      id="testimonials"
    >
      <div  className="w-11/12 mx-auto relative">
        {/* Heading */}
        <div className="mb-8 sm:mb-10 text-center sm:text-left">
        

          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-4 sm:gap-0 items-center">
            <h2 className="text-2xl sm:text-3xl md:text-[56px] text-[#00aeff] font-satoshi font-medium  leading-tight text-center sm:text-left">
              What Our Clients Are <br />
              <span
                className="text-[#00aeff] text-2xl sm:text-3xl md:text-[56px] font-medium"
              >
                Saying
              </span>
            </h2>

            <div className="flex items-center justify-center sm:justify-end gap-3">
              <button
                aria-label="Previous"
                onClick={() => scroll("left")}
                className="rounded-full border border-[#00aeff] bg-white w-9 h-9 sm:w-11 sm:h-11 p-2 hover:bg-[#00aeff]/10 transition"
              >
                <ArrowLeft className="h-5 w-5 sm:h-6 sm:w-6 text-[#00aeff]" />
              </button>
              <button
                aria-label="Next"
                onClick={() => scroll("right")}
                className="rounded-full border border-[#00aeff] bg-white w-9 h-9 sm:w-11 sm:h-11 p-2 hover:bg-[#00aeff]/10 transition"
              >
                <ArrowRight className="h-5 w-5 sm:h-6 sm:w-6 text-[#00aeff]" />
              </button>
            </div>
          </div>
        </div>

        {/* Slider */}
        <div className="relative">
          <div
            ref={trackRef}
            className="flex gap-4 sm:gap-6 px-2 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-4 scrollbar-none"
          >
            <style>{`div::-webkit-scrollbar{display:none}`}</style>

            {testimonials.map((t, i) => (
              <motion.article
                key={i}
                data-card
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.15, duration: 0.6, ease: "easeOut" }}
                viewport={{ once: true }}
                className="bg-white border-2 border-[#00aeff] rounded-2xl shrink-0 
                w-[80%] sm:w-75 md:w-85 lg:w-100 
                h-auto sm:h-75 md:h-80 
                p-4 sm:p-5 md:p-6 transition-shadow duration-300 snap-start"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="relative w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-full overflow-hidden">
                    <Image
                      src={t.img}
                      alt={t.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="text-[#183654] font-inter font-medium text-lg sm:text-xl md:text-[25px] capitalize">
                      {t.name}
                    </h3>
                    <p className="text-[#183654] font-inter font-medium text-xs sm:text-sm">
                      {t.role}
                    </p>
                  </div>
                </div>

                <div className="border-b border-[#00aeff] mb-4"></div>

                <p className="text-[#183654] font-inter text-sm sm:text-base md:text-lg leading-relaxed">
                  {t.feedback}
                </p>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </motion.section>
  );
}