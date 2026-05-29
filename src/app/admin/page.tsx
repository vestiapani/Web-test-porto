// src/app/admin/page.tsx
import { createClient } from "../../lib/supabase-ssr";
import AdminDashboardClient from "./AdminDashboardClient";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  const supabase = await createClient();

  const { data: projects, error } = await supabase
    .from("projects")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Supabase error fetching projects:", error);
    // UI error...
  }

  return (
    // Lempar data ke Client Component
    <AdminDashboardClient initialProjects={projects || []} />
  );
}
