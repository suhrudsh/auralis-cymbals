import { Environment, OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Lights } from "./Lights";
import { HeroSectionScene } from "./HeroSectionScene";

function App() {
  return (
    <section className="h-[95svh]">
      <Canvas className="bg-white" camera={{ position: [0, 15.5, 0] }}>
        <Lights />
        <HeroSectionScene />
        <OrbitControls />
        <Environment preset="forest" environmentIntensity={0.05} />
      </Canvas>
    </section>
  );
}

export default App;
