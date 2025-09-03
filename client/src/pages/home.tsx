import { useState } from "react";
import { ProgressIndicator } from "@/components/progress-indicator";
import { WelcomeSection, AssessmentQuestionnaire } from "@/components/assessment-questionnaire";
import { PlatformRecommendation } from "@/components/platform-recommendation";
import { ImplementationChecklistComponent } from "@/components/implementation-checklist";
import { AgentStructure } from "@/components/agent-structure";
import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";
import { determinePlatform } from "@/lib/platform-logic";
import { implementationChecklists } from "@/lib/implementation-data";
import { Answers, Platform } from "@shared/schema";

export default function Home() {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [recommendedPlatform, setRecommendedPlatform] = useState<Platform | null>(null);
  const [isDark, setIsDark] = useState(false);

  const handleStartAssessment = () => {
    setCurrentStep(1);
  };

  const handleAssessmentComplete = (assessmentAnswers: Answers) => {
    setAnswers(assessmentAnswers);
    const platform = determinePlatform(assessmentAnswers);
    setRecommendedPlatform(platform);
    setCurrentStep(2);
  };

  const handleViewImplementation = () => {
    setCurrentStep(3);
  };

  const handleViewStructure = () => {
    setCurrentStep(4);
  };

  const handleRestart = () => {
    setCurrentStep(0);
    setAnswers({});
    setRecommendedPlatform(null);
  };

  const handleExport = () => {
    // Generate export data
    const exportData = {
      platform: recommendedPlatform,
      answers,
      checklist: recommendedPlatform ? implementationChecklists[recommendedPlatform.id] : null,
      exportDate: new Date().toISOString()
    };
    
    // Create and download JSON file
    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `agent-platform-plan-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <div className="bg-background text-foreground min-h-screen">
      {/* Header */}
      <header className="bg-card border-b border-border">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="text-primary text-2xl font-bold">M</div>
              <h1 className="text-xl font-semibold text-foreground">Agent Platform Decision Tool</h1>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleTheme}
              data-testid="button-theme-toggle"
            >
              {isDark ? <Sun size={16} /> : <Moon size={16} />}
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8 max-w-4xl">
        <ProgressIndicator currentStep={currentStep} />

        {currentStep === 0 && (
          <WelcomeSection onStart={handleStartAssessment} />
        )}

        {currentStep === 1 && (
          <AssessmentQuestionnaire onComplete={handleAssessmentComplete} />
        )}

        {currentStep === 2 && recommendedPlatform && (
          <PlatformRecommendation 
            platform={recommendedPlatform} 
            onViewImplementation={handleViewImplementation} 
          />
        )}

        {currentStep === 3 && recommendedPlatform && (
          <ImplementationChecklistComponent 
            checklist={implementationChecklists[recommendedPlatform.id]} 
            onViewStructure={handleViewStructure} 
          />
        )}

        {currentStep === 4 && (
          <AgentStructure 
            onRestart={handleRestart} 
            onExport={handleExport} 
          />
        )}
      </main>
    </div>
  );
}
