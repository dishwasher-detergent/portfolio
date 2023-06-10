interface ProjectWrapperProps {
  children: React.ReactNode;
}

export default function ProjectWrapper({ children }: ProjectWrapperProps) {
  return (
    <section className="flex flex-col gap-4 overflow-hidden rounded-xl bg-white/80 backdrop-blur-lg dark:bg-slate-900/80">
      {children}
    </section>
  );
}
