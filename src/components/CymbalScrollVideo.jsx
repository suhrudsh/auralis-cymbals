import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

export function CymbalScrollVideo({ staticImageRef }) {
  const canvasRef = useRef(null);
  const imagesRef = useRef([]);
  const totalFrames = 60;
  const scrollLength = 1200; // ~3-6s of scroll

  function drawImageCover(ctx, img, canvas) {
    const canvasRatio = canvas.width / canvas.height;
    const imgRatio = img.width / img.height;

    let drawWidth, drawHeight, offsetX, offsetY;

    if (imgRatio > canvasRatio) {
      // Image is wider than canvas → crop sides
      drawHeight = canvas.height;
      drawWidth = img.width * (canvas.height / img.height);
      offsetX = (canvas.width - drawWidth) / 2;
      offsetY = 0;
    } else {
      // Image is taller than canvas → crop top/bottom
      drawWidth = canvas.width;
      drawHeight = img.height * (canvas.width / img.width);
      offsetX = 0;
      offsetY = (canvas.height - drawHeight) / 2;
    }

    ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
  }

  // preload all frames
  useEffect(() => {
    for (let i = 1; i <= totalFrames; i++) {
      const img = new Image();
      img.src = `cymbal-scroll-video/cymbal-scroll-video${i.toString().padStart(4, "0")}.webp`;
      imagesRef.current.push(img);
    }
    // once the first frame is loaded, draw it
    imagesRef.current[0].onload = () => {
      const ctx = canvasRef.current.getContext("2d");
      drawImageCover(ctx, imagesRef.current[0], canvasRef.current);
    };
  }, []);

  // set up canvas size + ScrollTrigger
  useEffect(() => {
    const canvas = canvasRef.current;
    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      // redraw current frame to fill new size
      const ctx = canvas.getContext("2d");
      const currentFrame = Math.floor(
        ((ScrollTrigger && ScrollTrigger.latestProgress) || 0) *
          (totalFrames - 1),
      );
      const img = imagesRef.current[currentFrame] || imagesRef.current[0];
      if (img.complete) ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    };
    setCanvasSize();
    window.addEventListener("resize", setCanvasSize);

    const trigger = ScrollTrigger.create({
      trigger: canvas,
      start: "top top",
      end: `+=${scrollLength}`,
      scrub: 1,
      onUpdate: (self) => {
        const frameIndex = Math.floor(self.progress * (totalFrames - 1));
        const img = imagesRef.current[frameIndex];
        if (!img || !img.complete || img.naturalWidth === 0) return;

        const ctx = canvas.getContext("2d");
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawImageCover(ctx, img, canvas);
      },
      onLeave: () => {
        canvas.style.opacity = 0;
        staticImageRef.current.style.display = "block";
      },
      onEnterBack: () => {
        canvas.style.opacity = 1;
        staticImageRef.current.style.display = "none";
      },
    });

    return () => {
      trigger.kill();
      window.removeEventListener("resize", setCanvasSize);
    };
  }, [staticImageRef]);

  return (
    <div style={{ height: window.innerHeight + scrollLength }} className="z-10">
      <canvas
        ref={canvasRef}
        className="sticky top-0 block h-screen w-full object-cover"
      />
    </div>
  );
}
