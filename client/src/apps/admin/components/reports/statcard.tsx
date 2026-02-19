import { type LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  accent?: boolean;
}

const StatCard = ({ title, value, subtitle, icon: Icon, accent }: StatCardProps) => (
  <div className={`rounded-lg border p-5 ${accent ? "bg-primary text-primary-foreground" : "bg-card text-card-foreground"}`}>
    <div className="flex items-center justify-between mb-3">
      <span className={`text-sm font-medium tracking-wide uppercase ${accent ? "text-primary-foreground/70" : "text-muted-foreground"}`}>
        {title}
      </span>
      <Icon className={`h-5 w-5 ${accent ? "text-primary-foreground/60" : "text-muted-foreground"}`} />
    </div>
    <p className="text-3xl font-bold tracking-tight">{value}</p>
    {subtitle && (
      <p className={`text-sm mt-1 ${accent ? "text-primary-foreground/60" : "text-muted-foreground"}`}>{subtitle}</p>
    )}
  </div>
);

export default StatCard;
