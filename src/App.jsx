import { CollectionSection } from "./components/CollectionSection";
import { HowItsMadeSection } from "./components/HowItsMadeSection";
import { AboutSection } from "./components/AboutSection";
import { Header } from "./components/Header";
import { HeroSection } from "./components/HeroSection";
import LenisWrapper from "./components/LenisWrapper";

function App() {
  return (
    <>
      <LenisWrapper />
      <Header />
      <HeroSection />
      <AboutSection />
      <HowItsMadeSection />
      <CollectionSection />
    </>
  );
}

export default App;
