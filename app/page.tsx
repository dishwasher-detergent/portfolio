import { Corners } from "@/components/corners";
import { Project } from "@/components/project";
import { ChevronDown } from "lucide-react";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <div className="w-full h-screen p-12 relative">
        <div className="w-full h-full flex flex-col justify-center items-center bg-gradient-to-br from-white/50 to-transparent rounded-[3rem] md:rounded-[6rem] text-white relative z-10">
          <h1 className="font-display lg:text-8xl md:text-7xl sm:text-6xl text-4xl x">
            <span>Building Web Apps</span>
            <br />
            <span className="flex flex-row items-center gap-12">
              <span className="flex-none">For Fun.</span>
              <span className="h-2 flex-1 bg-white rounded-full" />
            </span>
          </h1>
          <div className="absolute bottom-0 w-full flex items-center justify-center">
            <a className="animate-bounce cursor-pointer">
              <ChevronDown className="w-12 h-12" strokeWidth={3} />
            </a>
          </div>
        </div>
        <Corners className="p-10" />
      </div>
      <div className="flex flex-col -space-y-1 p-10">
        <Project />
        <Project />
        <Project />
        <Project />
        <Project />
        <Project />
        <Project />
      </div>
    </main>
  );
}
