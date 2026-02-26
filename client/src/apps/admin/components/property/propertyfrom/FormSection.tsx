import { cn } from "@/lib/utils";

interface FormSectionProps {
  title: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
}

export function FormSection({ title, description, children, className }: FormSectionProps) {
  return (
    <div className={cn("space-y-6 animate-fade-in", className)}>
      <div className="space-y-1">
        <h3 className="text-xl font-semibold text-foreground font-display">{title}</h3>
        {description && (
          <p className="text-sm text-muted-foreground">{description}</p>
        )}
      </div>
      <div className="space-y-5">{children}</div>
    </div>
  );
}
