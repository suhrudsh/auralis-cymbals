import { Environment } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Lights } from "./Lights";
import { HeroSectionScene } from "./HeroSectionScene";
import { useGSAP } from "@gsap/react";
import { useEffect, useRef, useState } from "react";
import { SplitText } from "gsap/all";
import gsap from "gsap";
import { SRGBColorSpace } from "three";

gsap.registerPlugin(SplitText);

export function HeroSection() {
  const [visible, setVisible] = useState(true);

  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const subheadingRef = useRef(null);

  useEffect(() => {
    const io = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.1 },
    );
    io.observe(sectionRef.current);
    return () => io.disconnect();
  }, []);

  useGSAP(() => {
    const split = new SplitText(headingRef.current, {
      type: "words",
    });

    const tl = gsap.timeline();

    tl.fromTo(
      split.words,
      { filter: "blur(12px)", scale: 0.9, opacity: 0 },
      {
        filter: "blur(0px)",
        scale: 1,
        opacity: 1,
        duration: 0.5,
        stagger: 0.075,
        ease: "power2.out",
      },
    ).fromTo(
      subheadingRef.current,
      { filter: "blur(12px)", scale: 0.9, opacity: 0 },
      {
        filter: "blur(0px)",
        scale: 1,
        opacity: 1,
        duration: 0.75,
        ease: "power2.out",
      },
      "-=0.5",
    );
  }, []);

  return (
    <section ref={sectionRef} className="relative h-[95svh]">
      <div className="absolute -z-10 h-full w-full">
        <Canvas
          camera={{
            position: [0, 15.5, 0],
          }}
          shadows={false}
          gl={{
            antialias: false,
            powerPreference: "high-performance",
            outputColorSpace: SRGBColorSpace,
          }}
          dpr={[1, 1.5]}
        >
          <Lights />
          <Environment preset="forest" environmentIntensity={0.05} />
          <HeroSectionScene visible={visible} />
        </Canvas>
      </div>
      <div className="to-bg flex h-full w-full flex-col items-center justify-center gap-2 bg-linear-to-b from-transparent from-60% px-4 text-center lg:gap-8">
        <h1
          ref={headingRef}
          className="font-heading text-2xl font-black will-change-transform md:text-4xl md:leading-9 lg:text-5xl lg:leading-12 xl:text-6xl xl:leading-15"
        >
          Cymbals shaped by hand,
          <br /> built for sound.
        </h1>
        <p
          ref={subheadingRef}
          className="text-xs font-bold will-change-transform md:text-lg md:leading-6.75 lg:text-2xl lg:leading-9 xl:text-3xl xl:leading-11"
        >
          Auralis is a collection of hand-crafted cymbals made to{" "}
          <br className="hidden md:block" /> sound as unique as the drummers who
          play them.
        </p>
      </div>
    </section>
  );
}
