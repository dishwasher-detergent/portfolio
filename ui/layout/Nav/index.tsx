import Button from "#/ui/Button";
import Link from "next/link";
import { Github, Linkedin, Codepen } from "lucide-react";

export default function Nav() {
  return (
    <div className="h-16 w-full sticky top-0 bg-white opacity-70 backdrop-blur-lg border-b border-slate-300">
      <div className="max-w-[90rem] h-full flex flex-row justify-between mx-auto items-center px-4 sm:px-6 md:px-8">
        <Link href={"/"} className="font-black display">
          Kenneth Bass
        </Link>
        <nav className="flex flex-row">
          <ul className="flex flex-row gap-2 px-2 border-r border-slate-300 dark:border-slate-700">
            <li>
              <Button type="Link" href="Projects">
                Projects
              </Button>
            </li>
            <li>
              <Button type="Link" href="Contact">
                Contact
              </Button>
            </li>
          </ul>
          <ul className="flex flex-row gap-2 px-2">
            <li>
              <Button type="Link" href="Projects">
                <Github size={20} />
              </Button>
            </li>
            <li>
              <Button type="Link" href="Projects">
                <Linkedin size={20} />
              </Button>
            </li>
            <li>
              <Button type="Link" href="Projects">
                <Codepen size={20} />
              </Button>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}
