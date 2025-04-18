import type React from "react"
import { AdminShell } from "@/components/admin/admin-shell"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Admin Dashboard | Reference Services Inc.",
  description: "Admin dashboard for Reference Services Inc.",
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <AdminShell>{children}</AdminShell>
}
