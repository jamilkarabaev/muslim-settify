import { Logo } from "@/components/Logo";
import { VideoTestimonials } from "@/components/video-testimonials";
import { SocialProof } from "@/components/social-proof";
import { toLoomEmbedUrl } from "@/lib/loom";

const TRAINING_LOOM_URL_LEFT =
  "https://www.loom.com/share/06be02944dcc4b4a8994919369f23317";
const TRAINING_LOOM_URL_RIGHT =
  "https://www.loom.com/embed/b62017a7639543548f22b1b3e5f7392e";

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

        {/* Section 2: Video Testimonials — same component as the landing page */}
        <VideoTestimonials />

        {/* Section 3: Text Testimonials — same component as the landing page */}
        <SocialProof />
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
