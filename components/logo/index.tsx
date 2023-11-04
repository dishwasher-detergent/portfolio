export function Logo() {
  return (
    <div className="relative w-24 h-24 md:w-32 md:h-32 grid place-items-center p-2 m-2">
      <div className="absolute inset-0 grid place-items-center">
        <h1 className="font-display text-3xl md:text-5xl">KB</h1>
      </div>
      <svg
        className="w-full h-full font-bold animate-spin-slow duration-1000"
        viewBox="0 0 100 100"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
      >
        <path
          id="circlePath"
          d="M 10, 50
            a 40,40 0 1,1 80,0
            40,40 0 1,1 -80,0"
        />
        <text fill="#fff">
          <textPath href="#circlePath">Kenneth Bass</textPath>
        </text>
      </svg>
    </div>
  );
}
