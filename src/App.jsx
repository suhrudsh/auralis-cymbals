import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Lights } from "./Lights";
import { HeroSectionScene } from "./HeroSectionScene";

function App() {
  return (
    <section className="h-[95svh]">
      <Canvas className="bg-white" camera={{ position: [0, 16.5, 0] }}>
        <Lights />
        <HeroSectionScene />
        <OrbitControls />
      </Canvas>
    </section>
  );
}

export default App;
