import Image from "next/image";

import type { SuccessPicture } from "@/data/success-pictures";

type Props = {
  pictures: SuccessPicture[];
  title?: string;
  subtitle?: string;
  className?: string;
  id?: string;
};

export function SuccessPictures({
  pictures,
  title = "Success Stories",
  subtitle,
  className = "",
  id,
}: Props) {
  if (pictures.length === 0) {
    return null;
  }

  return (
    <section
      id={id}
      className={`scroll-mt-20 md:scroll-mt-24 py-12 md:py-20 px-4 sm:px-6 lg:px-8 bg-white ${className}`}
    >
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10 md:mb-14">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#1A202C] mb-4">
            {title}
          </h2>
          {subtitle && (
            <p className="text-lg text-[#718096]">{subtitle}</p>
          )}
        </div>

        <div className="columns-1 md:columns-2 gap-6 md:gap-8 [column-fill:_balance]">
          {pictures.map((picture, i) => (
            <figure
              key={`${picture.src}-${i}`}
              className="overflow-hidden rounded-2xl border border-[#E2E8F0] bg-white shadow-sm mb-6 md:mb-8 break-inside-avoid"
            >
              <Image
                src={picture.src}
                alt={picture.caption}
                width={1200}
                height={1500}
                loading="lazy"
                sizes="(min-width: 768px) 560px, 100vw"
                className="w-full h-auto block"
              />
              <figcaption className="px-6 py-5 md:px-7 md:py-6 text-base md:text-lg font-medium text-[#1A202C] leading-relaxed border-t border-[#E2E8F0] bg-[#F7FAFC]">
                {picture.caption}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
