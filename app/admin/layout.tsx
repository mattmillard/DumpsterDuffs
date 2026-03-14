"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { MobileHeader } from "@/components/admin-mobile/MobileHeader";
import { MobileBottomNav } from "@/components/admin-mobile/MobileBottomNav";
import { AdminUser } from "@/types/admin";
import { getCurrentAdminUser, onAuthStateChange } from "@/lib/auth/admin";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
	const router = useRouter();
	const pathname = usePathname();
	const [user, setUser] = useState<AdminUser | null>(null);

	// Skip auth check for login page
	const isLoginPage = pathname === "/admin/login";

	useEffect(() => {
		if (isLoginPage) {
			return;
		}

		async function checkAuth() {
			try {
				const adminUser = await getCurrentAdminUser();

				if (!adminUser) {
					router.push(`/admin/login?redirect=${encodeURIComponent(pathname)}`);
					return;
				}

				if (adminUser) {
					setUser(adminUser);
				}
			} catch (err) {
				console.error("Auth error:", err);
				router.push("/admin/login");
			}
		}

		checkAuth();

		// Listen for auth state changes
		const subscription = onAuthStateChange((adminUser) => {
			if (!adminUser) {
				router.push("/admin/login");
			} else {
				setUser(adminUser);
			}
		});

		return () => {
			subscription.unsubscribe();
		};
	}, [router, isLoginPage, pathname]);

	// For login page, render without auth layout
	if (isLoginPage) {
		return <>{children}</>;
	}

	const navItems = [
		{ href: "/admin/dashboard", label: "Dashboard", icon: "📊" },
		{ href: "/admin/bookings", label: "Orders", icon: "📋" },
		{ href: "/admin/calendar", label: "Schedule", icon: "📅" },
		{ href: "/admin/inventory", label: "Inventory", icon: "📦" },
		{ href: "/admin/settings", label: "Settings", icon: "⚙️" },
	];

	return (
		<div className="min-h-screen bg-[#0F0F0F] flex flex-col md:flex-row">
			{/* Desktop Sidebar - Hidden on mobile */}
			<div className="hidden md:block">
				<AdminSidebar />
			</div>

			{/* Main content area */}
			<div className="flex-1 flex flex-col w-full">
				{/* Mobile Header */}
				<MobileHeader
					title="Operations"
					userName={user?.full_name || user?.email || "Admin User"}
					userRole={user?.role || "admin"}
				/>

				{/* Page content - with safe padding for bottom nav */}
				<main className="flex-1 overflow-y-auto pb-24 md:pb-0">
					<div className="p-4 md:p-8">{children}</div>
				</main>
			</div>

			{/* Mobile Bottom Navigation - Hidden on desktop */}
			<MobileBottomNav items={navItems} />
		</div>
	);
}
