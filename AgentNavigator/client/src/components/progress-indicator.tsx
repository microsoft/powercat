import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProgressIndicatorProps {
  currentStep: number;
}

const steps = [
  { id: 1, label: 'Assessment' },
  { id: 2, label: 'Recommendation' },
  { id: 3, label: 'Implementation' },
  { id: 4, label: 'Structure' }
];

export function ProgressIndicator({ currentStep }: ProgressIndicatorProps) {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-center space-x-4 mb-4">
        {steps.map((step, index) => (
          <div key={step.id} className="flex items-center">
            <div className="flex items-center space-x-2">
              <div 
                className={cn(
                  "step-indicator w-10 h-10 rounded-full flex items-center justify-center font-medium transition-all duration-300",
                  index < currentStep && "step-completed",
                  index === currentStep && "step-active bg-primary text-primary-foreground",
                  index > currentStep && "bg-muted text-muted-foreground"
                )}
                data-testid={`step-indicator-${step.id}`}
              >
                {index < currentStep ? (
                  <Check className="w-5 h-5" />
                ) : (
                  step.id
                )}
              </div>
              <span className="text-sm font-medium text-muted-foreground">
                {step.label}
              </span>
            </div>
            {index < steps.length - 1 && (
              <div className="w-16 h-0.5 bg-border ml-4" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
