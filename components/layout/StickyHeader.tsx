"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

export type StickyHeaderProps = {
  children: ReactNode;
};

export function StickyHeader({ children }: StickyHeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const ticking = useRef(false);

  useEffect(() => {
    function handleScroll() {
      if (ticking.current) return;
      ticking.current = true;
      requestAnimationFrame(() => {
        setScrolled(window.scrollY > 8);
        ticking.current = false;
      });
    }

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 border-b transition-colors",
        scrolled
          ? "border-[color:var(--color-border-subtle)] bg-[color:var(--color-bg)]/80 backdrop-blur-md"
          : "border-transparent bg-transparent",
      )}
    >
      {children}
    </header>
  );
}
