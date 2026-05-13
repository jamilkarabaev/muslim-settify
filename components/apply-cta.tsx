"use client";

import { motion, useReducedMotion } from "framer-motion";

import {
  fadeIn,
  zoomIn,
  reduced,
} from "@/components/ui/motion-presets";
import { AnimatedButton } from "@/components/ui/animated-button";

export function ApplyCTA() {
  const prefersReduced = useReducedMotion();
  const Heading = prefersReduced ? reduced : zoomIn;
  const Paragraph = prefersReduced ? reduced : fadeIn;
  const Card = prefersReduced ? reduced : zoomIn;

  return (
    <section className="py-12 md:py-24 px-4 sm:px-6 lg:px-8 bg-[#F7FAFC]">
      <div className="max-w-4xl mx-auto text-center">
        <motion.h2
          variants={Heading}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="text-3xl sm:text-4xl font-bold text-[#1A202C] mb-4"
        >
          Ready to Start Your Journey?
        </motion.h2>
        <motion.p
          variants={Paragraph}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
          className="text-lg text-[#718096] mb-8"
        >
          Apply now to see if you're a good fit for Muslim Settify.
        </motion.p>

        <motion.div
          variants={Card}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
        >
          <AnimatedButton
            href="/apply"
            className="text-sm md:text-lg md:px-[60px]"
          >
            Apply Now
          </AnimatedButton>

          <p className="text-sm text-[#718096] mt-6">
            No debit card required • We review every application
          </p>
        </motion.div>
      </div>
    </section>
  );
}


