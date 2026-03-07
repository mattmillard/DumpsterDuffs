import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Dumpster Duff's | Veteran-Owned Dumpster Rental",
  description:
    "Learn about Dumpster Duff's, a veteran-owned dumpster rental company serving central Missouri with pride and professional service.",
};

export default function About() {
  return (
    <div className="min-h-screen bg-secondary pt-24 pb-12">
      <div className="container-custom">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            About Dumpster Duff&apos;s
          </h1>
          <p className="text-xl text-white/70 mb-12">
            Veteran-owned, locally operated, and committed to serving our
            community with excellence.
          </p>

          {/* Our Story */}
          <div className="card p-8 bg-bg-alt mb-8">
            <h2 className="text-2xl font-bold text-white mb-6">Our Story</h2>
            <div className="space-y-4 text-white/80">
              <p>
                Dumpster Duff&apos;s was founded on a simple principle: make
                waste removal easy, reliable, and affordable for everyone in
                central Missouri. As a veteran-owned business, we bring the same
                work ethic, integrity, and commitment to excellence that we
                learned in military service to every job we do.
              </p>
              <p>
                We started small but had a big vision: to serve our communities
                with professional, friendly dumpster rental service. Today, we
                proudly serve Columbia, Jefferson City, and surrounding areas
                with pride and dedication.
              </p>
              <p>
                Every day, we&apos;re committed to making your project easier.
                Whether you&apos;re renovating your home, clearing out your
                garage, or managing a construction project, we&apos;re here to
                help without the hassle.
              </p>
            </div>
          </div>

          {/* Why Choose Us */}
          <div className="card p-8 bg-bg-alt mb-8">
            <h2 className="text-2xl font-bold text-white mb-6">
              Why Choose Dumpster Duff&apos;s?
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                {
                  title: "Veteran Owned",
                  desc: "Proud to be a veteran-owned business serving Missouri",
                },
                {
                  title: "Transparent Pricing",
                  desc: "No hidden fees. Price locked at booking. Simple and honest.",
                },
                {
                  title: "Reliable Service",
                  desc: "On-time delivery guaranteed. Professional team every time.",
                },
                {
                  title: "Local Community",
                  desc: "We live and work in central Missouri. Your neighbors.",
                },
                {
                  title: "Flexible Options",
                  desc: "Flexible rental periods, loading services, and more.",
                },
                {
                  title: "Customer First",
                  desc: "Your satisfaction is our priority. Always.",
                },
              ].map((item, idx) => (
                <div key={idx} className="p-4 bg-secondary rounded-lg">
                  <h3 className="font-bold text-white mb-2">{item.title}</h3>
                  <p className="text-white/70 text-sm">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Our Commitment */}
          <div className="card p-8 bg-gradient-to-br from-primary/20 to-accent/20 border border-primary/40 mb-8">
            <h2 className="text-2xl font-bold text-white mb-6">
              Our Commitment
            </h2>
            <div className="space-y-4 text-white/80">
              <p>
                We&apos;re committed to delivering exceptional service every
                single time. That means:
              </p>
              <ul className="space-y-2">
                {[
                  "Same-day or next-day delivery in most areas",
                  "Honest, transparent prices with no surprises",
                  "Professional, courteous service from start to finish",
                  "Flexibility when your needs change",
                  "Supporting our local Missouri communities",
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <svg
                      className="w-5 h-5 text-primary flex-shrink-0 mt-0.5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* CTA */}
          <div className="card p-8 bg-bg-alt text-center">
            <h3 className="text-2xl font-bold text-white mb-4">
              Experience the Dumpster Duff's difference
            </h3>
            <p className="text-white/70 mb-6">
              Let us show you what customer-focused dumpster rental looks like.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/booking" className="btn-primary">
                Book Now
              </a>
              <a href="tel:+15733564272" className="btn-secondary">
                Call: (573) 356-4272
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
