export function AboutSection() {
  return (
    <section className="relative grid h-[95svh] grid-cols-12 gap-6 px-12 py-24">
      <div className="absolute h-full w-full bg-[url('images/cymbal-finger.webp')] bg-right bg-no-repeat mix-blend-lighten" />
      <h2 className="font-heading col-span-7 text-8xl font-bold">
        Built for
        <br />
        players who
        <br />
        listen closely.
      </h2>
      <p className="col-span-full col-start-7 self-end text-2xl">
        Every Auralis cymbal is shaped to bring out a distinct voice — complex,
        musical, and responsive. We believe great sound comes from intention.
        From the alloy, the hammering, and the hands that shape it. Auralis
        exists for drummers who value feel and character over perfection.
      </p>
    </section>
  );
}
