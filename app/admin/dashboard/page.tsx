import Link from "next/link";
import AdminDashboardCharts from "../components/AdminDashboardCharts";

type AdminStatsResponse = {
  data: {
    totals: {
      totalCars: number;
      activeCars: number;
      trashCars: number;
      visibleCars: number;
      hiddenCars: number;
      newCars: number;
      usedCars: number;
      certifiedCars: number;
    };
    byBranch: {
      branch: string;
      activeCars: number;
      visibleCars: number;
      hiddenCars: number;
      newCars: number;
      usedCars: number;
      certifiedCars: number;
    }[];
  };
};

async function getAdminStats(): Promise<AdminStatsResponse["data"]> {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;
  const adminKey = process.env.ADMIN_API_KEY; // ✅ server-only key

  if (!baseUrl) throw new Error("Missing NEXT_PUBLIC_API_URL");
  if (!adminKey) throw new Error("Missing ADMIN_API_KEY");

  const url = `${baseUrl}/api/admin/dashboard/stats`;

  const res = await fetch(url, {
    method: "GET",
    headers: {
      "x-api-key": adminKey, // ✅ use the correct key
    },
    cache: "no-store",
  });

  const json = await res.json().catch(() => null);

  if (!res.ok) {
    console.log("❌ Admin stats failed:", {
      url,
      status: res.status,
      statusText: res.statusText,
      response: json,
    });

    throw new Error(
      json?.message || `Failed to fetch admin stats (${res.status})`
    );
  }

  return json.data;
}

export default async function AdminDashboardPage() {
  const stats = await getAdminStats();

  const t = stats.totals;

  return (
    <main className="pt-[96px]">
      <section className="max-width padding-x padding-y">
        {/* HEADER */}
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between mb-8">
          <div>
            <h1 className="text-2xl font-semibold text-luxury-text">
              Admin Dashboard
            </h1>
            <p className="text-sm text-luxury-muted">
              Quick overview of inventory health, visibility, and performance.
            </p>
          </div>

          <div className="flex gap-3">
            <Link
              href="/admin/cars"
              className="
                px-4 py-2 rounded-xl text-sm font-medium
                border border-luxury-border
                bg-black/30 text-luxury-text
                hover:bg-white/5 transition
              "
            >
              Manage Inventory
            </Link>

            <Link
              href="/admin/cars/trash"
              className="
                px-4 py-2 rounded-xl text-sm font-medium
                border border-red-500/30
                bg-red-500/10 text-red-300
                hover:bg-red-500/15 transition
              "
            >
              Trash
            </Link>
          </div>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* LEFT COLUMN */}
          <div className="lg:col-span-8 flex flex-col gap-6">
            {/* KPI CARDS */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
              <DashboardCard
                label="Total Cars"
                value={t.totalCars.toLocaleString()}
                hint="All inventory records"
              />
              <DashboardCard
                label="Active Cars"
                value={t.activeCars.toLocaleString()}
                hint="Currently in inventory"
              />
              <DashboardCard
                label="Visible Cars"
                value={t.visibleCars.toLocaleString()}
                hint="Shown to customers"
              />
              <DashboardCard
                label="Trash Cars"
                value={t.trashCars.toLocaleString()}
                hint="Soft-deleted units"
                variant="danger"
              />
            </div>

            
            <AdminDashboardCharts stats={stats} />
    

            {/* BRANCH BREAKDOWN */}
            <div className="rounded-2xl border border-luxury-border bg-luxury-surface/80 overflow-hidden">
              <div className="px-6 py-4 border-b border-luxury-border">
                <h2 className="text-lg font-semibold text-luxury-text">
                  Inventory by Branch
                </h2>
                <p className="text-sm text-luxury-muted">
                  Active, visible, hidden, new, used, certified.
                </p>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-black/30 text-luxury-muted">
                    <tr>
                      <th className="px-6 py-3 text-left">Branch</th>
                      <th className="px-6 py-3 text-left">Active</th>
                      <th className="px-6 py-3 text-left">Visible</th>
                      <th className="px-6 py-3 text-left">Hidden</th>
                      <th className="px-6 py-3 text-left">New</th>
                      <th className="px-6 py-3 text-left">Used</th>
                      <th className="px-6 py-3 text-left">Certified</th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-white/5">
                    {stats.byBranch.map((b) => (
                      <tr key={b.branch} className="hover:bg-white/5 transition">
                        <td className="px-6 py-4 text-luxury-text font-medium">
                          {b.branch}
                        </td>
                        <td className="px-6 py-4 text-luxury-text">
                          {b.activeCars}
                        </td>
                        <td className="px-6 py-4 text-blue-300">
                          {b.visibleCars}
                        </td>
                        <td className="px-6 py-4 text-zinc-400">
                          {b.hiddenCars}
                        </td>
                        <td className="px-6 py-4 text-emerald-300">
                          {b.newCars}
                        </td>
                        <td className="px-6 py-4 text-luxury-text">
                          {b.usedCars}
                        </td>
                        <td className="px-6 py-4 text-luxury-accent">
                          {b.certifiedCars}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            {/* QUICK ACTIONS */}
            <div className="rounded-2xl border border-luxury-border bg-luxury-surface/80 overflow-hidden">
              <div className="px-6 py-4 border-b border-luxury-border">
                <h2 className="text-lg font-semibold text-luxury-text">
                  Quick Actions
                </h2>
                <p className="text-sm text-luxury-muted">
                  Common admin operations.
                </p>
              </div>

              <div className="p-4 flex flex-col gap-3">
                <QuickAction
                  title="Add New Vehicle"
                  description="Create a new unit in the inventory."
                  href="/admin/cars/new"
                />
                <QuickAction
                  title="View Inventory"
                  description="Edit, hide, or delete cars."
                  href="/admin/cars"
                />
                <QuickAction
                  title="Review Trash"
                  description="Restore or delete permanently."
                  href="/admin/cars/trash"
                  danger
                />
              </div>
            </div>

            {/* EXTRA KPI BLOCK */}
            <div className="rounded-2xl border border-luxury-border bg-luxury-surface/80 overflow-hidden">
              <div className="px-6 py-4 border-b border-luxury-border">
                <h2 className="text-lg font-semibold text-luxury-text">
                  Inventory Quality
                </h2>
                <p className="text-sm text-luxury-muted">
                  Condition & certification metrics.
                </p>
              </div>

              <div className="p-6 flex flex-col gap-3 text-sm">
                <Row label="New Cars" value={t.newCars} />
                <Row label="Used Cars" value={t.usedCars} />
                <Row label="Certified Cars" value={t.certifiedCars} />
                <Row label="Hidden Cars" value={t.hiddenCars} />
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

/* ---------------------------
   UI Components
---------------------------- */

function DashboardCard({
  label,
  value,
  hint,
  variant = "default",
}: {
  label: string;
  value: string;
  hint: string;
  variant?: "default" | "danger";
}) {
  return (
    <div
      className={`
        rounded-2xl border bg-luxury-surface/80 p-5
        ${variant === "danger" ? "border-red-500/30" : "border-luxury-border"}
      `}
    >
      <p className="text-xs text-luxury-muted">{label}</p>

      <p
        className={`
          mt-2 text-2xl font-semibold
          ${variant === "danger" ? "text-red-300" : "text-luxury-text"}
        `}
      >
        {value}
      </p>

      <p className="mt-2 text-xs text-luxury-muted/80">{hint}</p>
    </div>
  );
}

function QuickAction({
  title,
  description,
  href,
  danger = false,
}: {
  title: string;
  description: string;
  href: string;
  danger?: boolean;
}) {
  return (
    <Link
      href={href}
      className={`
        w-full rounded-xl border p-4 transition
        ${danger ? "border-red-500/30 bg-red-500/10" : "border-white/10 bg-black/20"}
        hover:bg-white/5
      `}
    >
      <div className="flex flex-col gap-1">
        <span
          className={`text-sm font-medium ${
            danger ? "text-red-300" : "text-luxury-text"
          }`}
        >
          {title}
        </span>
        <span className="text-xs text-luxury-muted">{description}</span>
      </div>
    </Link>
  );
}

function Row({ label, value }: { label: string; value: number }) {
  return (
    <div className="flex items-center justify-between border-b border-white/5 pb-2">
      <span className="text-luxury-muted">{label}</span>
      <span className="text-luxury-text font-medium">{value}</span>
    </div>
  );
}

