"use client";

import { useState, useEffect, use } from "react";
import { useRouter, useParams } from "next/navigation";
import { ArrowRight, ArrowLeft, CheckCircle2, Loader2 } from "lucide-react";

interface Option {
  text: string;
  textMarathi?: string;
}

interface Question {
  _id: string;
  questionText: string;
  questionTextMarathi?: string;
  options: Option[];
}

export default function QuestionsPage() {
  const router = useRouter();
  const params = useParams();
  const slug = params.slug as string;
  
  const [questions, setQuestions] = useState<Question[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch questions on mount
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const res = await fetch(`/api/assessments/${slug}`);
        if (!res.ok) {
          throw new Error("Failed to fetch assessment");
        }
        const data = await res.json();
        setQuestions(data.questions);
      } catch (err) {
        setError("We couldn't load the assessment. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchQuestions();
  }, [slug]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#fdfbf7] flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-amber-600" />
      </div>
    );
  }

  if (error || questions.length === 0) {
    return (
      <div className="min-h-screen bg-[#fdfbf7] flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 font-medium mb-4">{error || "No questions found."}</p>
          <button onClick={() => window.location.reload()} className="text-amber-700 hover:underline">
            Try again
          </button>
        </div>
      </div>
    );
  }

  const currentQuestion = questions[currentIndex];
  const totalQuestions = questions.length;
  const progressPercentage = ((currentIndex + 1) / totalQuestions) * 100;

  const handleSelectOption = (optionIndex: number) => {
    setAnswers({
      ...answers,
      [currentQuestion._id]: optionIndex,
    });
  };

  const handleNext = () => {
    if (currentIndex < totalQuestions - 1) setCurrentIndex(currentIndex + 1);
  };

  const handlePrevious = () => {
    if (currentIndex > 0) setCurrentIndex(currentIndex - 1);
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    try {
      const res = await fetch(`/api/assessments/${slug}/attempts`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ answers })
      });
      
      const data = await res.json();
      
      if (!res.ok) throw new Error(data.error || "Failed to submit");
      
      // Navigate to the result page using the real attemptId returned by our backend
      router.push(`/assessment/${slug}/result/${data.attemptId}`);
    } catch (err) {
      console.error(err);
      alert("We couldn't submit your assessment. Please try again.");
      setIsSubmitting(false);
    }
  };

  const hasAnsweredCurrent = answers[currentQuestion._id] !== undefined;
  const allQuestionsAnswered = Object.keys(answers).length === totalQuestions;

  return (
    <div className="min-h-screen bg-[#fdfbf7] flex flex-col items-center justify-center py-4 px-2 sm:px-6 lg:px-8">
      <div className="max-w-2xl w-full">
        {/* Progress bar */}
        <div className="mb-6">
          <div className="flex justify-between text-xs font-medium text-slate-500 mb-2 tracking-wide uppercase">
            <span>Question {currentIndex + 1} of {totalQuestions}</span>
            <span>{Math.round(progressPercentage)}%</span>
          </div>
          <div className="w-full bg-slate-200 rounded-full h-1.5">
            <div 
              className="bg-amber-600 h-1.5 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
        </div>

        {/* Question Card */}
        <div className="bg-white rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-4 sm:p-8 border border-slate-100 relative overflow-hidden">
          {/* Decorative left border line */}
          <div className="absolute top-0 left-0 h-full w-1.5 bg-gradient-to-b from-amber-400 to-amber-700"></div>
          
          <div className="mb-6 pl-2 sm:pl-4">
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-slate-900 mb-2 leading-tight">
              {currentQuestion.questionText}
            </h2>
            {currentQuestion.questionTextMarathi && (
              <h3 className="text-base sm:text-lg font-light text-slate-600 font-serif italic">
                {currentQuestion.questionTextMarathi}
              </h3>
            )}
          </div>

          <div className="space-y-2.5 pl-2 sm:pl-4">
            {currentQuestion.options.map((option, index) => {
              const isSelected = answers[currentQuestion._id] === index;
              return (
                <button
                  key={index}
                  onClick={() => handleSelectOption(index)}
                  className={`w-full text-left px-5 py-3 rounded-lg border transition-all duration-300 flex items-center justify-between ${
                    isSelected
                      ? "border-amber-600 bg-amber-50/50 text-slate-900 shadow-sm transform scale-[1.01]"
                      : "border-slate-200 hover:border-amber-300 hover:bg-slate-50 text-slate-700 hover:shadow-sm"
                  }`}
                >
                  <div className="flex flex-col">
                    <span className="font-serif font-medium text-base">{option.text}</span>
                    {option.textMarathi && (
                      <span className={`text-xs mt-0.5 font-serif ${isSelected ? "text-amber-800" : "text-slate-500"}`}>
                        {option.textMarathi}
                      </span>
                    )}
                  </div>
                  {isSelected && <CheckCircle2 className="w-5 h-5 text-amber-600 flex-shrink-0" />}
                </button>
              );
            })}
          </div>

          {/* Navigation Buttons */}
          <div className="mt-6 flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-between pt-6 border-t border-slate-100 pl-2 sm:pl-4 gap-3 sm:gap-0">
            <button
              onClick={handlePrevious}
              disabled={currentIndex === 0 || isSubmitting}
              className={`flex items-center justify-center px-4 py-2.5 sm:py-2 text-sm font-medium rounded transition-colors ${
                currentIndex === 0
                  ? "text-slate-300 cursor-not-allowed"
                  : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
              }`}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous
            </button>

            {currentIndex === totalQuestions - 1 ? (
              <button
                onClick={handleSubmit}
                disabled={!allQuestionsAnswered || isSubmitting}
                className={`flex items-center justify-center px-4 sm:px-6 py-2.5 sm:py-2.5 text-sm font-medium rounded text-white transition-all shadow-md ${
                  !allQuestionsAnswered || isSubmitting
                    ? "bg-amber-300 cursor-not-allowed shadow-none"
                    : "bg-amber-700 hover:bg-amber-800 hover:shadow-lg hover:-translate-y-0.5"
                }`}
              >
                {isSubmitting ? "Submitting..." : "Submit"}
                {!isSubmitting && <CheckCircle2 className="w-4 h-4 ml-2" />}
              </button>
            ) : (
              <button
                onClick={handleNext}
                disabled={!hasAnsweredCurrent || isSubmitting}
                className={`flex items-center justify-center px-4 sm:px-6 py-2.5 sm:py-2.5 text-sm font-medium rounded text-white transition-all shadow-md ${
                  !hasAnsweredCurrent
                    ? "bg-amber-300 cursor-not-allowed shadow-none"
                    : "bg-amber-700 hover:bg-amber-800 hover:shadow-lg hover:-translate-y-0.5"
                }`}
              >
                Next
                <ArrowRight className="w-4 h-4 ml-2" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
