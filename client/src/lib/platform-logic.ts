import { Answers, Platform } from "@shared/schema";

export const platformOptions: Record<string, Platform> = {
  'microsoft365copilot': {
    id: 'microsoft365copilot',
    name: 'Microsoft 365 Copilot 1st Party Agents',
    icon: 'users',
    color: 'blue',
    description: 'Ready-to-use agents integrated directly into your Microsoft 365 environment',
    benefits: [
      'Zero development time required',
      'Native Microsoft 365 integration',
      'Built-in security and compliance',
      'Immediate deployment capability',
      'Automatic updates and maintenance'
    ],
    reasoning: []
  },
  'agentbuilder': {
    id: 'agentbuilder',
    name: 'Microsoft 365 Copilot Agent Builder',
    icon: 'wrench',
    color: 'green',
    description: 'Build custom agents with moderate complexity for your organization',
    benefits: [
      'Custom agent development within Microsoft 365',
      'Moderate customization capabilities',
      'Integrated with Microsoft Graph',
      'Organizational data access',
      'Simplified deployment process'
    ],
    reasoning: []
  },
  'copilotstudio': {
    id: 'copilotstudio',
    name: 'Microsoft Copilot Studio',
    icon: 'paint-brush',
    color: 'purple',
    description: 'Low-code platform for creating sophisticated conversational agents',
    benefits: [
      'Visual conversation design',
      'Rich connector ecosystem',
      'Multi-channel deployment',
      'Advanced analytics and insights',
      'Iterative development workflow'
    ],
    reasoning: []
  },
  'azureai': {
    id: 'azureai',
    name: 'Microsoft Azure AI Foundry',
    icon: 'cloud',
    color: 'indigo',
    description: 'Enterprise-scale platform for complex AI agents with full customization',
    benefits: [
      'Complete development control',
      'Advanced AI model integration',
      'Enterprise-grade scalability',
      'Custom data processing pipelines',
      'Comprehensive monitoring and observability'
    ],
    reasoning: []
  }
};

export function determinePlatform(answers: Answers): Platform {
  let bestMatch: Platform | null = null;

  // Microsoft 365 Copilot 1st Party Agents
  if (answers.useCaseComplexity === 'simple' && 
      answers.integrationNeeds === 'microsoft' && 
      answers.customizationLevel === 'minimal') {
    bestMatch = platformOptions.microsoft365copilot;
    bestMatch.reasoning = [
      'Your simple use case aligns with ready-to-use solutions',
      'Microsoft-focused integrations work best within the Microsoft ecosystem',
      'Minimal customization needs match out-of-the-box capabilities'
    ];
  }
  // Agent Builder
  else if ((answers.useCaseComplexity === 'moderate' && 
            answers.technicalExpertise !== 'low' && 
            answers.integrationNeeds === 'microsoft') ||
           (answers.useCaseComplexity === 'simple' && 
            answers.customizationLevel === 'moderate')) {
    bestMatch = platformOptions.agentbuilder;
    bestMatch.reasoning = [
      'Moderate complexity matches Agent Builder capabilities',
      'Your technical expertise enables custom agent development',
      'Microsoft ecosystem focus aligns with platform strengths'
    ];
  }
  // Copilot Studio
  else if ((answers.technicalExpertise === 'medium' && 
            answers.customizationLevel === 'moderate') ||
           (answers.useCaseComplexity === 'moderate' && 
            answers.integrationNeeds === 'mixed')) {
    bestMatch = platformOptions.copilotstudio;
    bestMatch.reasoning = [
      'Low-code approach matches your team\'s technical comfort level',
      'Mixed integrations supported through extensive connector library',
      'Visual development environment accelerates creation process'
    ];
  }
  // Azure AI Foundry
  else if (answers.useCaseComplexity === 'complex' || 
           answers.deploymentScale === 'enterprise' || 
           answers.customizationLevel === 'extensive' ||
           (answers.technicalExpertise === 'high' && 
            answers.integrationNeeds === 'enterprise')) {
    bestMatch = platformOptions.azureai;
    bestMatch.reasoning = [
      'Complex requirements need a highly customizable platform',
      'Enterprise scale deployment requires robust infrastructure',
      'Your development expertise enables advanced customization options'
    ];
  }

  // Fallback logic
  if (!bestMatch) {
    if (answers.technicalExpertise === 'low') {
      bestMatch = platformOptions.microsoft365copilot;
      bestMatch.reasoning = ['No-code approach recommended for teams with limited technical expertise'];
    } else if (answers.useCaseComplexity === 'complex') {
      bestMatch = platformOptions.azureai;
      bestMatch.reasoning = ['Complex use cases require enterprise-grade development platform'];
    } else {
      bestMatch = platformOptions.copilotstudio;
      bestMatch.reasoning = ['Balanced approach suitable for most scenarios'];
    }
  }

  return bestMatch;
}
