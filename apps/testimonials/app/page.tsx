import { Logo } from "@/components/Logo";
import { videoTestimonials } from "@/data/video-testimonials";
import { textTestimonials } from "@/data/text-testimonials";
import { toLoomEmbedUrl } from "@/lib/loom";

const TRAINING_LOOM_URL_LEFT =
  "https://www.youtube.com/embed/SXxh4zQiJms";
const TRAINING_LOOM_URL_RIGHT =
  "https://www.loom.com/embed/b62017a7639543548f22b1b3e5f7392e";

// Color mapping for initials circles (matching social-proof.tsx)
const getInitialsColor = (index: number): string => {
  const colors = [
    "from-[#0066FF] to-[#0052CC]",
    "from-[#00D4AA] to-[#00B894]",
    "from-[#0066FF] to-[#0052CC]",
    "from-[#00D4AA] to-[#00B894]",
    "from-[#0066FF] to-[#0052CC]",
    "from-[#00D4AA] to-[#00B894]",
    "from-[#0066FF] to-[#0052CC]",
    "from-[#00D4AA] to-[#00B894]",
    "from-[#0066FF] to-[#0052CC]",
  ];
  return colors[index % colors.length] || "from-[#0066FF] to-[#0052CC]";
};

export default function Home() {
  const currentYear = new Date().getFullYear();

  return (
    <div className="min-h-screen bg-[#FFFFFF]">
      {/* Header */}
      <header className="border-b border-[#E2E8F0] bg-white/95 backdrop-blur-sm sticky top-0 z-40">
        <div className="container-custom py-4 md:py-6">
          <div className="flex justify-center items-center gap-2">
            <Logo />
            {process.env.NEXT_PUBLIC_SITE_VARIANT === "success" && (
              <span className="subdomain-badge">success.muslimsettify.com</span>
            )}
          </div>
        </div>
      </header>

      {/* Thank-you notice */}
      <div className="bg-[#F8FAFC] border-b border-[#E2E8F0]">
        <div className="container-custom py-2 text-center">
          <p className="text-xs sm:text-sm text-[#6B7280]">
            Thank you for applying. Please watch the training below — our team will reach out shortly.
          </p>
        </div>
      </div>

      <main>
        {/* Section 1: Training */}
        <section className="bg-[#FFFFFF] pt-6 md:pt-8 pb-10 md:pb-14"><div className="container-custom">
            <h1 className="mb-3 md:mb-4 text-center text-[#1A202C] text-2xl sm:text-3xl md:text-4xl">
              Training video
            </h1>
            <p className="mb-6 md:mb-8 text-center text-sm sm:text-base text-[#718096] px-4">
              Watch these two short trainings to get the most from your
              onboarding. Bring any questions to our call.
            </p>
            <div className="grid grid-cols-1 gap-6 md:gap-8 lg:grid-cols-2 max-w-[2400px] mx-auto">
              {/* Left video with WATCH THIS FIRST badge */}
              <div className="relative">
                {/* Video badge */}
                <div className="absolute -top-3 md:-top-4 left-1/2 transform -translate-x-1/2 z-10">
                  <div className="bg-[#0066FF] text-white text-[10px] sm:text-xs font-bold uppercase px-3 sm:px-4 py-1 sm:py-1.5 rounded-full shadow-lg whitespace-nowrap">
                    ▶ WATCH THIS FIRST
                  </div>
                </div>
                {/* Video container */}
                <div className="relative w-full aspect-video rounded-xl md:rounded-2xl overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.1)] md:shadow-[0_20px_60px_rgba(0,0,0,0.15)] border border-[#E2E8F0]">
                  <iframe
                    src={toLoomEmbedUrl(TRAINING_LOOM_URL_LEFT)}
                    title="WATCH THIS FIRST - Training Video"
                    width="100%"
                    height="100%"
                    frameBorder="0"
                    allowFullScreen
                    loading="lazy"
                    allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
              </div>
              {/* Right video */}
              <div className="relative">
                <div className="relative w-full aspect-video rounded-xl md:rounded-2xl overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.1)] md:shadow-[0_20px_60px_rgba(0,0,0,0.15)] border border-[#E2E8F0]">
                  <iframe
                    src={toLoomEmbedUrl(TRAINING_LOOM_URL_RIGHT)}
                    title="Training Video 2"
                    width="100%"
                    height="100%"
                    frameBorder="0"
                    allowFullScreen
                    loading="lazy"
                    allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
              </div>
            </div>
            {/* Helper line under videos */}
            <div className="mt-12 md:mt-16 mb-10 flex justify-center px-4">
              <div className="w-full sm:w-auto max-w-4xl rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] px-4 sm:px-6 md:px-8 py-3 sm:py-4 md:py-5 shadow-sm text-center">
                <span className="block text-sm sm:text-base md:text-lg lg:text-xl font-semibold uppercase tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-[#0066FF] to-[#00D4AA] leading-snug">
                  Go through the page and watch the videos as a member from our team reaches out to you
                </span>
                <span className="block text-sm sm:text-base md:text-lg lg:text-xl font-semibold uppercase tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-[#0066FF] to-[#00D4AA] mt-1 leading-snug">
                  In Shaa Allah
                </span>
              </div>
            </div>
            {/* subtle separator to balance with next section */}
            <div className="mx-auto mt-2 md:mt-4 mb-2 h-px w-full max-w-[1400px] bg-[#E2E8F0]" />
          </div>
        </section>

        {/* Section 2: Video Testimonials */}
        <section className="section-spacing bg-[#F7FAFC]">
          <div className="container-custom max-w-[1400px]">
            <h2 className="mb-3 md:mb-4 text-center text-[#1A202C] text-xl sm:text-2xl md:text-3xl px-4">
              Hear From Our Students Themselves
            </h2>
            <p className="mb-8 md:mb-12 text-center text-xs sm:text-sm text-[#718096] px-4">
              Figures & dates are rough/approximated.
            </p>
            <div className="grid grid-cols-1 gap-6 md:gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {videoTestimonials.map((testimonial, index) => (
                <article
                  key={index}
                  className={`bg-white rounded-2xl p-4 md:p-6 shadow-[0_4px_12px_rgba(0,0,0,0.08)] hover:shadow-[0_6px_20px_rgba(0,0,0,0.12)] transition-all duration-300 hover:-translate-y-1 flex flex-col ${
                    testimonial.highlight
                      ? "border-2 border-[#00D4AA] lg:col-start-2"
                      : ""
                  }`}
                >
                  {/* EARNINGS BADGE */}
                  <div className="mb-3 md:mb-4 h-10 md:h-14 flex items-center justify-center relative -mx-1 md:mx-0">
                    <div className="inline-flex items-center gap-1.5 md:gap-2.5 px-2.5 md:px-5 py-1.5 md:py-2 rounded-full font-semibold text-xs md:text-base border-2 relative overflow-hidden group bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-400 text-blue-900 w-[calc(100%-0.5rem)] md:w-auto max-w-full">
                      <span className="relative z-10 font-bold text-center flex-1 min-w-0">
                        {testimonial.metric}
                      </span>
                    </div>
                  </div>

                  {/* VIDEO */}
                  <div className="relative w-full aspect-video rounded-xl overflow-hidden shadow-md mb-3 md:mb-4">
                    <iframe
                      className="w-full h-full"
                      src={toLoomEmbedUrl(testimonial.url)}
                      title={testimonial.title}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      loading="lazy"
                    />
                  </div>

                  {/* TEXT CONTENT BELOW VIDEO */}
                  <div className="flex-1 flex flex-col">
                    {/* HEADER */}
                    <div className="mb-3">
                      {testimonial.highlight && (
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00D4AA]/10 text-[#00D4AA] font-bold text-xs mb-2">
                          <svg
                            className="w-3 h-3"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M13 10V3L4 14h7v7l9-11h-7z"
                            />
                          </svg>
                          <span>FASTEST RESULT</span>
                        </div>
                      )}
                      <h3 className="text-lg font-bold text-[#1A202C] mb-1">
                        {testimonial.title}
                      </h3>
                      {testimonial.body[0] && (
                        <p className="text-sm text-[#718096] mb-2">
                          {testimonial.body[0]}
                        </p>
                      )}
                    </div>

                    {/* TIMELINE */}
                    <div className="space-y-2 mb-4 flex-1">
                      {testimonial.body.slice(1).map((item, idx) => (
                        <div
                          key={idx}
                          className="flex items-start gap-2 text-sm text-[#718096]"
                        >
                          <div className="w-1.5 h-1.5 rounded-full bg-[#0066FF] flex-shrink-0 mt-2"></div>
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>

                    {/* CLOSING LINE (for Shehab) */}
                    {testimonial.closing && (
                      <p className="text-sm font-medium text-[#1A202C] mb-4 italic">
                        {testimonial.closing}
                      </p>
                    )}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Section 3: Text Testimonials */}
        <section className="section-spacing bg-[#FFFFFF]">
          <div className="container-custom">
            <h2 className="mb-3 md:mb-4 text-center text-[#1A202C] text-xl sm:text-2xl md:text-3xl px-4">
              Real Students, Real Results
            </h2>
            <p className="mb-8 md:mb-12 text-center text-base sm:text-lg text-[#718096] px-4">
              Join 100+ students building sustainable income
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-6">
              {textTestimonials.map((testimonial, index) => (
                <article
                  key={index}
                  className={`bg-white rounded-xl p-3 md:p-4 lg:p-5 border border-[#E2E8F0] shadow-[0_2px_8px_rgba(0,0,0,0.04)] hover:shadow-[0_4px_16px_rgba(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-300 flex flex-col ${
                    testimonial.badge === "FASTEST"
                      ? "border-2 border-[#00D4AA]"
                      : ""
                  }`}
                >
                  {/* Profile */}
                  <div className="flex items-start gap-2 md:gap-3 lg:gap-4 mb-2 md:mb-3 lg:mb-4">
                    <div
                      className={`w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 rounded-full bg-gradient-to-br ${getInitialsColor(
                        index
                      )} flex items-center justify-center text-white font-bold text-xs md:text-sm lg:text-lg flex-shrink-0`}
                    >
                      {testimonial.initials}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1 md:gap-2 mb-0.5 md:mb-1 flex-wrap">
                        <div className="font-bold text-xs md:text-sm lg:text-base text-[#1A202C] truncate">
                          {testimonial.name}
                        </div>
                        {testimonial.badge && (
                          <div className="inline-flex items-center gap-0.5 md:gap-1 px-1.5 md:px-2 py-0.5 rounded-full bg-[#00D4AA]/10 text-[#00D4AA] font-bold text-[10px] md:text-xs">
                            <svg
                              className="w-2 h-2 md:w-3 md:h-3"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M13 10V3L4 14h7v7l9-11h-7z"
                              />
                            </svg>
                            <span>{testimonial.badge}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Story */}
                  <p className="text-xs md:text-sm lg:text-base text-[#2D3748] leading-tight md:leading-relaxed mb-2 md:mb-3 lg:mb-4 flex-1">
                    {testimonial.story}
                  </p>

                  {/* Money Badge */}
                  <div
                    className={`inline-flex items-center gap-1 md:gap-2 px-2 md:px-3 py-1 md:py-1.5 rounded-full font-semibold text-[10px] md:text-xs lg:text-sm mt-auto ${
                      testimonial.badge === "FASTEST"
                        ? "bg-[#00D4AA] text-white"
                        : "bg-[#E6FFFA] text-[#00D4AA]"
                    }`}
                  >
                    <svg
                      className="h-2.5 w-2.5 md:h-3 md:w-3 lg:h-3.5 lg:w-3.5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                      />
                    </svg>
                    <span className="truncate">{testimonial.money}</span>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-[#E2E8F0] bg-[#FFFFFF] py-6 md:py-8">
        <div className="container-custom flex flex-col items-center gap-4 md:gap-6 text-center px-4">
          <div className="text-xs sm:text-sm text-[#718096]">
            © {currentYear} Muslim Settify. All rights reserved.
          </div>
          <nav className="flex flex-wrap justify-center gap-4 md:gap-5">
            <a
              href="https://www.youtube.com/@Jamilb2b"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#0066FF] hover:underline transition-colors text-sm sm:text-base min-h-[44px] flex items-center justify-center"
            >
              YouTube
            </a>
          </nav>
        </div>
      </footer>
    </div>
  );
}
