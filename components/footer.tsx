"use client";

import Image from "next/image";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-[#F3F6FB] text-[#1A202C] py-12 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto flex flex-col items-center gap-6 text-center">
        <Link href="/" aria-label="Go to home" className="flex items-center gap-2">
          <Image
            src="/settify-bg.png"
            alt="Muslim Settify"
            width={40}
            height={40}
            priority
            fetchPriority="high"
            unoptimized
            className="h-9 w-9"
          />
          <span className="text-lg font-semibold tracking-tight">
            Muslim Settify
          </span>
        </Link>

        <nav className="flex flex-wrap justify-center gap-5 text-sm">
          <a
            href="https://www.youtube.com/@Jamilb2b"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#2563EB] hover:underline transition-colors"
          >
            YouTube
          </a>
          <a
            href="https://docs.google.com/document/d/1-n-lWvxPboEynrJeECea9pnwaxq94FLfz2YEIOFCe4o/edit?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#2563EB] hover:underline transition-colors"
          >
            Privacy Policy
          </a>
          <a
            href="https://docs.google.com/document/d/1-n-lWvxPboEynrJeECea9pnwaxq94FLfz2YEIOFCe4o/edit?tab=t.jyh6z0kc5c8i#heading=h.k91yj8jrwdw"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#2563EB] hover:underline transition-colors"
          >
            Terms of Service
          </a>
        </nav>

        <p className="text-xs text-[#94A3B8]">
          © {new Date().getFullYear()} Muslim Settify. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

