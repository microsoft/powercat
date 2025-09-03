import { useState, useCallback } from 'react';
import { Answers, Question } from '@shared/schema';

const questions: Question[] = [
  {
    id: 'useCaseComplexity',
    title: 'What is the complexity of your use case?',
    subtitle: 'Consider the scope and technical requirements of your agent',
    options: [
      { 
        id: 'simple', 
        label: 'Simple automation or basic Q&A', 
        description: 'Single-purpose agent with minimal complexity' 
      },
      { 
        id: 'moderate', 
        label: 'Multi-step workflows with some customization', 
        description: 'Moderate complexity with custom logic' 
      },
      { 
        id: 'complex', 
        label: 'Complex business processes with multiple integrations', 
        description: 'Enterprise-grade solution with extensive requirements' 
      }
    ]
  },
  {
    id: 'technicalExpertise',
    title: 'What is your team\'s technical expertise level?',
    subtitle: 'This helps determine the appropriate complexity level',
    options: [
      { 
        id: 'low', 
        label: 'Business user with minimal coding experience', 
        description: 'Prefer no-code or low-code solutions' 
      },
      { 
        id: 'medium', 
        label: 'Some technical background, comfortable with configuration', 
        description: 'Can handle some scripting and configuration' 
      },
      { 
        id: 'high', 
        label: 'Professional developers with coding expertise', 
        description: 'Comfortable with full development environments' 
      }
    ]
  },
  {
    id: 'integrationNeeds',
    title: 'What integration requirements do you have?',
    subtitle: 'Consider existing systems and data sources',
    options: [
      { 
        id: 'microsoft', 
        label: 'Primarily Microsoft 365 and Teams', 
        description: 'Working within Microsoft ecosystem' 
      },
      { 
        id: 'mixed', 
        label: 'Mix of Microsoft and third-party systems', 
        description: 'Need connectors to various platforms' 
      },
      { 
        id: 'enterprise', 
        label: 'Complex enterprise systems and custom APIs', 
        description: 'Extensive integration requirements' 
      }
    ]
  },
  {
    id: 'deploymentScale',
    title: 'What is your expected deployment scale?',
    subtitle: 'Think about the number of users and usage volume',
    options: [
      { 
        id: 'team', 
        label: 'Small team or department (< 100 users)', 
        description: 'Limited scope deployment' 
      },
      { 
        id: 'organization', 
        label: 'Organization-wide (100-1000 users)', 
        description: 'Company-wide deployment' 
      },
      { 
        id: 'enterprise', 
        label: 'Large enterprise or external customers (1000+ users)', 
        description: 'High-scale production deployment' 
      }
    ]
  },
  {
    id: 'customizationLevel',
    title: 'How much customization do you need?',
    subtitle: 'Consider branding, unique features, and specific behaviors',
    options: [
      { 
        id: 'minimal', 
        label: 'Use existing features with minimal customization', 
        description: 'Standard functionality is sufficient' 
      },
      { 
        id: 'moderate', 
        label: 'Some custom logic and branded experience', 
        description: 'Need tailored workflows and appearance' 
      },
      { 
        id: 'extensive', 
        label: 'Highly customized with unique features', 
        description: 'Require significant custom development' 
      }
    ]
  }
];

export function useAssessment() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});

  const updateAnswer = useCallback((questionId: keyof Answers, value: string) => {
    setAnswers(prev => ({ ...prev, [questionId]: value as any }));
  }, []);

  const nextQuestion = useCallback(() => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      return false; // Not completed
    }
    return true; // Assessment completed
  }, [currentQuestionIndex]);

  const previousQuestion = useCallback(() => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  }, [currentQuestionIndex]);

  const resetAssessment = useCallback(() => {
    setCurrentQuestionIndex(0);
    setAnswers({});
  }, []);

  const currentQuestion = questions[currentQuestionIndex];
  const hasAnswer = currentQuestion ? answers[currentQuestion.id as keyof Answers] !== undefined : false;
  const isFirstQuestion = currentQuestionIndex === 0;
  const isLastQuestion = currentQuestionIndex === questions.length - 1;

  return {
    questions,
    currentQuestion,
    currentQuestionIndex,
    answers,
    hasAnswer,
    isFirstQuestion,
    isLastQuestion,
    updateAnswer,
    nextQuestion,
    previousQuestion,
    resetAssessment
  };
}
