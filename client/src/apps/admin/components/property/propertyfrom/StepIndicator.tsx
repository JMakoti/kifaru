import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface Step {
  id: string;
  label: string;
  icon: React.ReactNode;
}

interface StepIndicatorProps {
  steps: Step[];
  currentStep: number;
  onStepClick?: (index: number) => void;
}

export function StepIndicator({ steps, currentStep, onStepClick }: StepIndicatorProps) {
  return (
    <div className="relative">
      {/* Progress bar */}
      <div className="absolute top-4 left-0 right-0 h-0.5 bg-muted">
        <div 
          className="h-full bg-primary transition-all duration-500 ease-out"
          style={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
        />
      </div>
      
      {/* Steps */}
      <div className="relative flex justify-between">
        {steps.map((step, index) => {
          const isCompleted = index < currentStep;
          const isCurrent = index === currentStep;
          const isClickable = index <= currentStep;
          
          return (
            <button
              key={step.id}
              onClick={() => isClickable && onStepClick?.(index)}
              disabled={!isClickable}
              className={cn(
                "flex flex-col items-center gap-2 transition-all duration-200",
                isClickable ? "cursor-pointer" : "cursor-not-allowed"
              )}
            >
              <div
                className={cn(
                  "relative z-10 flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium transition-all duration-300",
                  isCompleted && "bg-primary text-primary-foreground",
                  isCurrent && "bg-primary text-primary-foreground ring-4 ring-primary/20",
                  !isCompleted && !isCurrent && "bg-muted text-muted-foreground"
                )}
              >
                {isCompleted ? (
                  <Check className="w-4 h-4" />
                ) : (
                  <span className="text-xs">{step.icon}</span>
                )}
              </div>
              <span
                className={cn(
                  "text-xs font-medium transition-colors hidden sm:block",
                  isCurrent ? "text-primary" : "text-muted-foreground"
                )}
              >
                {step.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
