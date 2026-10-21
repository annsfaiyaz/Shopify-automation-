import { PageHeader } from "@/components/page-header";

export default function InnerLayout({ children }: LayoutProps<"/">) {
  return (
    <>
      <PageHeader />
      <main>{children}</main>
    </>
  );
}
