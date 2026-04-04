"use client";

import React from "react";
import Image from "next/image";
import { PhoneCall } from "lucide-react";
import { FaFacebook, FaLinkedin, FaXTwitter } from "react-icons/fa6";
import { RiInstagramFill } from "react-icons/ri";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-[#0A0A0A] md:w-11/12 mx-auto px-6 md:px-8 lg:px-20 py-10 text-white rounded-tl-[50px] rounded-tr-[50px]">
      {/* Main Footer Content */}
      <div className="flex flex-col md:flex-row justify-between gap-10 md:gap-14 pb-8 border-b border-[#767676]">
        {/* Left Section */}
        <div className="lg:w-1/2 flex flex-col items-center md:items-start space-y-8">
          {/* Logo */}
          <Image
            src="/imgs/Repairos.png"
            alt="Repairo Logo"
            width={104}
            height={64}
            className="w-54 h-12"
          />

          <div className="flex flex-col gap-4 items-center md:items-start">
            {/* Heading */}
            <h2 className="text-3xl font-medium font-geist text-center md:text-left text-[#FFFFFF]">
              Need a Reliable Home Service?
            </h2>

            {/* Description */}
            <p className="text-[#999999] text-center md:text-left text-base font-geist leading-relaxed">
              Repairo helps you book trusted electricians, plumbers, cleaners, and more, right at your doorstep. Fast, reliable, and easy to use.
            </p>

            {/* Contact Info */}
     
            <p className="text-base font-geist">Contact: +880 1234 567 890</p>
            <p className="text-base font-medium font-geist">
              Location: 43 Borthwick St, Minto - 2566
            </p>

            {/* Buttons */}
            <div className="flex gap-4 mt-4">
              <Link href="#reserve">
                <button className="bg-[#00aeff] hover:bg-[#008fcc] text-xs md:text-sm lg:text-base font-medium font-geist text-[#FFFFFF] px-4 py-3.5 rounded-[14px] flex items-center gap-1 transition-colors">
                  <PhoneCall className="w-4 lg:w-5" />
                  Book Now
                </button>
              </Link>
              <Link href="#services">
                <button className="bg-[#707070] hover:bg-gray-600 text-xs md:text-sm lg:text-base font-medium font-geist text-[#FFFFFF] px-4 py-3.5 rounded-[14px] flex items-center gap-1 transition-colors">
                  Our Services
                </button>
              </Link>
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="lg:w-1/2 flex flex-col items-center lg:items-end justify-between">
          {/* Navigation Links */}
          <div className="flex gap-16 mb-12">
            <div className="space-y-5 text-center md:text-right">
              <Link href="#faqs" className="block text-[#FFFFFF] text-lg font-medium font-geist hover:text-[#00aeff] transition-colors">
                FAQS
              </Link>
              <Link href="#blog" className="block text-[#FFFFFF] text-lg font-medium font-geist hover:text-[#00aeff] transition-colors">
                BLOGS
              </Link>
              <Link href="#contact" className="block text-[#FFFFFF] text-lg font-medium font-geist hover:text-[#00aeff] transition-colors">
                CONTACT
              </Link>
            </div>
            <div className="space-y-5 text-center md:text-right">
              <Link href="/" className="block text-[#FFFFFF] text-lg font-medium font-geist hover:text-[#00aeff] transition-colors">
                HOME
              </Link>
              <Link href="#services" className="block text-[#FFFFFF] text-lg font-medium font-geist hover:text-[#00aeff] transition-colors">
                SERVICES
              </Link>
              <Link href="#testimonials" className="block text-[#FFFFFF] text-lg font-medium font-geist hover:text-[#00aeff] transition-colors">
                TESTIMONIALS
              </Link>
            </div>
          </div>

          {/* Social Links */}
          <div className="text-right space-y-4">
            <p className="text-[#FFFFFF] font-inter text-lg hidden md:block mb-4">Connect on</p>
            <div className="flex gap-4">
              <Link href="#twitter"><FaXTwitter size={30} className="text-[#00aeff]" /></Link>
              <Link href="#linkedin"><FaLinkedin size={30} className="text-[#00aeff]" /></Link>
              <Link href="#instagram"><RiInstagramFill size={30} className="text-[#00aeff]" /></Link>
              <Link href="#facebook"><FaFacebook size={30} className="text-[#00aeff]" /></Link>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="pt-6 flex flex-col md:flex-row justify-between items-center gap-4 text-gray-400 text-sm">
        <p className="text-base font-geist text-[#999999]">
          <Link href="https://www.repairo.com/" className="hover:text-white">
            © 2025 Repairo.
          </Link>{" "} All rights reserved
        </p>
        <div className="flex gap-8">
          <Link href="#terms" className="text-base font-geist text-[#999999] hover:underline">
            Terms & Conditions
          </Link>
          <Link href="#privacy" className="text-base font-geist text-[#999999] hover:underline">
            Privacy Policy
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;