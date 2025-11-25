import { useLenis } from "lenis/react";

export function Footer() {
  const lenis = useLenis();

  return (
    <footer className="bg-text text-bg flex flex-col items-center justify-between gap-6 px-4 py-24 text-center md:px-12 md:text-lg lg:flex-row lg:text-left xl:text-xl">
      <img
        src="images/auralis-logo-dark.webp"
        alt="Auralis Logo"
        className="w-36 md:w-40 lg:w-44 xl:w-48"
      />
      <nav className="flex flex-col">
        <a
          className="underline-offset-2 hover:underline"
          href="#about-us"
          onClick={() => lenis.scrollTo("#about-us")}
        >
          About Us
        </a>
        <a
          className="underline-offset-2 hover:underline"
          href="#how-its-made"
          onClick={() => lenis.scrollTo("#how-its-made")}
        >
          How It's Made
        </a>
        <a
          className="underline-offset-2 hover:underline"
          href="#the-collection"
          onClick={() => lenis.scrollTo("#the-collection")}
        >
          The Collection
        </a>
      </nav>
      <div className="flex flex-col gap-4">
        <p>
          Auralis Cymbals is a concept.
          <br />
          An exploration in design fiction.
        </p>
        <p>
          This concept website was
          <br />
          designed and developed by
          <br />
          <a
            target="_blank"
            href="https://suhrud.vercel.app"
            className="font-bold underline-offset-2 hover:underline"
          >
            Suhrud Shringarputale.
          </a>
        </p>
      </div>
    </footer>
  );
}
