
import React, { useState, useCallback } from 'react';
import { SkillInputForm } from './components/SkillInputForm';
import { LearningPlanDisplay } from './components/LearningPlanDisplay';
import { LoadingSpinner } from './components/LoadingSpinner';
import { ErrorMessage } from './components/ErrorMessage';
import { generateLearningPlan } from './services/geminiService';
import type { DayPlan } from './types';
import { Header } from './components/Header';
import { WelcomeMessage } from './components/WelcomeMessage';

const App: React.FC = () => {
  const [learningPlan, setLearningPlan] = useState<DayPlan[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleGeneratePlan = useCallback(async (skill: string, level: string, days: number) => {
    setIsLoading(true);
    setError(null);
    setLearningPlan(null);
    try {
      const plan = await generateLearningPlan(skill, level, days);
      setLearningPlan(plan);
    // FIX: Added curly braces to the catch block to correctly handle errors.
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white selection:bg-purple-500 selection:text-white">
      <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
        <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-purple-400 opacity-20 blur-[100px]"></div>
      </div>
      
      <main className="container mx-auto px-4 py-8 md:py-12">
        <Header />
        <div className="max-w-3xl mx-auto">
          <SkillInputForm onGenerate={handleGeneratePlan} isLoading={isLoading} />
          
          <div className="mt-12">
            {isLoading && <LoadingSpinner />}
            {error && <ErrorMessage message={error} />}
            {learningPlan ? (
              <LearningPlanDisplay plan={learningPlan} />
            ) : (
              !isLoading && !error && <WelcomeMessage />
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;