interface ExperienceWrapperProps {
  children: React.ReactNode;
}

export default function ExperienceWrapper({
  children,
}: ExperienceWrapperProps) {
  return (
    <section className="rounded-xl bg-white/80 backdrop-blur-lg dark:bg-slate-900/80">
      {children}
    </section>
  );
}
