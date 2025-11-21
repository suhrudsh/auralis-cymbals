export function CTASection() {
  return (
    <section className="bg-accent flex flex-col items-center justify-center gap-8 p-24">
      <div className="flex flex-col gap-4">
        <h2 className="font-heading text-center text-8xl font-bold">
          Auralis is about
          <br />
          sound with soul
        </h2>
        <p className="text-center text-4xl leading-13">
          Made by hand, shaped by time, built
          <br />
          for players who care about feel.
        </p>
      </div>
      <a
        href=""
        className="bg-text text-bg border-text hover:text-text border-2 px-4 py-2 transition-colors duration-300 ease-in-out hover:bg-transparent"
      >
        Join Waitlist
      </a>
    </section>
  );
}
