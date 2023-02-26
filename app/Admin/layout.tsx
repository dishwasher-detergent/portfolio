import { ChildWrapper } from "#/ui/animate/ChildWrapper";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ChildWrapper>
      <section className="flex h-full w-full flex-col gap-4 py-4 md:flex-row">
        {children}
      </section>
    </ChildWrapper>
  );
}
