"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { AdminNavItem } from "@/types/admin";
import { adminLogout } from "@/lib/auth/admin";

const ADMIN_NAV_ITEMS: AdminNavItem[] = [
  { name: "Dashboard", href: "/admin", icon: "📊" },
  { name: "Bookings", href: "/admin/bookings", icon: "📋" },
  { name: "Calendar", href: "/admin/calendar", icon: "📅" },
  { name: "Inventory", href: "/admin/inventory", icon: "📦" },
  { name: "Service Zones", href: "/admin/zones", icon: "🗺️" },
  { name: "Pricing", href: "/admin/pricing", icon: "💰" },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(true);

  const handleSignOut = async () => {
    try {
      await adminLogout();
      localStorage.removeItem("admin_demo_auth"); // Clean up any legacy demo auth
      router.push("/admin/login");
      router.refresh();
    } catch (err) {
      console.error("Sign out error:", err);
      // Still redirect to login even if there's an error
      router.push("/admin/login");
    }
  };

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 h-screen w-64 bg-[#0F0F0F] border-r border-[#404040] z-50 transition-transform duration-300 md:relative md:z-auto md:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Logo area */}
          <div className="p-6 border-b border-[#404040]">
            <Link href="/" className="flex items-center gap-3 hover:opacity-80">
              <img src="/logo.png" alt="Dumpster Duff's" className="w-8 h-8" />
              <span className="text-white font-bold text-sm">Admin</span>
            </Link>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
            {ADMIN_NAV_ITEMS.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center justify-between px-4 py-3 rounded-lg font-medium transition-colors ${
                    isActive
                      ? "bg-primary text-white"
                      : "text-[#999999] hover:text-white hover:bg-[#1A1A1A]"
                  }`}
                >
                  <span className="flex items-center gap-3">
                    <span className="text-lg">{item.icon}</span>
                    {item.name}
                  </span>
                  {item.badge && (
                    <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-[#404040]">
            <button
              onClick={handleSignOut}
              className="w-full px-4 py-2 text-[#999999] hover:text-white hover:bg-[#1A1A1A] rounded-lg transition-colors text-sm font-medium"
            >
              Sign Out
            </button>
          </div>
        </div>
      </aside>

      {/* Mobile menu button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 md:hidden z-40 p-3 bg-primary text-white rounded-full shadow-lg hover:bg-primary-dark transition-colors"
        aria-label="Toggle menu"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>
    </>
  );
}
