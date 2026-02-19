"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import DashStatCard from "./dashboard/adminstatscard";
import { LucideUserLock, ShieldCheck, User, UserCheck } from "lucide-react";

interface DashboardData {
  total_users: number;
  active_users: number;
  verified_users: number;
  users_by_role: {
    admin: number;
    staff: number;
    concierge: number;
    property_manager: number;
    external: number;
  };
}

const COLORS = [
  "#3b82f6",
  "#8b5cf6",
  "#06b6d4",
  "#10b981",
  "#f59e0b",
  "#ef4444",
];

export default function AdminDashboardView() {
  const data: DashboardData = {
    total_users: 5,
    active_users: 5,
    verified_users: 5,
    users_by_role: {
      admin: 1,
      staff: 0,
      concierge: 0,
      property_manager: 0,
      external: 4,
    },
  };

  const roleData = [
    { name: "Admin", value: data.users_by_role.admin },
    { name: "Staff", value: data.users_by_role.staff },
    { name: "Concierge", value: data.users_by_role.concierge },
    { name: "Property Manager", value: data.users_by_role.property_manager },
    { name: "External", value: data.users_by_role.external },
  ].filter((item) => item.value > 0);

  const statusData = [
    { name: "Total", value: data.total_users },
    { name: "Active", value: data.active_users },
    { name: "Verified", value: data.verified_users },
    { name: "Inactive", value: data.total_users - data.active_users },
  ];

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-foreground mb-2">
          Admin Dashboard
        </h1>
        <p className="text-sm text-muted-foreground">
          Overview of user statistics and roles
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-8">
        <DashStatCard
          label="Total Users"
          value={data.total_users}
          icon={<User className="h-6 w-6" />}
        />
        <DashStatCard
          label="Active Users"
          value={data.active_users}
          icon={<UserCheck className="h-6 w-6" />}
        />
        <DashStatCard
          label="Verified Users"
          value={data.verified_users}
          icon={<ShieldCheck className="h-6 w-6" />}
        />
        <DashStatCard
          label="Administrators"
          value={data.users_by_role.admin}
          icon={<LucideUserLock className="h-6 w-6" />}
        />
      </div>

      {/* Charts */}
      <div className="grid gap-6 lg:grid-cols-2 mb-8">
        {/* User Status Chart */}
        <Card className="rounded-lg border border-border bg-card p-6 shadow-sm">
          <CardHeader>
            <CardTitle className="text-foreground">
              User Status Overview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={statusData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis
                  dataKey="name"
                  tick={{ fill: "var(--muted-foreground)", fontSize: 12 }}
                />
                <YAxis
                  tick={{ fill: "var(--muted-foreground)", fontSize: 12 }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "var(--card)",
                    border: "1px solid var(--border)",
                    borderRadius: "var(--radius)",
                  }}
                />
                <Bar dataKey="value" fill="#3b82f6" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Role Distribution Chart */}
        <Card className="rounded-lg border border-border bg-card p-6 shadow-sm">
          <CardHeader>
            <CardTitle className="text-foreground">Role Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={roleData}
                  dataKey="value"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  label={({ name, value }) => `${name}: ${value}`}
                >
                  {roleData.map((_, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "var(--card)",
                    border: "1px solid var(--border)",
                    borderRadius: "var(--radius)",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
