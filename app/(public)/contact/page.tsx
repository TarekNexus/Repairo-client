import Banner from "@/components/home/contact/Hero";
import FaqSection from "@/components/home/FAQSection";
import Features from "@/components/home/Features";
import React from "react";

const page = () => {
  return (
    <div className="relative">
      <div className="z-1 sticky top-0 isolate">
        <Banner></Banner>
      </div>
      <div className="relative z-10 bg-white rounded-t-[40px]">
        <Features />
        <FaqSection></FaqSection>
      </div>
    </div>
  );
};

export default page;
