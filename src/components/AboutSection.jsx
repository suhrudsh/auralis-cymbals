import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitText from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, SplitText);

export function AboutSection() {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const imageRef = useRef(null);

  useGSAP(
    () => {
      // Split the heading into words
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
      gsap.fromTo(
        imageRef.current,
        { filter: "blur(48px)", y: 20, opacity: 0 },
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
    },
    { scope: sectionRef },
  );

  return (
    <section
      id="about-us"
      ref={sectionRef}
      className="relative flex h-[95svh] grid-cols-12 flex-col gap-2 px-4 pt-36 pb-24 md:gap-4 md:px-12 lg:grid lg:gap-6 lg:py-24"
    >
      <div
        ref={imageRef}
        className="absolute bottom-0 left-0 h-full w-full bg-[url('/images/cymbal-finger.webp')] bg-contain bg-bottom bg-no-repeat mix-blend-lighten lg:bg-right"
      />

      <h2
        ref={headingRef}
        className="font-heading col-span-7 text-center text-4xl font-bold md:text-5xl lg:text-left lg:text-7xl xl:text-8xl"
      >
        Built for
        <br />
        players who
        <br />
        listen closely.
      </h2>

      <p className="col-span-full col-start-7 self-end text-center text-xs md:text-lg lg:text-xl xl:text-2xl">
        Every Auralis cymbal is shaped to bring out a distinct voice — complex,
        musical, and responsive. We believe great sound comes from intention.
        From the alloy, the hammering, and the hands that shape it. Auralis
        exists for drummers who value feel and character over perfection.
      </p>
    </section>
  );
}
