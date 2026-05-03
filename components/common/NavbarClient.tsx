// NavbarClient.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import {
  ArrowUpRight,
  LogOut,
  User as UserIcon,
  Menu,
  X,
} from "lucide-react";
import { useRouter, usePathname } from "next/navigation";
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
  const pathname = usePathname();

  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const links = [
    { href: "/", label: "Home" },
    { href: "/services", label: "Services" },
    { href: "/contact", label: "Contact" },
  ];

  const isActive = (href: string) => pathname === href;

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

  const getInitials = (name: string) =>
    name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);

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
    "fixed z-50 flex items-center justify-between w-[95%] sm:w-11/12 mx-auto   bg-[#FFFFFF] rounded-full shadow-sm",
    "px-4 sm:px-6 lg:px-10 py-2",
    "top-3 sm:top-6 md:top-10 left-1/2 -translate-x-1/2",
    "transition-transform duration-500 ease-in-out",
    isVisible ? "translate-y-0" : "-translate-y-30"
  )}
>
      {/* Logo */}
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

      {/* Desktop Navigation */}
      <div className="max-lg:hidden">
        <nav className="h-13.25 flex justify-center items-center">
          <ul className="flex items-center gap-8">
            {links.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className={cn(
                    "relative text-[15.63px] font-medium transition-all",
                    isActive(link.href)
                      ? "text-[#5ce1e6]"
                      : "text-black",
                    "after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:w-0 after:bg-[#5ce1e6] after:transition-all",
                    isActive(link.href)
                      ? "after:w-full"
                      : "hover:after:w-full"
                  )}
                >
                  {link.label}
                </Link>
              </li>
            ))}

            {user?.role.toLowerCase() === "customer" && (
              <li>
                <Link
                  href="/customer"
                  className={cn(
                    "font-medium",
                    isActive("/customer")
                      ? "text-[#5ce1e6]"
                      : "text-black"
                  )}
                >
                  Dashboard
                </Link>
              </li>
            )}
          </ul>
        </nav>
      </div>

      {/* Desktop Auth */}
      <div className="max-lg:hidden flex items-center gap-4">
        {user ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#0000004D]">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={user.image} />
                  <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
                </Avatar>
                <span className="text-white max-w-25 truncate">
                  {user.name}
                </span>
              </button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>
                <p>{user.name}</p>
                <p className="text-xs">{user.email}</p>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />

              <DropdownMenuItem asChild>
                <Link href={getDashboardPath()}>
                  <UserIcon className="mr-2 h-4 w-4" />
                  Dashboard
                </Link>
              </DropdownMenuItem>

              <DropdownMenuItem onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Link href="/login">
            <button className="px-4 py-1.5 rounded-full bg-[#0000004D] text-white flex items-center gap-2">
              Login
              <ArrowUpRight className="w-5 h-5 bg-[#5ce1e6] rounded-full p-1 text-black" />
            </button>
          </Link>
        )}
      </div>

      {/* Hamburger Button */}
      <button
        className="lg:hidden"
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
      >
        {mobileMenuOpen ? <X /> : <Menu />}
      </button>

      {/* Mobile Menu */}
     {/* Mobile Menu */}
{mobileMenuOpen && (
  <div className="absolute top-15 left-0 w-full bg-white shadow-lg rounded-2xl px-6 py-4 lg:hidden flex flex-col gap-3">
    
    {/* Links */}
    {links.map((link) => (
      <Link
        key={link.label}
        href={link.href}
        onClick={() => setMobileMenuOpen(false)}
        className={cn(
          "py-2 px-3 rounded-md transition-all flex items-center",
          isActive(link.href)
            ? "bg-[#5ce1e6]/20 border-l-4 border-[#00aeff] font-semibold"
            : "hover:bg-gray-100"
        )}
      >
        {link.label}
      </Link>
    ))}

    {/* Customer dashboard */}
    {user?.role.toLowerCase() === "customer" && (
      <Link
        href="/customer"
        onClick={() => setMobileMenuOpen(false)}
        className={cn(
          "py-2 px-3 rounded-md flex items-center",
          isActive("/customer")
            ? "bg-[#5ce1e6]/20 border-l-4 border-[#00aeff] font-semibold"
            : "hover:bg-gray-100"
        )}
      >
        Dashboard
      </Link>
    )}

    {/* Divider */}
    <div className="border-t my-2" />

    {/* Auth Section */}
    {user ? (
      <>
        <Link
          href={getDashboardPath()}
          onClick={() => setMobileMenuOpen(false)}
          className="py-2 flex items-center gap-2 px-3 hover:bg-gray-100 rounded-md"
        >
          <UserIcon size={18} /> Dashboard
        </Link>

        <button
          onClick={handleLogout}
          className="py-2 text-red-500 flex items-center gap-2 px-3 hover:bg-red-50 rounded-md"
        >
          <LogOut size={18} /> Logout
        </button>
      </>
    ) : (
      /* 🔥 MOBILE LOGIN BUTTON (ALWAYS VISIBLE STYLE) */
      <Link
        href="/login"
        onClick={() => setMobileMenuOpen(false)}
        className="mt-2 w-full"
      >
        <button className="w-full py-2 rounded-md bg-[#00aeff] text-white font-semibold flex items-center justify-center gap-2">
          Login
          <ArrowUpRight className="w-5 h-5" />
        </button>
      </Link>
    )}
  </div>
)}
    </header>
  );
};

export default NavbarClient;