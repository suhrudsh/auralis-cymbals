import { useRef } from "react";

export function CymbalShowcaseCard({ heading, children, videoSrc, videoRef }) {
  const internalVideoRef = useRef(null);

  return (
    <div
      onMouseEnter={() => internalVideoRef.current.play()}
      onMouseLeave={() => {
        internalVideoRef.current.pause();
        internalVideoRef.current.currentTime = 0;
      }}
      className="bg-accent group overflow-hidden py-12 text-center lg:py-27"
    >
      <h3 className="font-heading font-bold md:text-6xl lg:text-7xl xl:text-8xl">
        {heading}
      </h3>
      <div className="relative aspect-video w-full -translate-y-1.5 scale-115 overflow-hidden transition-transform duration-500 ease-in-out group-hover:scale-125 lg:scale-125 lg:group-hover:scale-135">
        <video
          ref={(node) => {
            internalVideoRef.current = node;
            if (videoRef) videoRef.current = node;
          }}
          src={videoSrc}
          className="absolute inset-0 h-full w-full object-cover"
          muted
          playsInline
          preload="metadata"
        />
      </div>

      <p className="md:text-lg lg:text-xl xl:text-2xl">{children}</p>
    </div>
  );
}
