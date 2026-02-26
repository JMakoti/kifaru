import { Card, CardContent, CardTitle } from "@/components/ui/card";
import type { ReactNode } from "react";

interface DashStatCardProps {
  label: string;
  value: number;
  icon?: ReactNode;
}

const DashStatCard = ({ label, value, icon }: DashStatCardProps) => (
  <Card className="relative overflow-hidden">
    {icon && (
      <div className="absolute top-3 right-3 text-blue-500 opacity-10">
        {icon}
      </div>
    )}
    <CardContent className="pt-6">
      <CardTitle className="text-sm font-medium text-gray-600 mb-2">
        {label}
      </CardTitle>
      <div className="text-3xl font-bold text-gray-900">{value}</div>
    </CardContent>
  </Card>
);

export default DashStatCard;
