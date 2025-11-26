import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/all";

gsap.registerPlugin(ScrollTrigger, SplitText);

export function HowItsMadeSection() {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const imgRefs = useRef([]);
  const textRefs = useRef([]);

  useGSAP(() => {
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

    const imgs = imgRefs.current;
    const texts = textRefs.current;

    imgs.forEach((img) => {
      gsap.fromTo(
        img,
        { opacity: 0, filter: "blur(48px)" },
        {
          opacity: 1,
          filter: "blur(0px)",
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: {
            trigger: img,
            start: "top 85%",
            end: "top 20%",
            scrub: true,
          },
        },
      );
    });

    imgs.forEach((el) => {
      gsap.fromTo(
        el,
        { y: -120 }, // starting lift
        {
          y: 120, // ending drop
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        },
      );
    });

    texts.forEach((el) => {
      gsap.fromTo(
        el,
        { y: -60 },
        {
          y: 60,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        },
      );
    });
  }, []);

  return (
    <section id="how-its-made" ref={sectionRef} className="px-4 py-24 md:px-12">
      <h2
        ref={headingRef}
        className="font-heading mb-16 text-center text-4xl font-bold md:text-5xl lg:text-7xl xl:text-8xl"
      >
        Made by hand. <br /> Made to last.
      </h2>

      <div className="grid grid-cols-8 gap-6 text-xs text-balance md:text-xl lg:grid-cols-24 lg:text-2xl xl:text-4xl">
        <img
          ref={(el) => el && imgRefs.current.push(el)}
          src="images/bronze-sheet.webp"
          alt=""
          className="col-span-5 col-start-1 row-span-5 row-start-1 lg:col-span-10 lg:col-start-3"
        />
        <p
          ref={(el) => el && textRefs.current.push(el)}
          className="col-span-4 col-start-5 row-start-2 lg:col-span-11 lg:col-start-12"
        >
          Each cymbal starts as a B20 bronze blank — a mix of copper and tin
          known for its musical range.
        </p>

        <img
          ref={(el) => el && imgRefs.current.push(el)}
          src="images/bronze-sheet-hammer.webp"
          alt=""
          className="col-span-5 col-start-4 row-span-5 row-start-6 lg:col-span-10 lg:col-start-13"
        />
        <p
          ref={(el) => el && textRefs.current.push(el)}
          className="col-span-4 col-start-2 row-start-7 lg:col-span-11 lg:col-start-6 lg:row-start-8 lg:translate-y-12 2xl:col-span-8 2xl:col-start-7"
        >
          From there, it’s heated, hammered, and lathed by hand until the
          surface begins to sing.
        </p>

        <img
          ref={(el) => el && imgRefs.current.push(el)}
          src="images/cymbals-on-stands.webp"
          alt=""
          className="col-span-5 col-start-1 row-span-5 row-start-11 lg:col-span-10 lg:col-start-3"
        />
        <p
          ref={(el) => el && textRefs.current.push(el)}
          className="col-span-4 col-start-5 row-start-13 lg:col-span-11 lg:col-start-12"
        >
          No two cymbals are identical. Subtle variations in hammer marks and
          thickness give each one its own tone and feel.
        </p>
      </div>
    </section>
  );
}
