interface MarqueeProps {
  text: string;
}

export function Marquee({ text }: MarqueeProps) {
  return (
    <section className="py-4">
      <div className="relative flex overflow-hidden select-none gap-4 md:text-8xl text-6xl font-black text-white py-4">
        <ul className="flex-shrink-0 flex justify-around gap-4 min-w-full marquee">
          {[...Array(10)].map((index: number) => (
            <li key={index}>{text}</li>
          ))}
        </ul>

        <ul
          aria-hidden="true"
          className="flex-shrink-0 flex justify-around gap-4 min-w-full marquee"
        >
          {[...Array(10)].map((index: number) => (
            <li key={index}>{text}</li>
          ))}
        </ul>
      </div>
      <div className="relative flex overflow-hidden select-none gap-4 md:text-8xl text-6xl font-black text-white py-4 font-display">
        <ul className="flex-shrink-0 flex justify-around gap-4 min-w-full marquee reverse">
          {[...Array(10)].map((index: number) => (
            <li key={index}>{text}</li>
          ))}
        </ul>

        <ul
          aria-hidden="true"
          className="flex-shrink-0 flex justify-around gap-4 min-w-full marquee reverse"
        >
          {[...Array(10)].map((index: number) => (
            <li key={index}>{text}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}
