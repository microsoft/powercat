import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { CheckSquare, Rocket, ChevronRight } from "lucide-react";
import { ImplementationChecklist } from "@shared/schema";

interface ImplementationChecklistProps {
  checklist: ImplementationChecklist;
  onViewStructure: () => void;
}

export function ImplementationChecklistComponent({ checklist, onViewStructure }: ImplementationChecklistProps) {
  return (
    <div className="fade-in">
      <Card>
        <CardContent className="p-8">
          <h2 className="text-3xl font-bold text-foreground mb-6 text-center flex items-center justify-center">
            <CheckSquare className="text-primary mr-3" />
            Implementation Checklist
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            {/* Pre-Development */}
            <div className="bg-accent rounded-lg p-6">
              <h3 className="text-xl font-semibold text-accent-foreground mb-4 flex items-center">
                <CheckSquare className="text-primary mr-2" />
                Pre-Development
              </h3>
              <ul className="space-y-3" data-testid="predev-checklist">
                {checklist.predev.map((item, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <Checkbox 
                      className="mt-1" 
                      data-testid={`predev-item-${index}`}
                    />
                    <span className="text-accent-foreground text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Post-Development */}
            <div className="bg-accent rounded-lg p-6">
              <h3 className="text-xl font-semibold text-accent-foreground mb-4 flex items-center">
                <Rocket className="text-primary mr-2" />
                Post-Development
              </h3>
              <ul className="space-y-3" data-testid="postdev-checklist">
                {checklist.postdev.map((item, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <Checkbox 
                      className="mt-1" 
                      data-testid={`postdev-item-${index}`}
                    />
                    <span className="text-accent-foreground text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="text-center mt-8">
            <Button onClick={onViewStructure} size="lg" data-testid="button-view-structure">
              Plan Agent Structure
              <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
