export default function ProjectLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="flex h-full w-full flex-col gap-4 md:flex-row">
      {children}
    </section>
  );
}
