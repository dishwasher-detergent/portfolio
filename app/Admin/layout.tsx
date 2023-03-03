import { ChildWrapper } from "#/ui/animate/ChildWrapper";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ChildWrapper>
      <div className="flex h-screen w-screen flex-row flex-nowrap overflow-hidden">
        {children}
      </div>
    </ChildWrapper>
  );
}
