import { ChildWrapper } from "#/ui/animate/ChildWrapper";

export default function ProjectLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ChildWrapper>{children}</ChildWrapper>;
}
