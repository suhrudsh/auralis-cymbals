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
      ref={sectionRef}
      className="relative grid h-[95svh] grid-cols-12 gap-6 px-12 py-24"
    >
      <div
        ref={imageRef}
        className="absolute h-full w-full bg-[url('images/cymbal-finger.webp')] bg-right bg-no-repeat mix-blend-lighten"
      />

      <h2
        ref={headingRef}
        className="font-heading col-span-7 text-8xl font-bold"
      >
        Built for
        <br />
        players who
        <br />
        listen closely.
      </h2>

      <p className="col-span-full col-start-7 self-end text-2xl">
        Every Auralis cymbal is shaped to bring out a distinct voice — complex,
        musical, and responsive. We believe great sound comes from intention.
        From the alloy, the hammering, and the hands that shape it. Auralis
        exists for drummers who value feel and character over perfection.
      </p>
    </section>
  );
}
