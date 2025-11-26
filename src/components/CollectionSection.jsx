import React, { useRef } from "react";
import { CymbalScrollVideo } from "./CymbalScrollVideo";
import { CymbalShowcaseCard } from "./CymbalShowcaseCard";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/all";
import { useIsMobile } from "../hooks/useIsMobile";

gsap.registerPlugin(ScrollTrigger, SplitText);

export function CollectionSection() {
  const isMobile = useIsMobile(1024);

  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const staticImageRef = useRef(null);
  const animationContainerRef = useRef(null);
  const lumisVideoRef = useRef(null);

  useGSAP(() => {
    if (!animationContainerRef.current) return;
    staticImageRef.current.style.display = "none";

    const split = new SplitText(headingRef.current, {
      type: "words",
    });

    gsap.fromTo(
      split.words,
      { filter: "blur(12px)", y: 20, opacity: 0 },
      {
        filter: "blur(0px)",
        y: 0,
        opacity: 1,
        duration: 0.5,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          end: "top 20%",
          scrub: true,
        },
      },
    );

    const getPos = (el) => {
      const r = el.getBoundingClientRect();
      return {
        x: r.left + r.width / 2 - window.innerWidth / 2,
        y: r.top + r.height / 2 - window.innerHeight / 2,
      };
    };

    ScrollTrigger.create({
      trigger: animationContainerRef.current,
      start: "top bottom",
      end: isMobile ? "top 20%" : "bottom bottom",
      scrub: true,
      invalidateOnRefresh: true,
      onEnter: () => {
        lumisVideoRef.current.style.opacity = 0;
      },
      onLeave: () => {
        staticImageRef.current.style.display = "none";
        lumisVideoRef.current.style.opacity = 1;
      },
      onEnterBack: () => {
        staticImageRef.current.style.display = "block";
        lumisVideoRef.current.style.opacity = 0;
      },
      onLeaveBack: () => {
        lumisVideoRef.current.style.opacity = 1;
      },
      onUpdate: (self) => {
        const p = self.progress;
        const ease = gsap.parseEase("power2.out");

        const easedProgress = ease(p);

        const lumisVideoPosition = getPos(lumisVideoRef.current);
        const targetScale =
          (lumisVideoRef.current.offsetWidth / 1920) * (isMobile ? 1.15 : 1.25);

        const scale = 1 - (1 - targetScale) * easedProgress;

        gsap.set(staticImageRef.current, {
          x: lumisVideoPosition.x * easedProgress,
          y: lumisVideoPosition.y * easedProgress,
          scale: scale,
        });
      },
    });
  }, [isMobile]);

  return (
    <section ref={sectionRef} className="flex flex-col gap-16 py-24">
      <div>
        <div className="sticky top-24 flex flex-col gap-2 lg:gap-8">
          <h2
            ref={headingRef}
            className="font-heading text-center text-4xl font-bold md:text-5xl lg:text-7xl xl:text-8xl"
          >
            The Auralis
            <br />
            Collection
          </h2>
          <p className="text-center text-xs leading-4.5 md:text-lg md:leading-6.75 lg:text-xl lg:leading-7.5 xl:text-2xl xl:leading-9">
            A series of hand-crafted cymbals each tuned
            <br />
            for a different kind of player
          </p>
        </div>
        <img
          ref={staticImageRef}
          className="fixed top-0 z-10 h-screen w-full overflow-visible object-cover"
          src="lumis-cymbal-thumbnail.webp"
          alt=""
        />
        <CymbalScrollVideo staticImageRef={staticImageRef} />
      </div>
      <div
        id="the-collection"
        ref={animationContainerRef}
        className="grid gap-6 px-12 lg:grid-cols-3"
      >
        {isMobile && (
          <CymbalShowcaseCard
            heading={"Lumis"}
            videoSrc={"lumis-cymbal-hover.webm"}
            videoRef={lumisVideoRef}
          >
            Bright and open, with a fast,
            <br />
            shimmering decay.
          </CymbalShowcaseCard>
        )}

        <CymbalShowcaseCard
          heading={"Vetra"}
          videoSrc={"vetra-cymbal-hover.webm"}
        >
          Dark, complex, and warm
          <br />
          under a light touch.
        </CymbalShowcaseCard>
        {!isMobile && (
          <CymbalShowcaseCard
            heading={"Lumis"}
            videoSrc={"lumis-cymbal-hover.webm"}
            videoRef={lumisVideoRef}
          >
            Bright and open, with a fast,
            <br />
            shimmering decay.
          </CymbalShowcaseCard>
        )}
        <CymbalShowcaseCard
          heading={"Solan"}
          videoSrc={"solan-cymbal-hover.webm"}
        >
          Dry and defined, with a subtle
          <br />
          wash and quick response.
        </CymbalShowcaseCard>
      </div>
    </section>
  );
}
