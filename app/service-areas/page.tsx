import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Service Areas | Dumpster Duff's",
  description:
    "Serving central Missouri including Columbia, Jefferson City, and surrounding areas. Same-day delivery available.",
};

export default function ServiceAreas() {
  const areas = [
    "Columbia",
    "Jefferson City",
    "Fulton",
    "Mexico",
    "Moberly",
    "Boonville",
    "Ashland",
    "Holts Summit",
    "Russellville",
    "California",
    "Centralia",
    "Wardsville",
  ];

  return (
    <div className="min-h-screen bg-secondary pt-24 pb-12">
      <div className="container-custom">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Service Areas
          </h1>
          <p className="text-xl text-white/70 mb-12">
            Proudly serving central Missouri communities with reliable dumpster
            rental service.
          </p>

          {/* Service Areas Grid */}
          <div className="grid md:grid-cols-2 gap-4 mb-12">
            {areas.map((city, idx) => (
              <div
                key={idx}
                className="card p-6 bg-bg-alt border-l-4 border-primary"
              >
                <div className="flex items-start gap-3">
                  <svg
                    className="w-6 h-6 text-primary flex-shrink-0 mt-0.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  <div>
                    <h3 className="text-lg font-bold text-white">{city}</h3>
                    <p className="text-sm text-primary font-semibold">
                      Same-day delivery available
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Coverage Info */}
          <div className="card p-8 bg-bg-alt mb-8">
            <h2 className="text-2xl font-bold text-white mb-4">
              Coverage Info
            </h2>
            <div className="space-y-4 text-white/80">
              <p>
                <strong>Service Radius:</strong> Up to 50 miles from Columbia,
                MO
              </p>
              <p>
                <strong>Delivery Fee:</strong> Included in price for most areas
              </p>
              <p>
                <strong>Same-Day Delivery:</strong> Available for most orders
                within our service area
              </p>
            </div>
          </div>

          {/* Not Listed CTA */}
          <div className="card p-8 bg-gradient-to-br from-primary/20 to-accent/20 border border-primary/40">
            <h3 className="text-2xl font-bold text-white mb-4">
              Don&apos;t See Your City?
            </h3>
            <p className="text-white/80 mb-6">
              We&apos;re always expanding! Call us to check if we service your
              area. Our service radius extends up to 50 miles from Columbia, and
              we may be able to help even if your city isn&apos;t listed above.
            </p>
            <a href="tel:+15733564272" className="btn-primary inline-block">
              Call: (573) 356-4272
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
