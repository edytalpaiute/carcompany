"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import { navItems } from "../lib/constants";

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-[oklch(20.8%_0.042_265.755)] text-white">
      <nav className="container mx-auto px-4 py-4 lg:pt-8">
        <div className="flex items-center justify-between lg:flex-col lg:gap-6">
          <Link
            href="/"
            className="text-xl font-semibold tracking-normal text-white"
            onClick={() => setIsOpen(false)}
          >
            Car Company
          </Link>

          <button
            type="button"
            className="inline-flex size-10 items-center justify-center rounded-md text-white hover:bg-white/10 md:hidden"
            aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-controls="main-navigation"
            aria-expanded={isOpen}
            onClick={() => setIsOpen((open) => !open)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          <div
            id="main-navigation"
            className={`${
              isOpen ? "flex" : "hidden"
            } w-full flex-col gap-2 pt-4 md:flex md:w-auto md:flex-row md:items-center md:justify-center md:gap-8 md:pt-0 lg:w-full lg:justify-evenly`}
          >
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
                  className="block rounded-md py-2 text-white hover:bg-white/10 md:px-2 lg:min-w-28 lg:text-center"
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </nav>
    </header>
  );
}
