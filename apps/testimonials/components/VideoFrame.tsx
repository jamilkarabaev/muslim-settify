import { toLoomEmbedUrl } from "@/lib/loom";

type VideoFrameProps = {
  title: string;
  src: string;
  aspectRatio?: string;
  className?: string;
};

export function VideoFrame({
  title,
  src,
  aspectRatio = "16/9",
  className = "",
}: VideoFrameProps) {
  // Convert Loom share URLs to embed URLs if needed
  const embedUrl = toLoomEmbedUrl(src);

  return (
    <div
      className={`w-full ${className}`}
      style={{ aspectRatio: aspectRatio.replace("/", " / ") }}
    >
      <iframe
        src={embedUrl}
        title={title}
        width="100%"
        height="100%"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
        className="w-full h-full rounded-xl"
        style={{ border: "none" }}
      />
    </div>
  );
}
