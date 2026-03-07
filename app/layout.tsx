import "./globals.css";
import type { Metadata } from "next";
import { ConditionalLayout } from "@/components/ConditionalLayout";

export const metadata: Metadata = {
  title: "Dumpster Duff's | Affordable 15-Yard Dumpster Rentals in Missouri",
  description:
    "Veteran-owned dumpster rental service. Same-day delivery, flexible rental periods, optional loading service. Serving Missouri communities with pride.",
  keywords:
    "dumpster rental Missouri, 15 yard dumpster, veteran owned waste removal, junk removal Columbia MO, dumpster rental Jefferson City",
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
    minimumScale: 1,
    viewportFit: "cover",
  },
  manifest: "/manifest.json",
  themeColor: "#FF8C00",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Dumpster Duff's",
  },
  formatDetection: {
    telephone: true,
    email: true,
    address: true,
  },
  icons: {
    icon: "/icon-192.png",
    shortcut: "/icon-192.png",
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    title:
      "Dumpster Duff's | When You're Ready to Get Rid of Some Junk and Stuff, Call Duff!",
    description:
      "Affordable 15-yard dumpster rentals. Same-day delivery available. Veteran-owned and locally operated.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="font-body">
        <ConditionalLayout>{children}</ConditionalLayout>
      </body>
    </html>
  );
}
