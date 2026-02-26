import { type LucideIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface ReportCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  href?: string;
}

const ReportCard = ({
  title,
  description,
  icon: Icon,
  href,
}: ReportCardProps) => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => href && navigate(href)}
      className="flex items-center gap-4 rounded-lg border bg-card p-5 text-left transition-all hover:shadow-md hover:border-primary/20 group"
    >
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-muted group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
        <Icon className="h-6 w-6" />
      </div>
      <div>
        <p className="font-semibold text-card-foreground">{title}</p>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </button>
  );
};

export default ReportCard;
