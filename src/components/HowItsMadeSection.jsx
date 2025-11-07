export function HowItsMadeSection() {
  return (
    <section className="px-12 py-24">
      <h2 className="font-heading col-span-full mb-16 text-center text-8xl font-bold">
        Made by hand. <br /> Made to last.
      </h2>
      <div className="col-span-full grid grid-cols-24 gap-6 text-4xl">
        <img
          src="images/bronze-sheet.webp"
          alt=""
          className="col-span-10 col-start-3 row-span-5 row-start-1"
        />
        <p className="col-span-10 col-start-12 row-start-2">
          Each cymbal starts as a B20 bronze
          <br />
          blank — a mix of copper and tin
          <br />
          known for its musical range.
        </p>
        <img
          src="images/bronze-sheet-hammer.webp"
          alt=""
          className="col-span-10 col-start-13 row-span-5 row-start-4"
        />
        <p className="col-span-10 col-start-8 row-start-6 translate-y-12">
          From there, it’s heated, hammered,
          <br />
          and lathed by hand until the
          <br />
          surface begins to sing.
        </p>
        <img
          src="images/cymbals-on-stands.webp"
          alt=""
          className="col-span-10 col-start-3 row-span-5 row-start-8"
        />
        <p className="col-span-10 col-start-12 row-start-10">
          No two cymbals are identical. Subtle variations in hammer marks and
          thickness give each one its own tone and feel.
        </p>
      </div>
    </section>
  );
}
