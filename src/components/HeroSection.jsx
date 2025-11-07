import { Environment, OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Lights } from "./Lights";
import { HeroSectionScene } from "./HeroSectionScene";

export function HeroSection() {
  return (
    <section className="relative h-[95svh]">
      <div className="absolute -z-10 h-full w-full">
        <Canvas
          camera={{
            position: [0, 15.5, 0],
          }}
        >
          <Lights />
          <Environment preset="forest" environmentIntensity={0.05} />
          <HeroSectionScene />
          {/* <OrbitControls /> */}
        </Canvas>
      </div>
      <div className="to-bg flex h-full w-full flex-col items-center justify-center gap-8 bg-linear-to-b from-transparent from-60% text-center">
        <h1 className="font-heading text-6xl font-black">
          Cymbals shaped by hand,
          <br /> built for sound.
        </h1>
        <p className="font-body text-3xl leading-11 font-bold">
          Auralis is a collection of hand-crafted cymbals made to <br /> sound
          as unique as the drummers who play them.
        </p>
      </div>
    </section>
  );
}
