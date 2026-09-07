"use client";

import { useState, useEffect, use } from "react";
import { useRouter, useParams } from "next/navigation";
import { ArrowRight, ArrowLeft, CheckCircle2, Loader2 } from "lucide-react";

interface Option {
  text: string;
}

interface Question {
  _id: string;
  questionText: string;
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
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-indigo-600" />
      </div>
    );
  }

  if (error || questions.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 font-medium mb-4">{error || "No questions found."}</p>
          <button onClick={() => window.location.reload()} className="text-indigo-600 hover:underline">
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
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl w-full">
        {/* Progress bar */}
        <div className="mb-8">
          <div className="flex justify-between text-sm font-medium text-gray-500 mb-2">
            <span>Question {currentIndex + 1} of {totalQuestions}</span>
            <span>{Math.round(progressPercentage)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div 
              className="bg-indigo-600 h-2.5 rounded-full transition-all duration-300 ease-in-out"
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
        </div>

        {/* Question Card */}
        <div className="bg-white rounded-xl shadow-sm p-6 sm:p-10 border border-gray-100">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-8">
            {currentQuestion.questionText}
          </h2>

          <div className="space-y-3">
            {currentQuestion.options.map((option, index) => {
              const isSelected = answers[currentQuestion._id] === index;
              return (
                <button
                  key={index}
                  onClick={() => handleSelectOption(index)}
                  className={`w-full text-left px-6 py-4 rounded-lg border-2 transition-all duration-200 flex items-center justify-between ${
                    isSelected
                      ? "border-indigo-600 bg-indigo-50 text-indigo-900"
                      : "border-gray-200 hover:border-indigo-300 hover:bg-gray-50 text-gray-700"
                  }`}
                >
                  <span className="font-medium">{option.text}</span>
                  {isSelected && <CheckCircle2 className="w-5 h-5 text-indigo-600" />}
                </button>
              );
            })}
          </div>

          {/* Navigation Buttons */}
          <div className="mt-10 flex items-center justify-between pt-6 border-t border-gray-100">
            <button
              onClick={handlePrevious}
              disabled={currentIndex === 0 || isSubmitting}
              className={`flex items-center px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                currentIndex === 0
                  ? "text-gray-400 cursor-not-allowed"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous
            </button>

            {currentIndex === totalQuestions - 1 ? (
              <button
                onClick={handleSubmit}
                disabled={!allQuestionsAnswered || isSubmitting}
                className={`flex items-center px-6 py-2 text-sm font-medium rounded-md text-white transition-colors ${
                  !allQuestionsAnswered || isSubmitting
                    ? "bg-indigo-400 cursor-not-allowed"
                    : "bg-indigo-600 hover:bg-indigo-700"
                }`}
              >
                {isSubmitting ? "Submitting..." : "Submit Assessment"}
                {!isSubmitting && <CheckCircle2 className="w-4 h-4 ml-2" />}
              </button>
            ) : (
              <button
                onClick={handleNext}
                disabled={!hasAnsweredCurrent || isSubmitting}
                className={`flex items-center px-6 py-2 text-sm font-medium rounded-md text-white transition-colors ${
                  !hasAnsweredCurrent
                    ? "bg-indigo-400 cursor-not-allowed"
                    : "bg-indigo-600 hover:bg-indigo-700"
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
