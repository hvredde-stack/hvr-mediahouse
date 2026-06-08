import { requirePortalClient } from "@/lib/portal";
import { prisma } from "@/lib/prisma";
import { PortalShell } from "@/components/portal/PortalShell";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Client portal",
  robots: { index: false, follow: false },
};

export default async function PortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const portal = await requirePortalClient();
  const client = await prisma.client.findUnique({
    where: { id: portal.clientId },
    select: { name: true },
  });
  return (
    <PortalShell clientName={client?.name ?? "Your brand"}>
      {children}
    </PortalShell>
  );
}
