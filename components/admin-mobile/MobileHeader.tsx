"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { adminLogout } from "@/lib/auth/admin";

interface MobileHeaderProps {
  title?: string;
  subtitle?: string;
  showUser?: boolean;
  userName?: string;
  userRole?: string;
  onSettingsClick?: () => void;
}

export function MobileHeader({
  title = "Dashboard",
  subtitle,
  showUser = true,
  userName = "Admin",
  userRole = "Owner",
  onSettingsClick,
}: MobileHeaderProps) {
  const router = useRouter();
  const [showMenu, setShowMenu] = useState(false);

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
      <header className="sticky top-0 z-40 bg-[#0F0F0F] border-b border-[#404040] safe-top">
        {/* Main header bar */}
        <div className="px-4 py-3 flex items-center justify-between">
          <div className="flex-1">
            <h1 className="text-xl font-bold text-white truncate">{title}</h1>
            {subtitle && (
              <p className="text-xs text-[#999999] truncate">{subtitle}</p>
            )}
          </div>

          {/* User menu button */}
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="ml-4 w-10 h-10 rounded-full bg-[#FF8C00] flex items-center justify-center flex-shrink-0 font-bold text-white active:opacity-70 transition-opacity"
            aria-label="User menu"
          >
            {userName.charAt(0).toUpperCase()}
          </button>
        </div>

        {/* User menu dropdown */}
        {showMenu && (
          <div className="absolute top-full right-4 mt-2 bg-[#1A1A1A] border border-[#404040] rounded-lg shadow-lg overflow-hidden min-w-[200px] z-50">
            <div className="px-4 py-3 border-b border-[#404040]">
              <p className="text-sm font-medium text-white">{userName}</p>
              <p className="text-xs text-[#999999]">{userRole}</p>
            </div>

            <nav className="divide-y divide-[#404040]">
              <Link
                href="/admin/settings"
                className="block px-4 py-3 text-sm text-white active:bg-[#262626] transition-colors"
                onClick={() => setShowMenu(false)}
              >
                Settings
              </Link>
              <Link
                href="/admin/settings#account"
                className="block px-4 py-3 text-sm text-white active:bg-[#262626] transition-colors"
                onClick={() => setShowMenu(false)}
              >
                Account
              </Link>
              <button
                onClick={() => {
                  setShowMenu(false);
                  handleSignOut();
                }}
                className="w-full text-left px-4 py-3 text-sm text-red-400 active:bg-[#262626] transition-colors font-medium"
              >
                Sign Out
              </button>
            </nav>
          </div>
        )}
      </header>

      {/* Overlay for menu */}
      {showMenu && (
        <button
          className="fixed inset-0 z-30 bg-black/50 md:hidden"
          onClick={() => setShowMenu(false)}
          aria-label="Close menu"
        />
      )}
    </>
  );
}
