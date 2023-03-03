interface ProjectWrapperProps {
  children: React.ReactNode;
}

export default function ProjectWrapper({ children }: ProjectWrapperProps) {
  return (
    <section className="grid grid-cols-1 gap-4 overflow-hidden rounded-xl bg-white/80 backdrop-blur-lg dark:bg-slate-900/80 md:grid-cols-2">
      {children}
    </section>
  );
}
