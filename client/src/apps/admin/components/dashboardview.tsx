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
import { Shield, ShieldCheck, User, UserCheck } from "lucide-react";
import type { DashboardData } from "@/types/user.types";

interface AdminDashboardViewProps {
  data: DashboardData;
}

const COLORS = [
  "#3b82f6",
  "#8b5cf6",
  "#06b6d4",
  "#10b981",
  "#f59e0b",
  "#ef4444",
];

const STATUS_COLORS: Record<string, string> = {
  Total: "#3b82f6",
  Active: "#10b981",
  Verified: "#8b5cf6",
  Inactive: "#ef4444",
};

export default function AdminDashboardView({ data }: AdminDashboardViewProps) {
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
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold text-gray-900">
              Admin Dashboard
            </h1>
            <p className="text-gray-600">
              Overview of user statistics and roles
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <DashStatCard
            label="Total Users"
            value={data.total_users}
            icon={<User size={40} />}
          />
          <DashStatCard
            label="Active Users"
            value={data.active_users}
            icon={<UserCheck size={40} />}
          />
          <DashStatCard
            label="Verified Users"
            value={data.verified_users}
            icon={<ShieldCheck size={40} />}
          />
          <DashStatCard
            label="Admins"
            value={data.users_by_role.admin}
            icon={<Shield size={40} />}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>User Status Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={statusData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value">
                    {statusData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={STATUS_COLORS[entry.name]}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Role Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={roleData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, value }) => `${name}: ${value}`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {roleData.map((_, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
