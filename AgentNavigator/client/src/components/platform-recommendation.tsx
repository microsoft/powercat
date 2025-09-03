import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Lightbulb, TrendingUp, ChevronRight, CheckCircle, Info } from "lucide-react";
import { Platform } from "@shared/schema";

interface PlatformRecommendationProps {
  platform: Platform;
  onViewImplementation: () => void;
}

export function PlatformRecommendation({ platform, onViewImplementation }: PlatformRecommendationProps) {
  return (
    <div className="fade-in">
      <Card>
        <CardContent className="p-8">
          <div className="text-center mb-8">
            <Lightbulb className="text-yellow-500 text-4xl mb-4 mx-auto" size={64} />
            <h2 className="text-3xl font-bold text-foreground mb-4">Your Recommendation</h2>
          </div>
          
          <div className="bg-accent rounded-lg p-6 mb-6" data-testid="recommended-platform">
            <div className="text-center mb-6">
              <div className={`text-${platform.color}-500 text-5xl mb-4`}>
                <div className="w-16 h-16 mx-auto bg-primary rounded-full flex items-center justify-center">
                  <div className="text-primary-foreground text-2xl font-bold">
                    {platform.name.charAt(0)}
                  </div>
                </div>
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-2">{platform.name}</h3>
              <p className="text-muted-foreground">{platform.description}</p>
            </div>
            
            <div className="bg-card rounded-lg p-4 border border-border">
              <h4 className="font-semibold text-foreground mb-2">Key Benefits for Your Use Case:</h4>
              <ul className="space-y-2">
                {platform.benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-muted-foreground">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          <div className="bg-muted rounded-lg p-6" data-testid="reasoning-section">
            <h3 className="text-xl font-semibold text-foreground mb-4 flex items-center">
              <TrendingUp className="text-primary mr-2" />
              Why This Recommendation?
            </h3>
            <ul className="space-y-3">
              {platform.reasoning.map((reason, index) => (
                <li key={index} className="flex items-start space-x-2">
                  <CheckCircle className="text-green-500 mt-1 flex-shrink-0" size={16} />
                  <span className="text-muted-foreground">{reason}</span>
                </li>
              ))}
            </ul>
            
            <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-950 rounded-lg border border-blue-200 dark:border-blue-800">
              <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-2 flex items-center">
                <Info className="mr-2" size={16} />
                Next Steps
              </h4>
              <p className="text-blue-800 dark:text-blue-200 text-sm">
                Proceed to the implementation checklist to start planning your agent development process.
              </p>
            </div>
          </div>

          <div className="text-center mt-8">
            <Button onClick={onViewImplementation} size="lg" data-testid="button-view-implementation">
              View Implementation Guide
              <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
