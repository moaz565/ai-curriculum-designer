
import { GoogleGenAI, Type } from "@google/genai";
import type { DayPlan } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });

const daysSchema = {
    type: Type.OBJECT,
    properties: {
        days: {
            type: Type.INTEGER,
            description: 'The recommended number of days to learn the basics of the skill, typically between 3 and 14.'
        }
    },
    required: ["days"]
};

export async function getRecommendedDays(skill: string): Promise<number> {
    if (!skill.trim()) {
        return 5; // Default value if skill is empty
    }
    const prompt = `Based on the complexity of the skill "${skill}", recommend a number of days for an intensive, beginner-friendly learning plan. The goal is to get a solid foundational understanding. The number should be reasonable for a structured introduction, typically between 3 and 14 days.`;

    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: daysSchema,
            }
        });
        const result = JSON.parse(response.text.trim());
        // Clamp the value to a reasonable range in case the model returns something unexpected.
        return Math.max(3, Math.min(14, result.days || 5));
    } catch (error) {
        console.error("Error fetching recommended days:", error);
        return 5; // Return a sensible default on error
    }
}


const planSchema = {
    type: Type.ARRAY,
    items: {
        type: Type.OBJECT,
        properties: {
            day: { 
                type: Type.INTEGER,
                description: 'The day number of the plan (e.g., 1, 2, 3...).'
            },
            goal: { 
                type: Type.STRING,
                description: 'A clear, concise objective for the day.'
            },
            concepts: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
                description: 'An array of 2-3 core topics to learn.'
            },
            task: { 
                type: Type.STRING,
                description: 'A small, concrete exercise to practice the skill.'
            }
        },
        required: ["day", "goal", "concepts", "task"]
    }
};

export async function generateLearningPlan(skill: string, level: string, days: number): Promise<DayPlan[]> {
    const prompt = `
        You are an expert curriculum designer. A user wants to learn a new skill.

        Skill: ${skill}
        Current Level: ${level}

        Generate a concise, practical ${days}-day learning plan to help them get started.
        The plan must be appropriate for their stated level. For a beginner, start with the absolute fundamentals. For intermediate, build on existing knowledge.
        For each of the ${days} days, provide:
        1. Daily Goal: A clear objective for the day.
        2. Key Concepts: An array of 2-3 core topics to learn.
        3. Actionable Task: A small, concrete exercise to practice the skill.

        Return the plan as a JSON array of ${days} objects, strictly following the provided schema. The day property for each object should be numbered sequentially from 1 to ${days}.
    `;

    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: planSchema,
            }
        });

        const planText = response.text.trim();
        const planData = JSON.parse(planText);
        
        // Ensure the data is sorted by day
        return (planData as DayPlan[]).sort((a, b) => a.day - b.day);

    } catch (error) {
        console.error("Error generating learning plan:", error);
        throw new Error("Failed to generate learning plan. The model may have returned an invalid format. Please try again.");
    }
}
