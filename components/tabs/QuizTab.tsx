import React, { useState } from 'react';
import { ShieldIcon, ZapIcon, GlobeIcon } from '../Icons';

const questions = [
  {
    id: 1,
    question: "What is the primary goal of a CDN?",
    options: [
      "To host the database of the application",
      "To reduce latency by serving content from closer locations",
      "To replace the need for an Origin server completely",
      "To generate dynamic API responses faster"
    ],
    correct: 1
  },
  {
    id: 2,
    question: "If an Edge server does not have the requested file, what is it called?",
    options: [
      "Cache Hit",
      "Cache Miss",
      "Server Timeout",
      "404 Error"
    ],
    correct: 1
  },
  {
    id: 3,
    question: "Does a CDN increase or decrease the load on the Origin server?",
    options: [
      "It increases load significantly",
      "It has no effect on load",
      "It decreases load significantly (Offloading)",
      "It only decreases load for databases"
    ],
    correct: 2
  }
];

const QuizTab = () => {
  const [currentQ, setCurrentQ] = useState(0);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);

  const handleAnswer = (index: number) => {
    setSelectedOption(index);
    // Delay to show feedback
    setTimeout(() => {
        if (index === questions[currentQ].correct) {
            setScore(prev => prev + 1);
        }
        
        if (currentQ < questions.length - 1) {
            setCurrentQ(prev => prev + 1);
            setSelectedOption(null);
        } else {
            setShowResults(true);
        }
    }, 1000);
  };

  const restart = () => {
    setScore(0);
    setCurrentQ(0);
    setShowResults(false);
    setSelectedOption(null);
  };

  return (
    <div className="w-full h-full flex flex-col p-6 items-center justify-center">
      <div className="w-full max-w-2xl">
        <h2 className="text-3xl font-bold text-white mb-8 text-center">Knowledge Check</h2>
        
        {!showResults ? (
            <div className="bg-slate-800 rounded-xl border border-slate-700 p-8 shadow-2xl">
                <div className="flex justify-between text-slate-400 text-sm mb-4">
                    <span>Question {currentQ + 1} of {questions.length}</span>
                    <span>Score: {score}</span>
                </div>
                
                <h3 className="text-xl font-bold text-white mb-6 min-h-[60px]">
                    {questions[currentQ].question}
                </h3>

                <div className="space-y-3">
                    {questions[currentQ].options.map((option, idx) => (
                        <button
                            key={idx}
                            onClick={() => handleAnswer(idx)}
                            disabled={selectedOption !== null}
                            className={`w-full text-left p-4 rounded-lg border transition-all ${
                                selectedOption === null 
                                    ? 'bg-slate-700 border-slate-600 hover:bg-slate-600 hover:border-slate-500' 
                                    : selectedOption === idx
                                        ? idx === questions[currentQ].correct
                                            ? 'bg-emerald-600 border-emerald-500 text-white'
                                            : 'bg-red-600 border-red-500 text-white'
                                        : idx === questions[currentQ].correct
                                            ? 'bg-emerald-600 border-emerald-500 text-white' // Reveal correct if wrong selected
                                            : 'bg-slate-700 border-slate-600 opacity-50'
                            }`}
                        >
                            {option}
                        </button>
                    ))}
                </div>
            </div>
        ) : (
            <div className="bg-slate-800 rounded-xl border border-slate-700 p-8 shadow-2xl text-center">
                <div className="mb-6 flex justify-center">
                    {score === questions.length ? (
                        <div className="w-20 h-20 bg-emerald-500 rounded-full flex items-center justify-center animate-bounce">
                             <ShieldIcon className="w-10 h-10 text-white" />
                        </div>
                    ) : (
                        <div className="w-20 h-20 bg-blue-500 rounded-full flex items-center justify-center">
                            <GlobeIcon className="w-10 h-10 text-white" />
                        </div>
                    )}
                </div>
                
                <h3 className="text-2xl font-bold text-white mb-2">
                    {score === questions.length ? 'Perfect Score!' : 'Quiz Complete'}
                </h3>
                <p className="text-slate-300 mb-6">
                    You scored {score} out of {questions.length}.
                </p>
                
                <button
                    onClick={restart}
                    className="px-6 py-2 bg-slate-700 hover:bg-slate-600 rounded-full text-white font-bold transition-colors"
                >
                    Restart Quiz
                </button>
            </div>
        )}
      </div>
    </div>
  );
};

export default QuizTab;