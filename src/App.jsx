import { Environment, OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Header } from "./components/Header";
import { HeroSection } from "./components/HeroSection";

function App() {
  return (
    <>
      <Header />
      <HeroSection />
    </>
  );
}

export default App;
