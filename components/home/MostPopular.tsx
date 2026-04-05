"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

type Service = {
  id: string;
  name: string;
  price: number;
  img: string;
};

const services: Service[] = [
  {
    id: "1",
    name: "Electrician Service",
    price: 500,
    img: "/services/ElectricianService .webp",
  },
  {
    id: "2",
    name: "Plumbing Service",
    price: 700,
    img: "/services/PlumbingService.jpg",
  },
  {
    id: "3",
    name: "AC Repair",
    price: 1200,
    img: "/services/ACRepair.jpg",
  },
  {
    id: "4",
    name: "Home Cleaning",
    price: 900,
    img: "/services/HomeCleaning.webp",
  },
  {
    id: "5",
    name: "WiFi Technician",
    price: 600,
    img: "/services/WiFiTechnician.jpeg",
  },
  {
    id: "6",
    name: "Painting Service",
    price: 1500,
    img: "/services/PaintingService.jpg",
  },
];

export default function ServicesSlider() {
  const trackRef = useRef<HTMLDivElement>(null);

  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [visible, setVisible] = useState(1);

  const getVisibleCount = () => {
    if (typeof window === "undefined") return 1;

    if (window.innerWidth >= 1024) return 3;
    if (window.innerWidth >= 768) return 2;
    return 1;
  };

  useEffect(() => {
    const updateVisible = () => setVisible(getVisibleCount());

    updateVisible();
    window.addEventListener("resize", updateVisible);

    return () => window.removeEventListener("resize", updateVisible);
  }, []);

  const goTo = (i: number) => {
    const el = trackRef.current;
    if (!el) return;

    const card = el.querySelector<HTMLElement>("[data-card]");
    if (!card) return;

    const step = card.offsetWidth + 12;

    el.scrollTo({
      left: i * step,
      behavior: "smooth",
    });
  };

  const scroll = (dir: "left" | "right") => {
    const next =
      dir === "left"
        ? Math.max(0, index - visible)
        : (index + visible) % services.length;

    goTo(next);
  };

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;

    let ticking = false;

    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const card = el.querySelector<HTMLElement>("[data-card]");

          if (card) {
            setIndex(Math.round(el.scrollLeft / (card.offsetWidth + 12)));
          }

          ticking = false;
        });

        ticking = true;
      }
    };

    el.addEventListener("scroll", onScroll, { passive: true });

    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (paused) return;

    const id = setInterval(() => {
      const next = (index + visible) % services.length;
      goTo(next);
    }, 2500);

    return () => clearInterval(id);
  }, [index, paused, visible]);

  return (
    <section className="mx-auto mt-20 w-11/12 rounded-[25px] bg-[#F4FBFF] py-8 sm:py-10 lg:py-12">
      <div className="px-6 sm:px-10">
        {/* Header */}
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <h2 className="max-w-[12ch] text-balance font-neue-haas-grotesk-display-pro text-[28px] leading-tight font-medium text-[#00aeff] sm:text-[38px] md:text-[48px]">
            Most Popular Home Services
          </h2>

          <p className="max-w-[42ch] text-left text-sm leading-7 text-slate-600 sm:text-base md:text-right">
            Discover trusted home service providers for electrical work,
            plumbing, AC repair, cleaning, and more — all in one place with
            Repairo.
          </p>
        </div>

        {/* Navigation */}
        <div className="mt-5 flex items-center justify-end gap-3">
          <button
            aria-label="Previous"
            onClick={() => scroll("left")}
            className="rounded-full border border-[#00aeff]/20 p-2.5 text-[#00aeff] transition hover:bg-[#00aeff]/10"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          <button
            aria-label="Next"
            onClick={() => scroll("right")}
            className="rounded-full border border-[#00aeff]/20 p-2.5 text-[#00aeff] transition hover:bg-[#00aeff]/10"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>

        {/* Slider */}
        <div
          ref={trackRef}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          className="mt-6 flex snap-x snap-mandatory gap-3 overflow-x-auto scroll-smooth pb-2 [scrollbar-width:none] [-ms-overflow-style:none]"
        >
          <style>{`
            div::-webkit-scrollbar {
              display: none;
            }
          `}</style>

          {services.map((service, i) => (
            <article
              key={service.id}
              data-card
              className="group relative h-65 w-72.5 shrink-0 snap-start overflow-hidden rounded-[24px] transition-all hover:ring-2 hover:ring-[#00aeff]/60 sm:h-80 sm:w-85 lg:h-90 lg:w-113.75"
            >
              <Image
                src={service.img}
                alt={service.name}
                fill
                priority={i < 3}
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-linear-to-t from-black/75 via-black/20 to-transparent" />

              {/* Price */}
              <div className="absolute left-4 top-4 z-10">
                <span className="rounded-full bg-white/90 px-4 py-1.5 text-lg font-semibold text-[#00aeff] shadow-sm backdrop-blur sm:text-xl">
                  ৳{service.price}
                </span>
              </div>

              {/* Content */}
              <div className="absolute inset-x-0 bottom-0 z-10 p-5 sm:p-6">
                <h3 className="text-xl font-semibold text-white sm:text-2xl">
                  {service.name}
                </h3>

                <p className="mt-2 max-w-[28ch] text-sm leading-6 text-white/80 sm:text-base">
                  Trusted professionals available for quick and reliable service
                  at your doorstep.
                </p>

                <Link
                  href="/services"
                  className="mt-4 inline-flex w-fit items-center rounded-full bg-[#00aeff] px-5 py-2 text-sm font-medium text-white transition hover:bg-[#0097de] sm:text-base"
                >
                  Book Now
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
