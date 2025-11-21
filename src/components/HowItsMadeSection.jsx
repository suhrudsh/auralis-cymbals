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
    <section ref={sectionRef} className="px-12 py-24">
      <h2
        ref={headingRef}
        className="font-heading col-span-full mb-16 text-center text-8xl font-bold"
      >
        Made by hand. <br /> Made to last.
      </h2>

      <div className="col-span-full grid grid-cols-24 gap-6 text-4xl">
        <img
          ref={(el) => el && imgRefs.current.push(el)}
          src="images/bronze-sheet.webp"
          alt=""
          className="col-span-10 col-start-3 row-span-5 row-start-1"
        />
        <p
          ref={(el) => el && textRefs.current.push(el)}
          className="col-span-10 col-start-12 row-start-2"
        >
          Each cymbal starts as a B20 bronze
          <br />
          blank — a mix of copper and tin
          <br />
          known for its musical range.
        </p>

        <img
          ref={(el) => el && imgRefs.current.push(el)}
          src="images/bronze-sheet-hammer.webp"
          alt=""
          className="col-span-10 col-start-13 row-span-5 row-start-4"
        />
        <p
          ref={(el) => el && textRefs.current.push(el)}
          className="col-span-10 col-start-8 row-start-6 translate-y-12"
        >
          From there, it’s heated, hammered,
          <br />
          and lathed by hand until the
          <br />
          surface begins to sing.
        </p>

        <img
          ref={(el) => el && imgRefs.current.push(el)}
          src="images/cymbals-on-stands.webp"
          alt=""
          className="col-span-10 col-start-3 row-span-5 row-start-8"
        />
        <p
          ref={(el) => el && textRefs.current.push(el)}
          className="col-span-10 col-start-12 row-start-10"
        >
          No two cymbals are identical. Subtle variations in hammer marks and
          thickness give each one its own tone and feel.
        </p>
      </div>
    </section>
  );
}
