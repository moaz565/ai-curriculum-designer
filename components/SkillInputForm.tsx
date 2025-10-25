
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { getRecommendedDays } from '../services/geminiService';

interface SkillInputFormProps {
  onGenerate: (skill: string, level: string, days: number) => void;
  isLoading: boolean;
}

const ArrowRightIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
    </svg>
);

export const SkillInputForm: React.FC<SkillInputFormProps> = ({ onGenerate, isLoading }) => {
  const [skill, setSkill] = useState('');
  const [level, setLevel] = useState('Beginner');
  const [days, setDays] = useState(5);
  const [isRecommending, setIsRecommending] = useState(false);
  
  const debounceTimeout = useRef<number | null>(null);

  const fetchRecommendation = useCallback(async (currentSkill: string) => {
    if (!currentSkill.trim()) {
        setIsRecommending(false);
        return;
    }
    setIsRecommending(true);
    const recommended = await getRecommendedDays(currentSkill);
    setDays(recommended);
    setIsRecommending(false);
  }, []);

  useEffect(() => {
    if (debounceTimeout.current) {
        clearTimeout(debounceTimeout.current);
    }
    debounceTimeout.current = window.setTimeout(() => {
        fetchRecommendation(skill);
    }, 700); // Debounce API call

    return () => {
        if (debounceTimeout.current) {
            clearTimeout(debounceTimeout.current);
        }
    };
  }, [skill, fetchRecommendation]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (skill.trim()) {
      onGenerate(skill, level, days);
    }
  };

  const isFormLocked = !skill.trim();

  return (
    <form onSubmit={handleSubmit} className="p-6 bg-white/5 border border-white/10 rounded-xl backdrop-blur-sm shadow-lg">
      <div className="space-y-4">
        <div>
          <label htmlFor="skill" className="block text-sm font-medium text-gray-300 mb-2">
            1. What skill do you want to learn?
          </label>
          <input
            id="skill"
            type="text"
            value={skill}
            onChange={(e) => setSkill(e.target.value)}
            placeholder="e.g., 'React Hooks' or 'Play the ukulele'"
            className="w-full bg-gray-800/50 border border-gray-700 rounded-md py-2.5 px-4 text-white placeholder-gray-500 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200"
            required
            autoFocus
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-start pt-2">
          <div className="md:col-span-1">
            <label htmlFor="days" className="block text-sm font-medium text-gray-300 mb-2">
              2. How many days?
            </label>
            <div className="relative">
              <input
                id="days"
                type="number"
                value={days}
                onChange={(e) => setDays(Number(e.target.value))}
                min="1"
                max="30"
                className="w-full bg-gray-800/50 border border-gray-700 rounded-md py-2.5 px-4 text-white placeholder-gray-500 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 disabled:bg-gray-800/20 disabled:cursor-not-allowed disabled:border-gray-800"
                required
                disabled={isFormLocked}
              />
              {isRecommending && (
                <div className="absolute right-3 top-1/2 -translate-y-1/2">
                  <svg className="animate-spin h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                </div>
              )}
            </div>
            {!isRecommending && !isFormLocked && <p className="text-xs text-gray-500 mt-1.5 h-4">AI recommended</p>}
          </div>

          <div className="md:col-span-2">
            <label htmlFor="level" className="block text-sm font-medium text-gray-300 mb-2">
              3. What is your current level?
            </label>
            <select
              id="level"
              value={level}
              onChange={(e) => setLevel(e.target.value)}
              className="w-full bg-gray-800/50 border border-gray-700 rounded-md py-2.5 px-4 text-white focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 disabled:bg-gray-800/20 disabled:cursor-not-allowed disabled:border-gray-800"
              disabled={isFormLocked}
            >
              <option>Beginner</option>
              <option>Intermediate</option>
              <option>Advanced</option>
            </select>
          </div>
        </div>
      </div>
      <button
        type="submit"
        disabled={isLoading || isFormLocked}
        className="w-full mt-6 py-3 px-6 flex items-center justify-center gap-2 font-semibold text-white bg-purple-600 rounded-md hover:bg-purple-700 disabled:bg-purple-800/50 disabled:cursor-not-allowed disabled:text-gray-400 transition-all duration-200 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-purple-500"
      >
        {isLoading ? (
          <>
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Generating...
          </>
        ) : (
          <>
            Generate Plan
            <ArrowRightIcon className="w-5 h-5"/>
          </>
        )}
      </button>
    </form>
  );
};
