import { redirect } from "next/navigation";
import { isAuthenticated } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { AdminDashboard } from "@/components/admin/AdminDashboard";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Admin · Leads",
  robots: { index: false, follow: false },
};

export default async function AdminPage() {
  if (!(await isAuthenticated())) {
    redirect("/admin/login");
  }

  try {
    const leads = await prisma.lead.findMany({
      orderBy: { createdAt: "desc" },
    });

    const data = leads.map((l) => ({
      ...l,
      createdAt: l.createdAt.toISOString(),
      updatedAt: l.updatedAt.toISOString(),
    }));

    return <AdminDashboard leads={data} />;
  } catch (err) {
    // No database configured (e.g. on Vercel without DATABASE_URL) — render the
    // dashboard with a clear banner instead of a 500.
    console.error("[admin] failed to load leads:", err);
    return <AdminDashboard leads={[]} dbError />;
  }
}
