export default function SocialProof() {
  const reviews = [
    {
      name: "Mike Thompson",
      project: "Kitchen Renovation",
      rating: 5,
      text: "Called Duff on a Thursday, had the dumpster delivered Friday morning. Fast, professional, and the price was exactly what they quoted. Would definitely use them again.",
      date: "Feb 2026",
      avatar: "MT",
    },
    {
      name: "Sarah Jenkins",
      project: "Garage Cleanout",
      rating: 5,
      text: "The team was super helpful. They even moved the dumpster to a better spot when I realized the first location wasn't ideal. Great local service!",
      date: "Jan 2026",
      avatar: "SJ",
    },
    {
      name: "Tom Rodriguez",
      project: "Roofing Job",
      rating: 5,
      text: "I'm a contractor and use several dumpster services. Dumpster Duff's is by far the most reliable. On-time delivery every single time. Highly recommend for pros.",
      date: "Jan 2026",
      avatar: "TR",
    },
  ];

  const stats = [
    { number: "1,200+", label: "Jobs Completed" },
    { number: "4.9★", label: "Average Rating" },
    { number: "6 Years", label: "Serving Missouri" },
    { number: "100%", label: "Veteran Owned" },
  ];

  return (
    <section className="section-padding bg-[#0F0F0F]">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            What Our Customers Say
          </h2>
          <p className="text-lg text-[#999999] max-w-2xl mx-auto">
            Don&apos;t just take our word for it. Here&apos;s what real
            customers have to say about working with Dumpster Duff&apos;s.
          </p>
        </div>

        {/* Stats Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12 max-w-4xl mx-auto">
          {stats.map((stat, idx) => (
            <div key={idx} className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary mb-1">
                {stat.number}
              </div>
              <div className="text-sm text-[#808080] font-semibold">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Reviews Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {reviews.map((review, idx) => (
            <div key={idx} className="card p-6 flex flex-col">
              {/* Rating */}
              <div className="flex gap-1 mb-3">
                {[...Array(review.rating)].map((_, i) => (
                  <svg
                    key={i}
                    className="w-5 h-5 text-primary fill-current"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>

              {/* Review Text */}
              <p className="text-[#999999] mb-4 flex-1 leading-relaxed">
                &quot;{review.text}&quot;
              </p>

              {/* Author */}
              <div className="flex items-center gap-3 pt-4 border-t border-bg-alt">
                <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center text-primary font-bold text-sm">
                  {review.avatar}
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-white">{review.name}</p>
                  <p className="text-sm text-[#808080]">
                    {review.project} • {review.date}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Google Reviews Link */}
        <div className="text-center">
          <a
            href="https://www.google.com/search?q=dumpster+duffs"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-primary hover:text-primary-light font-semibold transition-colors"
          >
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z" />
            </svg>
            Read all reviews on Google
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              />
            </svg>
          </a>
        </div>
      </div>

      {/* WP MAPPING NOTES:
        - Create Custom Post Type: "reviews"
        - Fields: customer_name, project_type, rating, review_text, date, avatar_initials
        - Display 3 most recent reviews via WP_Query
        - Stats: use ACF options page for editable numbers
        - Google review link: theme customizer setting
        - Consider schema.org Review markup for SEO
      */}
    </section>
  );
}
