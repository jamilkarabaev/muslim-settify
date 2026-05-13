import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { ApplyCTA } from "@/components/apply-cta";
import { SuccessPictures } from "@/components/success-pictures";
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
        subtitle="Real wins from the Muslim Settify community."
      />
      <ApplyCTA />
      <Footer />
    </main>
  );
}
