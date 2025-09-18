'use server';

/**
 * @fileOverview Personalized motivation flow that provides encouraging messages based on user progress, mimicking a sensei.
 *
 * - generatePersonalizedMotivation - A function that generates personalized motivation messages.
 * - PersonalizedMotivationInput - The input type for the generatePersonalizedMotivation function.
 * - PersonalizedMotivationOutput - The return type for the generatePersonalizedMotivation function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PersonalizedMotivationInputSchema = z.object({
  userName: z.string().describe('The name of the user.'),
  tasksCompleted: z.number().describe('The number of tasks the user has completed.'),
  chakraAllocated: z.number().describe('The amount of chakra (effort/energy) the user has allocated.'),
  currentRank: z.string().describe('The current ninja rank of the user.'),
});
export type PersonalizedMotivationInput = z.infer<typeof PersonalizedMotivationInputSchema>;

const PersonalizedMotivationOutputSchema = z.object({
  motivationMessage: z.string().describe('A personalized, encouraging message for the user.'),
});
export type PersonalizedMotivationOutput = z.infer<typeof PersonalizedMotivationOutputSchema>;

export async function generatePersonalizedMotivation(
  input: PersonalizedMotivationInput
): Promise<PersonalizedMotivationOutput> {
  return personalizedMotivationFlow(input);
}

const prompt = ai.definePrompt({
  name: 'personalizedMotivationPrompt',
  input: {schema: PersonalizedMotivationInputSchema},
  output: {schema: PersonalizedMotivationOutputSchema},
  prompt: `You are a wise and encouraging sensei, providing personalized motivation to your ninja student, {{userName}}.

  Based on their progress:
  - Tasks completed: {{tasksCompleted}}
  - Chakra allocated: {{chakraAllocated}}
  - Current rank: {{currentRank}}

  Craft a short, encouraging message to help them stay focused and motivated. The message should be no more than two sentences.
  The message should be in the tone of a ninja sensei giving encouragement to a student.

  Motivation Message:`,
});

const personalizedMotivationFlow = ai.defineFlow(
  {
    name: 'personalizedMotivationFlow',
    inputSchema: PersonalizedMotivationInputSchema,
    outputSchema: PersonalizedMotivationOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
