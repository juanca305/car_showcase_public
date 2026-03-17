"use client";

import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  XAxis,
  YAxis,
} from "recharts";

type AdminStats = {
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

function renderPercentLabel({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  name,
}: any) {
  // Hide labels if slice is too small
  if (percent < 0.05) return null;

  const RADIAN = Math.PI / 180;
  const radius = innerRadius + (outerRadius - innerRadius) * 0.6;

  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="#FFFFFF"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
      fontSize={12}
      fontWeight={600}
    >
      {`${name} • ${(percent * 100).toFixed(0)}%`}
    </text>
  );
}

export default function AdminDashboardCharts({ stats }: { stats: AdminStats }) {
  const t = stats.totals;

  const visibleVsHiddenData = [
    { name: "Visible", value: t.visibleCars },
    { name: "Hidden", value: t.hiddenCars },
  ];

  const newVsUsedData = [
    { name: "New", value: t.newCars },
    { name: "Used", value: t.usedCars },
  ];

  const branchBarData = stats.byBranch.map((b) => ({
    branch: b.branch,
    activeCars: b.activeCars,
    visibleCars: b.visibleCars,
    certifiedCars: b.certifiedCars,
  }));

  const visibleHiddenColors = ["#3B82F6", "#A1A1AA"]; // Visible=blue, Hidden=gray
  const newUsedColors = ["#10B981", "#60A5FA"]; // New=green, Used=blue

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      {/* Visible vs Hidden */}
      <div className="lg:col-span-6 rounded-2xl border border-luxury-border bg-luxury-surface/80 overflow-hidden">
        <div className="px-6 py-4 border-b border-luxury-border">
          <h3 className="text-lg font-semibold text-luxury-text">
            Visible vs Hidden
          </h3>
          <p className="text-sm text-luxury-muted">
            Cars shown to customers vs hidden.
          </p>
        </div>

        <div className="p-6 h-[280px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={visibleVsHiddenData}
                dataKey="value"
                nameKey="name"
                outerRadius={90}
                label={renderPercentLabel}
                labelLine={false}
              >
                {/* {visibleVsHiddenData.map((_, index) => (
                                    <Cell key={index} />
                                ))} */}
                {visibleVsHiddenData.map((_, index) => (
                  <Cell
                    key={index}
                    fill={
                      visibleHiddenColors[index % visibleHiddenColors.length]
                    }
                  />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  background: "#0B0B0F",
                  border: "1px solid rgba(255,255,255,0.12)",
                  borderRadius: "14px",
                  padding: "10px 12px",
                  color: "#fff",
                }}
                labelStyle={{ color: "#E5E7EB", fontWeight: 600 }}
                itemStyle={{ color: "#E5E7EB" }}
              />

              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* New vs Used */}
      <div className="lg:col-span-6 rounded-2xl border border-luxury-border bg-luxury-surface/80 overflow-hidden">
        <div className="px-6 py-4 border-b border-luxury-border">
          <h3 className="text-lg font-semibold text-luxury-text">
            New vs Used
          </h3>
          <p className="text-sm text-luxury-muted">
            Inventory split by condition.
          </p>
        </div>

        <div className="p-6 h-[280px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={newVsUsedData}
                dataKey="value"
                nameKey="name"
                outerRadius={90}
                label={renderPercentLabel}
                labelLine={false}
              >
                {/* {newVsUsedData.map((_, index) => (
                                    <Cell key={index} />
                                ))} */}
                {newVsUsedData.map((_, index) => (
                  <Cell
                    key={index}
                    fill={newUsedColors[index % newUsedColors.length]}
                  />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  background: "#0B0B0F",
                  border: "1px solid rgba(255,255,255,0.12)",
                  borderRadius: "14px",
                  padding: "10px 12px",
                  color: "#fff",
                }}
                labelStyle={{ color: "#E5E7EB", fontWeight: 600 }}
                itemStyle={{ color: "#E5E7EB" }}
              />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Branch distribution */}
      <div className="lg:col-span-12 rounded-2xl border border-luxury-border bg-luxury-surface/80 overflow-hidden">
        <div className="px-6 py-4 border-b border-luxury-border">
          <h3 className="text-lg font-semibold text-luxury-text">
            Cars by Branch
          </h3>
          <p className="text-sm text-luxury-muted">
            Active / visible / certified distribution.
          </p>
        </div>

        <div className="p-6 h-[340px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={branchBarData}>
              <XAxis dataKey="branch" stroke="#A1A1AA" />
              <YAxis stroke="#A1A1AA" />
              <Tooltip
                contentStyle={{
                  background: "#0B0B0F",
                  border: "1px solid rgba(255,255,255,0.12)",
                  borderRadius: "14px",
                  padding: "10px 12px",
                  color: "#fff",
                }}
                labelStyle={{ color: "#E5E7EB", fontWeight: 600 }}
                //itemStyle={{ color: "#E5E7EB" }}
                cursor={{ fill: "rgba(255,255,255,0.05)" }}
              />
              <Legend />
              <Bar dataKey="activeCars" fill="#EAB308" /> {/* gold */}
              <Bar dataKey="visibleCars" fill="#3B82F6" /> {/* blue */}
              <Bar dataKey="certifiedCars" fill="#A855F7" /> {/* purple */}
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
