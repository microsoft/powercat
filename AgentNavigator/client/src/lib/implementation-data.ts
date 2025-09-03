import { ImplementationChecklist } from "@shared/schema";

export const implementationChecklists: Record<string, ImplementationChecklist> = {
  'microsoft365copilot': {
    predev: [
      'Verify Microsoft 365 Copilot licensing and permissions',
      'Identify specific 1st party agents needed for your use case',
      'Review existing Microsoft 365 data and security policies',
      'Plan user training and adoption strategy',
      'Establish success metrics and KPIs for agent effectiveness'
    ],
    postdev: [
      'Deploy agents to target user groups and departments',
      'Monitor usage analytics and performance metrics',
      'Collect user feedback and iterate on agent effectiveness',
      'Maintain data governance and compliance standards',
      'Provide ongoing user support and training resources'
    ]
  },
  'agentbuilder': {
    predev: [
      'Assess organizational requirements and define use cases',
      'Design agent conversation flows and interaction scenarios',
      'Identify required Microsoft 365 data sources and permissions',
      'Plan agent permissions and access control policies',
      'Create comprehensive agent testing and validation strategy'
    ],
    postdev: [
      'Deploy agent to Microsoft 365 environment and target users',
      'Monitor agent performance and user interaction patterns',
      'Implement feedback collection and continuous improvement process',
      'Maintain agent knowledge base and response accuracy',
      'Scale deployment based on adoption metrics and user feedback'
    ]
  },
  'copilotstudio': {
    predev: [
      'Define detailed agent requirements and user journey mapping',
      'Design comprehensive conversation flows and dialog trees',
      'Identify and configure required connectors and system integrations',
      'Plan knowledge base structure, content sources, and maintenance',
      'Establish development, testing, and staging environment procedures'
    ],
    postdev: [
      'Deploy agent to selected channels and user touchpoints',
      'Implement comprehensive monitoring and analytics tracking',
      'Establish maintenance procedures and regular update cycles',
      'Optimize agent performance based on usage data and user feedback',
      'Plan feature enhancements and scaling for additional use cases'
    ]
  },
  'azureai': {
    predev: [
      'Architect comprehensive solution design and technical requirements',
      'Plan cloud infrastructure, resource allocation, and cost management',
      'Design data architecture, integration patterns, and security framework',
      'Establish development, staging, and production environment workflows',
      'Create comprehensive testing, validation, and quality assurance framework'
    ],
    postdev: [
      'Deploy to production with comprehensive monitoring and alerting',
      'Implement detailed logging, observability, and performance tracking',
      'Establish CI/CD pipelines for ongoing updates and maintenance',
      'Monitor performance metrics, costs, and resource utilization patterns',
      'Maintain model performance and implement continuous learning processes'
    ]
  }
};
