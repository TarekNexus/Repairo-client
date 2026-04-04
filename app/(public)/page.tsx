


import FaqSection from '@/components/home/FAQSection';
import Features from '@/components/home/Features';
import Banner from '@/components/home/Hero';
import MostPopular from '@/components/home/MostPopular';
import Sticky from '@/components/home/Sticky';
import React from 'react';

const page = async() => {

    return (
       
          <div className="relative">
      <div className="z-1 sticky top-0 isolate">
        <Banner />
      </div>
      <div className="relative z-10 bg-[#F4FBFF] rounded-t-[40px]">
    
           <MostPopular/>
           <Sticky></Sticky>
           <Features/>
           <FaqSection></FaqSection>
      </div>
    </div>
    );
};

export default page;