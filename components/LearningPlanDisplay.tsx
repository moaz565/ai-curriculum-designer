
import React from 'react';
import type { DayPlan } from '../types';

interface LearningPlanDisplayProps {
  plan: DayPlan[];
}

const GoalIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-purple-400">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418" />
    </svg>
);

const ConceptsIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-green-400">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 12.75h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 0 1 0 3.75H5.625a1.875 1.875 0 0 1 0-3.75Z" />
    </svg>
);

const TaskIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-sky-400">
        <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
    </svg>
);

const DayCard: React.FC<{ dayPlan: DayPlan }> = ({ dayPlan }) => {
    return (
        <div className="bg-white/5 border border-white/10 rounded-xl p-6 backdrop-blur-sm transition-all duration-300 hover:border-purple-400/50 hover:bg-white/10">
            <h2 className="text-2xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-gray-200 to-gray-400">
                Day {dayPlan.day}
            </h2>
            <div className="space-y-6">
                <div>
                    <div className="flex items-center gap-3 mb-2">
                        <GoalIcon />
                        <h3 className="text-lg font-semibold text-purple-300">Daily Goal</h3>
                    </div>
                    <p className="text-gray-300 ml-9">{dayPlan.goal}</p>
                </div>
                <div>
                    <div className="flex items-center gap-3 mb-2">
                        <ConceptsIcon />
                        <h3 className="text-lg font-semibold text-green-300">Key Concepts</h3>
                    </div>
                    <ul className="list-disc list-inside text-gray-300 ml-9 space-y-1">
                        {dayPlan.concepts.map((concept, index) => (
                            <li key={index}>{concept}</li>
                        ))}
                    </ul>
                </div>
                <div>
                    <div className="flex items-center gap-3 mb-2">
                        <TaskIcon />
                        <h3 className="text-lg font-semibold text-sky-300">Actionable Task</h3>
                    </div>
                    <p className="text-gray-300 ml-9">{dayPlan.task}</p>
                </div>
            </div>
        </div>
    );
};

export const LearningPlanDisplay: React.FC<LearningPlanDisplayProps> = ({ plan }) => {
  return (
    <div className="space-y-6">
      {plan.map((dayPlan) => (
        <DayCard key={dayPlan.day} dayPlan={dayPlan} />
      ))}
    </div>
  );
};
