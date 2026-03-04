import "./globals.css";
import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { StickyCTA } from "@/components/StickyCTA";

export const metadata: Metadata = {
  title: "Dumpster Duff's | Affordable 15-Yard Dumpster Rentals in Missouri",
  description:
    "Veteran-owned dumpster rental service. Same-day delivery, flexible rental periods, optional loading service. Serving Missouri communities with pride.",
  keywords:
    "dumpster rental Missouri, 15 yard dumpster, veteran owned waste removal, junk removal Columbia MO, dumpster rental Jefferson City",
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
        <Header />
        <main>{children}</main>
        <Footer />
        <StickyCTA />
      </body>
    </html>
  );
}
