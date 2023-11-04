interface MarqueeProps {
  text: string;
}

export function Marquee({ text }: MarqueeProps) {
  return (
    <div className="w-full overflow-hidden relative h-16 flex items-center bg-white/20">
      <div className="block w-[200%] absolute overflow-hidden marquee font-black text-3xl">
        {[...Array(10)].map((index: number) => (
          <span key={index} className="float-left w-[10%]">
            {text}
          </span>
        ))}
      </div>
    </div>
  );
}
