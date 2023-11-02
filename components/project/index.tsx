import { Corners } from "../corners";

export function Project() {
  return (
    <a className="relative w-full h-60 flex flex-row items-center group cursor-pointer p-4">
      <div className="h-full w-0 bg-white/20 rounded-3xl group-hover:w-80 group-hover:mr-6 transition-all"></div>
      <p className="text-9xl font-display truncate">Project</p>
      <Corners />
    </a>
  );
}
