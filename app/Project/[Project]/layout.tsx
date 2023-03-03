import { ChildWrapper } from "#/ui/animate/ChildWrapper";
import Layout from "#/ui/layout/Layout";

export default function ProjectLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ChildWrapper>
      <Layout>{children}</Layout>
    </ChildWrapper>
  );
}
