import { z } from "zod";

export const questionSchema = z.object({
  id: z.string(),
  title: z.string(),
  subtitle: z.string(),
  options: z.array(z.object({
    id: z.string(),
    label: z.string(),
    description: z.string()
  }))
});

export const answerSchema = z.object({
  useCaseComplexity: z.enum(['simple', 'moderate', 'complex']).optional(),
  technicalExpertise: z.enum(['low', 'medium', 'high']).optional(),
  integrationNeeds: z.enum(['microsoft', 'mixed', 'enterprise']).optional(),
  deploymentScale: z.enum(['team', 'organization', 'enterprise']).optional(),
  customizationLevel: z.enum(['minimal', 'moderate', 'extensive']).optional()
});

export const platformSchema = z.object({
  id: z.string(),
  name: z.string(),
  icon: z.string(),
  color: z.string(),
  description: z.string(),
  benefits: z.array(z.string()),
  reasoning: z.array(z.string())
});

export const implementationChecklistSchema = z.object({
  predev: z.array(z.string()),
  postdev: z.array(z.string())
});

export type Question = z.infer<typeof questionSchema>;
export type Answers = z.infer<typeof answerSchema>;
export type Platform = z.infer<typeof platformSchema>;
export type ImplementationChecklist = z.infer<typeof implementationChecklistSchema>;
