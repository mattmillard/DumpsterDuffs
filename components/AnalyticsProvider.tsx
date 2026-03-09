"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { initializeAnalytics, trackPageView } from "@/lib/utils/analytics";

export function AnalyticsProvider() {
  const pathname = usePathname();

  // Initialize analytics on mount
  useEffect(() => {
    initializeAnalytics();
  }, []);

  // Track page views on route change
  useEffect(() => {
    if (pathname) {
      trackPageView(pathname);
    }
  }, [pathname]);

  return null;
}
