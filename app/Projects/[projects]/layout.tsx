export default function ProjectLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="w-full h-full flex flex-col md:flex-row gap-4">
      {children}
    </section>
  );
}
