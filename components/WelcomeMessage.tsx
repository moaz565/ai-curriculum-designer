
import React from 'react';

export const WelcomeMessage: React.FC = () => {
    return (
        <div className="text-center p-10 bg-white/5 border border-dashed border-white/20 rounded-xl">
            <div className="flex justify-center items-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-16 h-16 text-gray-500">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75" />
                </svg>
            </div>
            <h2 className="text-2xl font-semibold text-gray-300">Ready to learn something new?</h2>
            <p className="text-gray-400 mt-2 max-w-md mx-auto">
                Enter a skill and your experience level above, and let our AI create a personalized 5-day study guide for you.
            </p>
        </div>
    );
};
