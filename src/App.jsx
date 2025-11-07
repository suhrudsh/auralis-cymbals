import { Environment, OrbitControls } from "@react-three/drei";
import { AboutSection } from "./components/AboutSection";
import { Header } from "./components/Header";
import { HeroSection } from "./components/HeroSection";

function App() {
  return (
    <>
      <Header />
      <HeroSection />
      <AboutSection />
    </>
  );
}

export default App;
