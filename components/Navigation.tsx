"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

import { navItems } from "../lib/constants";
import { cn } from "@/lib/utils";

function NavLinks({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <>
      {navItems.map((item, index) => (
        <div
          key={item.label}
          className="flex flex-col md:flex-row md:items-center md:gap-8"
        >
          {index > 0 && (
            <span className="hidden h-5 w-px bg-[oklch(44.6%_0.043_257.281)] shadow-[-4px_0_6px_rgba(255,255,255,0.16),4px_0_6px_rgba(0,0,0,0.42)] md:block" />
          )}
          <Link
            href={item.href}
            className="block rounded-md py-2 text-white transition-colors duration-150 hover:bg-white/10 md:px-2 lg:min-w-28 lg:text-center"
            onClick={onNavigate}
          >
            {item.label}
          </Link>
        </div>
      ))}
    </>
  );
}

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  const closeMenu = () => setIsOpen(false);

  const openMenu = () => {
    setIsMounted(true);
    setIsOpen(true);
  };

  const toggleMenu = () => {
    if (isOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  };

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 768px)");

    const handleResize = () => {
      if (mediaQuery.matches) {
        setIsOpen(false);
        setIsMounted(false);
      }
    };

    mediaQuery.addEventListener("change", handleResize);
    return () => mediaQuery.removeEventListener("change", handleResize);
  }, []);

  const handleMobileAnimationEnd = () => {
    if (!isOpen) {
      setIsMounted(false);
    }
  };

  return (
    <header className="bg-[oklch(20.8%_0.042_265.755)] text-white">
      <nav className="container mx-auto px-4 py-4 lg:pt-8">
        <div className="flex items-center justify-between lg:flex-col lg:gap-6">
          <Link
            href="/"
            className="text-xl font-semibold tracking-normal text-white"
            onClick={closeMenu}
          >
            Car Company
          </Link>

          <button
            type="button"
            className="inline-flex size-10 items-center justify-center rounded-md text-white transition-colors duration-150 hover:bg-white/10 md:hidden"
            aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-controls="main-navigation"
            aria-expanded={isOpen}
            onClick={toggleMenu}
          >
            <span className="relative size-6">
              <Menu
                size={24}
                className={cn(
                  "absolute inset-0 transition-all duration-200",
                  isOpen
                    ? "rotate-90 scale-0 opacity-0"
                    : "rotate-0 scale-100 opacity-100",
                )}
                aria-hidden="true"
              />
              <X
                size={24}
                className={cn(
                  "absolute inset-0 transition-all duration-200",
                  isOpen
                    ? "rotate-0 scale-100 opacity-100"
                    : "-rotate-90 scale-0 opacity-0",
                )}
                aria-hidden="true"
              />
            </span>
          </button>

          {isMounted && (
            <div
              id="main-navigation"
              className={cn(
                "flex w-full flex-col gap-2 pt-4 md:hidden",
                isOpen
                  ? "animate-in slide-in-from-top-2 fade-in duration-200"
                  : "animate-out slide-out-to-top-2 fade-out duration-150",
              )}
              onAnimationEnd={handleMobileAnimationEnd}
            >
              <NavLinks onNavigate={closeMenu} />
            </div>
          )}

          <div className="hidden w-full flex-col gap-2 md:flex md:w-auto md:flex-row md:items-center md:justify-center md:gap-8 md:pt-0 lg:w-full lg:justify-evenly">
            <NavLinks />
          </div>
        </div>
      </nav>
    </header>
  );
}
