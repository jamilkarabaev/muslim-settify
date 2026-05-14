import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { ApplyCTA } from "@/components/apply-cta";
import { SuccessPictures } from "@/components/success-pictures";
import { AnimatedButton } from "@/components/ui/animated-button";
import { successPictures } from "@/data/success-pictures";

export const metadata = {
  title: "More Success — Muslim Settify",
  description:
    "Real wins from the Muslim Settify community — roles landed, commissions collected, deals closed.",
};

export default function MoreSuccessPage() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <SuccessPictures
        pictures={successPictures}
        title="More Success"
        subtitle="Student wins from the programme."
        numbered
      />
      <section className="px-4 sm:px-6 lg:px-8 pb-12 md:pb-16 bg-white">
        <div className="max-w-6xl mx-auto flex justify-center">
          <AnimatedButton
            href="https://t.me/jamilschannel"
            className="text-sm md:text-lg md:px-[60px]"
          >
            See more
          </AnimatedButton>
        </div>
      </section>
      <ApplyCTA />
      <Footer />
    </main>
  );
}
