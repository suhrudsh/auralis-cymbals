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
      className="bg-accent group py-27 text-center"
    >
      <h3 className="font-heading text-8xl font-bold">{heading}</h3>
      <video
        ref={(node) => {
          internalVideoRef.current = node; // keeps hover working
          if (videoRef) videoRef.current = node; // exposes same DOM to parent
        }}
        src={videoSrc}
        className="-translate-y-1.5 scale-125 transition-transform duration-500 ease-in-out group-hover:scale-135"
        muted
        playsInline
        preload="metadata"
        //   poster="/thumbnail.jpg"
      />
      <p className="text-2xl">{children}</p>
    </div>
  );
}
