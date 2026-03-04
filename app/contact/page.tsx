import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us | Dumpster Duff's",
  description:
    "Get in touch with Dumpster Duff's. Call (573) 356-4272 or visit us in Columbia, MO. Same-day dumpster delivery available.",
};

export default function Contact() {
  return (
    <div className="min-h-screen bg-secondary pt-24 pb-12">
      <div className="container-custom">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Contact Us
          </h1>
          <p className="text-xl text-white/70 mb-12">
            Have a question? Want to book a dumpster? Get in touch with our team
            today.
          </p>

          {/* Contact Grid */}
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {/* Left - Contact Info */}
            <div className="space-y-8">
              {/* Phone */}
              <div className="card p-6 bg-bg-alt">
                <div className="flex gap-4 items-start">
                  <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg
                      className="w-6 h-6 text-primary"
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
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white mb-2">Phone</h3>
                    <a
                      href="tel:+15733564272"
                      className="text-primary font-semibold hover:text-accent"
                    >
                      (573) 356-4272
                    </a>
                    <p className="text-white/60 text-sm mt-1">
                      Available 7 days a week
                    </p>
                  </div>
                </div>
              </div>

              {/* Email */}
              <div className="card p-6 bg-bg-alt">
                <div className="flex gap-4 items-start">
                  <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg
                      className="w-6 h-6 text-primary"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white mb-2">Email</h3>
                    <a
                      href="mailto:dustin@dumpsterduffs.com"
                      className="text-primary font-semibold hover:text-accent"
                    >
                      dustin@dumpsterduffs.com
                    </a>
                    <p className="text-white/60 text-sm mt-1">
                      Response within 24 hours
                    </p>
                  </div>
                </div>
              </div>

              {/* Location */}
              <div className="card p-6 bg-bg-alt">
                <div className="flex gap-4 items-start">
                  <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg
                      className="w-6 h-6 text-primary"
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
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white mb-2">
                      Service Area
                    </h3>
                    <p className="text-white/80">
                      Serving central Missouri including Columbia, Jefferson
                      City, and surrounding areas
                    </p>
                    <a
                      href="/service-areas"
                      className="text-primary hover:text-accent text-sm font-semibold mt-2 inline-block"
                    >
                      View all service areas →
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Right - Quick Contact Form */}
            <div className="card p-8 bg-bg-alt">
              <h3 className="text-2xl font-bold text-white mb-6">
                Send us a message
              </h3>
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-white mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    placeholder="John Doe"
                    className="input-field w-full"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-white mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    placeholder="(573) 123-4567"
                    className="input-field w-full"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-white mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    placeholder="you@example.com"
                    className="input-field w-full"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-white mb-2">
                    Message
                  </label>
                  <textarea
                    placeholder="Tell us about your project..."
                    rows={5}
                    className="input-field w-full resize-none"
                    required
                  />
                </div>
                <button type="submit" className="btn-primary w-full">
                  Send Message
                </button>
              </form>
            </div>
          </div>

          {/* CTA */}
          <div className="card p-8 bg-gradient-to-br from-primary/20 to-accent/20 border border-primary/40 text-center">
            <h3 className="text-2xl font-bold text-white mb-4">
              Ready to book?
            </h3>
            <p className="text-white/70 mb-6">
              Call us now for same-day dumpster delivery!
            </p>
            <a href="tel:+15733564272" className="btn-primary inline-block">
              Call Now: (573) 356-4272
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
