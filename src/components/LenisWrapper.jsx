import { ReactLenis } from "lenis/react";
import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function LenisWrapper({ children }) {
  const lenisRef = useRef();

  useEffect(() => {
    const update = (time) => {
      lenisRef.current?.lenis?.raf(time * 1000);
    };

    gsap.ticker.add(update);
    return () => gsap.ticker.remove(update);
  }, []);

  return (
    <ReactLenis ref={lenisRef} options={{ autoRaf: false }} root>
      {children}
    </ReactLenis>
  );
}
