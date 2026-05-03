"use client";

import Image from "next/image";
import { useMemo, useState, useEffect, useRef } from "react";

export type WorkStep = {
    step: string;
    number: string;
    title: string;
    description: string;
    img: string;
};

const steps: WorkStep[] = [
  {
    step: "STEP",
    number: "01",
    title: "Browse Services",
    description:
      "Explore a wide range of home services like electricians, plumbers, AC repair, cleaning, and more based on your needs.",
    img: "/services/service-01.png",
  },
  {
    step: "STEP",
    number: "02",
    title: "Choose a Provider",
    description:
      "Compare verified service providers, check ratings, pricing, and availability to find the best match for your job.",
    img: "/services/service-02.jpg",
  },
  {
    step: "STEP",
    number: "03",
    title: "Book & Pay Securely",
    description:
      "Book your preferred service easily and make secure online payments through trusted payment methods.",
    img: "/services/service-03.jpg",
  },
  {
    step: "STEP",
    number: "04",
    title: "Get Service at Home",
    description:
      "Relax while our professional arrives at your doorstep, completes the job, and ensures your satisfaction.",
    img: "/services/service-04.jpg",
  },
];

export default function HowRepairoWorks() {
    const withZ = useMemo(() => steps.map((s, i) => ({ ...s, z: 50 - i })), []);
    const [activeStep, setActiveStep] = useState(0);
    const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
    const isScrolling = useRef(false);

    useEffect(() => {
        const handleScroll = () => {
            if (isScrolling.current) return;

            const scrollPosition = window.scrollY + window.innerHeight / 2;

            cardRefs.current.forEach((card, index) => {
                if (card) {
                    const rect = card.getBoundingClientRect();
                    const cardTop = rect.top + window.scrollY;
                    const cardBottom = cardTop + rect.height;

                    if (scrollPosition >= cardTop && scrollPosition <= cardBottom) {
                        setActiveStep(index);
                    }
                }
            });
        };

        window.addEventListener("scroll", handleScroll);
        handleScroll(); // Initial check

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const scrollToStep = (index: number) => {
        const card = cardRefs.current[index];
        if (card) {
            isScrolling.current = true;
            const cardTop = card.getBoundingClientRect().top + window.scrollY;
            const offset = window.innerHeight / 3;

            window.scrollTo({
                top: cardTop - offset,
                behavior: "smooth",
            });

            setActiveStep(index);

            setTimeout(() => {
                isScrolling.current = false;
            }, 1000);
        }
    };

    return (
        <section id="how-domiren-works" className="py-12 md:py-20 bg-white ">
            <div className="mx-auto w-11/12 ">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
                    {/* Left Column - Fixed Content */}
                    <div className="lg:sticky lg:top-24 lg:self-start ">
                        <div className="mb-6">
                           
                            <h2 className="text-4xl md:text-5xl text-gray-900 leading-tight font-neue-haas-grotesk-display-pro mt-3">
                                 Book trusted home services in just a few simple steps.
                            </h2>
                        </div>

                        {/* Step Buttons */}
                        <div className="md:flex gap-3 mt-8 hidden ">
                            {steps.map((step, index) => (
                                <button
                                    key={index}
                                    onClick={() => scrollToStep(index)}
                                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 font-inter cursor-pointer ${
                                        index === activeStep
                                            ? "bg-[#00aeff] text-white"
                                            : "bg-[#FFFBF5] border border-[#211F1A] text-[#21201B] hover:border-[#00aeff]"
                                    }`}
                                >
                                    Step {index + 1}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Right Column - Scrolling Cards */}
                    <div className="relative">
                        {withZ.map((step, i) => (
                            <div
                                key={step.number}
                                ref={(el) => { cardRefs.current[i] = el; }}
                                className="sticky z-(--z) mb-6 md:mb-8"
                                style={{
                                    top: `${100 + i * 50}px`,
                                }}
                            >
                                <div className="bg-[#00aeff] p-3 overflow-hidden shadow-[0_10px_35px_rgba(0,0,0,0.1)] ring-1 ring-gray-100 rounded-xl">
                                    {/* Image Section */}
                                    <div className="relative h-70 md:h-87.5 overflow-hidden">
                                        <Image
                                            src={step.img}
                                            alt={step.title}
                                            fill
                                            className="object-cover rounded-xl"
                                            priority={i === 0}
                                        />

                                        <div className="absolute inset-0 bg-linear-to-br from-black/30 via-black/10 to-transparent" />

                                        {/* Overlay with Step Number */}
                                        <div className="absolute bottom-1 rounded-xl backdrop-blur-[15px] w-full p-1">
                                            <div className="relative left-6">
                                                <span className="block text-white/80 text-xs md:text-sm font-medium tracking-wider mb-1">
                                                    {step.step}
                                                </span>
                                                <span className="block text-[white] text-6xl md:text-7xl font-bold leading-none">
                                                    {step.number}
                                                </span>
                                            </div>
                                            <div className="relative bottom-14 left-30 border-t border-[#FFFBF5] w-[75%]">
                                                <span className="text-white text-xl">
                                                    {step.title}
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Content Section */}
                                    <div className="bg-[#00aeff] py-5 px-2">
                                        <p className="text-white text-base md:text-lg leading-relaxed">
                                            {step.description}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}