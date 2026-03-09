"use client";

import { useState, useEffect } from "react";
import { trackPhoneClick } from "@/lib/utils/analytics";

export function StickyCTA() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show sticky CTA after scrolling 500px
      setIsVisible(window.scrollY > 500);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-[#1A1A1A] border-t border-[#404040] shadow-lg lg:hidden">
      <div className="container-custom py-3">
        <div className="flex items-center gap-3">
          <a
            href="tel:+15733564272"
            onClick={() => trackPhoneClick("(573) 356-4272")}
            className="flex-1 btn bg-primary text-white hover:bg-primary-dark min-h-[48px]"
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
              />
            </svg>
            Call Now
          </a>
          <a href="/booking" className="flex-1 btn-primary min-h-[48px]">
            Book Now
          </a>
        </div>
      </div>
    </div>
  );
}
