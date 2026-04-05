// NavbarClient.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { ArrowUpRight, LogOut, User as UserIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { authClient } from "@/lib/auth-client";

interface NavbarClientProps {
  user?: { name: string; image?: string; role: string; email: string };
}

const NavbarClient = ({ user }: NavbarClientProps) => {
  const router = useRouter();
  const [, setSelectedIndex] = useState<number>(0);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const links = [
    { href: "/" as const, label: "Home" },
    { href: "/services" as const, label: "Services" },
    { href: "/contact" as const, label: "Contact" },
  ];

  const handleLinkClick = (index: number) => {
    setSelectedIndex(index);
  };

  const handleLogout = async () => {
    try {
      await authClient.signOut();
      router.push("/login");
      router.refresh();
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const getDashboardPath = () => {
    if (!user) return "/login";
    return `/${user.role.toLowerCase()}`;
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  // Scroll listener
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > lastScrollY && window.scrollY > 50) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      setLastScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <header
      className={cn(
        "sm:top-10 top-3 left-3 md:left-20 flex items-center bg-[#FFFFFF] rounded-[15px] px-10 mx-auto shadow-sm w-11/12 justify-between lg:px-30 py-2 text-black z-50 fixed transition-transform duration-500 ease-in-out",
        isVisible ? "translate-y-0" : "-translate-y-30",
      )}
    >
      {/* Logo */}
      <div>
        <div className="w-30 md:w-40">
          <Link href="/">
            <Image
              src="/imgs/Repairos.png"
              alt="logo"
              width={175.78}
              height={34.13}
              className="h-auto w-auto"
            />
          </Link>
        </div>
      </div>

      {/* Desktop Navigation */}
      <div className="max-lg:hidden">
        <nav className="h-13.25 flex justify-center items-center">
          <ul className="flex items-center gap-8">
            {links.map((link, i) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  onClick={() => handleLinkClick(i)}
                  className={cn(
                    "relative text-[15.63px] leading-[150%] tracking-[7%] text-black font-medium font-satoshi",
                    "after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:w-0 after:bg-[#5ce1e6] after:transition-all after:duration-300 after:ease-in-out",
                    "hover:after:w-full",
                  )}
                >
                  {link.label}
                </Link>
              </li>
            ))}

            {/* CUSTOMER Dashboard Link */}
            {user?.role.toLowerCase() === "customer" && (
              <li>
                <Link
                  href="/customer"
                  className={cn(
                    "relative text-[15.63px] leading-[150%] tracking-[7%] text-black font-medium font-satoshi",
                    "after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:w-0 after:bg-[#5ce1e6] after:transition-all after:duration-300 after:ease-in-out",
                    "hover:after:w-full",
                  )}
                >
                  Dashboard
                </Link>
              </li>
            )}
          </ul>
        </nav>
      </div>

      {/* Desktop Auth Section */}
      <div className="max-lg:hidden flex items-center gap-4">
        {user ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-white bg-[#0000004D] hover:bg-[#00000066] transition-all duration-300 cursor-pointer">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={user.image} alt={user.name} />
                  <AvatarFallback className="bg-[#5ce1e6] text-black text-xs font-semibold">
                    {getInitials(user.name)}
                  </AvatarFallback>
                </Avatar>
                <span className="text-[14px] text-white font-medium max-w-25 truncate">
                  {user.name}
                </span>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium">{user.name}</p>
                  <p className="text-xs text-muted-foreground">{user.email}</p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href={getDashboardPath()} className="cursor-pointer">
                  <UserIcon className="mr-2 h-4 w-4" />
                  Dashboard
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={handleLogout}
                className="cursor-pointer text-red-600 focus:text-red-600"
              >
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Link href="/login">
            <button className="pl-4 pr-1.5 py-1.25 rounded-full cursor-pointer border border-white text-white bg-[#0000004D] hover:bg-[#00000066] transition-all duration-300 ease-in-out">
              <span className="text-[15.63px] leading-[150%] tracking-[7%] text-white font-medium flex items-center justify-center gap-3">
                Login
                <ArrowUpRight className="w-6 h-6 bg-[#5ce1e6] text-black rounded-full p-1" />
              </span>
            </button>
          </Link>
        )}
      </div>

      {/* Mobile Menu */}
      {/* (same logic for mobile, add conditional Dashboard for CUSTOMER role) */}
    </header>
  );
};

export default NavbarClient;
