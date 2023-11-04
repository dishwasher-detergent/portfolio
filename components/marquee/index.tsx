interface MarqueeProps {
  text: string;
}

export function Marquee({ text }: MarqueeProps) {
  return (
    <section>
      <div className="relative flex overflow-hidden select-none gap-4 text-3xl font-black bg-slate-900/20 py-4">
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
    </section>
  );
}
