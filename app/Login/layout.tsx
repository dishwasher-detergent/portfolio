import { ChildWrapper } from "#/ui/animate/ChildWrapper";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ChildWrapper>
      <section className="py-4">{children}</section>
    </ChildWrapper>
  );
}
