"use client";

import { useState } from "react";
import Link from "next/link";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container-custom">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">DD</span>
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-xl text-secondary leading-none">
                Dumpster Duff&apos;s
              </span>
              <span className="text-xs text-gray-600 leading-none mt-0.5">
                Veteran Owned
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            <Link
              href="/sizes-pricing"
              className="text-secondary hover:text-primary font-semibold transition-colors"
            >
              Sizes & Pricing
            </Link>
            <Link
              href="/how-it-works"
              className="text-secondary hover:text-primary font-semibold transition-colors"
            >
              How It Works
            </Link>
            <Link
              href="/service-areas"
              className="text-secondary hover:text-primary font-semibold transition-colors"
            >
              Service Areas
            </Link>
            <Link
              href="/contractors"
              className="text-secondary hover:text-primary font-semibold transition-colors"
            >
              For Contractors
            </Link>
            <Link
              href="/about"
              className="text-secondary hover:text-primary font-semibold transition-colors"
            >
              About
            </Link>
          </nav>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-4">
            <a
              href="tel:+15733564272"
              className="text-primary font-bold text-lg hover:text-primary-dark transition-colors"
            >
              (573) 356-4272
            </a>
            <a href="#book-now" className="btn-primary">
              Book Now
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {mobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-4 border-t">
            <nav className="flex flex-col gap-4">
              <Link
                href="/sizes-pricing"
                className="text-secondary hover:text-primary font-semibold py-2"
              >
                Sizes & Pricing
              </Link>
              <Link
                href="/how-it-works"
                className="text-secondary hover:text-primary font-semibold py-2"
              >
                How It Works
              </Link>
              <Link
                href="/service-areas"
                className="text-secondary hover:text-primary font-semibold py-2"
              >
                Service Areas
              </Link>
              <Link
                href="/contractors"
                className="text-secondary hover:text-primary font-semibold py-2"
              >
                For Contractors
              </Link>
              <Link
                href="/about"
                className="text-secondary hover:text-primary font-semibold py-2"
              >
                About
              </Link>
              <a
                href="tel:+15733564272"
                className="text-primary font-bold text-lg py-2"
              >
                (573) 356-4272
              </a>
              <a href="#book-now" className="btn-primary mt-2">
                Book Now
              </a>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
