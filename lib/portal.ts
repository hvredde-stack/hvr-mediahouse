import { redirect } from "next/navigation";
import { getSessionUser } from "@/lib/auth";

export type PortalClient = {
  id: string;
  name: string;
  email: string;
  clientId: string;
};

/** Guard for the client portal: returns the client user or redirects. */
export async function requirePortalClient(): Promise<PortalClient> {
  const user = await getSessionUser();
  if (!user) redirect("/portal/login");
  if (user.role !== "client" || !user.clientId) redirect("/admin");
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    clientId: user.clientId,
  };
}
