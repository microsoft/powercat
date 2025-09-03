import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Bot } from "lucide-react";
import { useAssessment } from "@/hooks/use-assessment";
import { cn } from "@/lib/utils";

interface AssessmentQuestionnaireProps {
  onComplete: (answers: any) => void;
}

export function AssessmentQuestionnaire({ onComplete }: AssessmentQuestionnaireProps) {
  const {
    currentQuestion,
    currentQuestionIndex,
    answers,
    hasAnswer,
    isFirstQuestion,
    isLastQuestion,
    updateAnswer,
    nextQuestion,
    previousQuestion,
    questions
  } = useAssessment();

  const handleNext = () => {
    const completed = nextQuestion();
    if (completed) {
      onComplete(answers);
    }
  };

  const handleOptionSelect = (optionId: string) => {
    updateAnswer(currentQuestion.id as any, optionId);
  };

  if (!currentQuestion) {
    return null;
  }

  return (
    <div className="fade-in">
      <Card>
        <CardContent className="p-8">
          <div className="mb-6">
            <h3 className="text-2xl font-bold text-foreground mb-2">
              {currentQuestion.title}
            </h3>
            <p className="text-muted-foreground">{currentQuestion.subtitle}</p>
          </div>
          
          <div className="space-y-4">
            {currentQuestion.options.map((option) => (
              <div
                key={option.id}
                className={cn(
                  "platform-card bg-card border border-border rounded-lg p-4 cursor-pointer transition-all duration-200",
                  answers[currentQuestion.id as keyof typeof answers] === option.id && "selected"
                )}
                onClick={() => handleOptionSelect(option.id)}
                data-testid={`option-${option.id}`}
              >
                <div className="flex items-start space-x-3">
                  <div className="mt-1">
                    <input
                      type="radio"
                      name={currentQuestion.id}
                      value={option.id}
                      checked={answers[currentQuestion.id as keyof typeof answers] === option.id}
                      onChange={() => handleOptionSelect(option.id)}
                      className="text-primary focus:ring-primary"
                      data-testid={`radio-${option.id}`}
                    />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-foreground mb-1">
                      {option.label}
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      {option.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="flex justify-between items-center mt-8">
            <Button
              variant="ghost"
              onClick={previousQuestion}
              disabled={isFirstQuestion}
              data-testid="button-previous"
            >
              <ChevronLeft className="w-4 h-4 mr-2" />
              Previous
            </Button>
            
            <div className="text-sm text-muted-foreground">
              Question {currentQuestionIndex + 1} of {questions.length}
            </div>
            
            <Button
              onClick={handleNext}
              disabled={!hasAnswer}
              data-testid="button-next"
            >
              {isLastQuestion ? 'Get Recommendation' : 'Next'}
              <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export function WelcomeSection({ onStart }: { onStart: () => void }) {
  return (
    <div className="fade-in">
      <Card>
        <CardContent className="p-8">
          <div className="text-center mb-8">
            <Bot className="text-primary text-4xl mb-4 mx-auto" size={64} />
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Choose Your Microsoft Agent Platform
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Answer a few questions to discover which Microsoft agent platform best fits your scenario and requirements.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <div className="bg-accent rounded-lg p-4 text-center">
              <Bot className="text-primary text-2xl mb-2 mx-auto" />
              <h3 className="font-semibold text-accent-foreground mb-1">Microsoft 365 Copilot</h3>
              <p className="text-sm text-muted-foreground">1st Party Agents</p>
            </div>
            <div className="bg-accent rounded-lg p-4 text-center">
              <Bot className="text-primary text-2xl mb-2 mx-auto" />
              <h3 className="font-semibold text-accent-foreground mb-1">Agent Builder</h3>
              <p className="text-sm text-muted-foreground">Custom Solutions</p>
            </div>
            <div className="bg-accent rounded-lg p-4 text-center">
              <Bot className="text-primary text-2xl mb-2 mx-auto" />
              <h3 className="font-semibold text-accent-foreground mb-1">Copilot Studio</h3>
              <p className="text-sm text-muted-foreground">Low-Code Platform</p>
            </div>
            <div className="bg-accent rounded-lg p-4 text-center">
              <Bot className="text-primary text-2xl mb-2 mx-auto" />
              <h3 className="font-semibold text-accent-foreground mb-1">Azure AI Foundry</h3>
              <p className="text-sm text-muted-foreground">Enterprise Scale</p>
            </div>
          </div>

          <div className="text-center">
            <Button onClick={onStart} size="lg" data-testid="button-start-assessment">
              Start Assessment
              <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
