import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Activity, RotateCcw, TrendingUp } from "lucide-react";
import dbConnect from "@/lib/db";
import { AssessmentAttempt, IChakraScore } from "@/models/AssessmentAttempt";
import { Assessment } from "@/models/Assessment";
import PrintButton from "@/components/PrintButton";
import { getChakraExplanation } from "@/lib/chakraExplanations";

// This is a Server Component, so we can connect to the database directly!
async function getAttemptDetails(attemptId: string) {
  try {
    await dbConnect();
    const attempt = await AssessmentAttempt.findById(attemptId).lean();
    if (!attempt) return null;

    const assessment = await Assessment.findById(attempt.assessmentId).lean();
    if (!assessment) return null;

    return { attempt, assessment };
  } catch (error) {
    console.error("Error fetching attempt:", error);
    return null;
  }
}

// Get the visual color for a chakra percentage
function getChakraColor(percentage: number) {
  if (percentage >= 92) return "bg-purple-500";
  if (percentage >= 80) return "bg-indigo-500";
  if (percentage >= 60) return "bg-blue-500";
  if (percentage >= 40) return "bg-yellow-500";
  return "bg-red-500";
}

export default async function ResultPage({
  params,
}: {
  params: Promise<{ slug: string; attemptId: string }>;
}) {
  const { slug, attemptId } = await params;
  const data = await getAttemptDetails(attemptId);

  if (!data) {
    notFound();
  }

  const { attempt, assessment } = data;

  return (
    <div className="min-h-screen bg-[#fdfbf7] py-8 px-3 sm:py-16 sm:px-6 lg:px-8 print:bg-white print:py-0">
      <div className="max-w-4xl mx-auto space-y-6 sm:space-y-10 print:space-y-4">
        
        {/* Header Section */}
        <div className="text-center space-y-3 sm:space-y-4 print:mt-8">
          <h1 className="text-xs sm:text-sm font-semibold tracking-widest text-amber-700 uppercase">Assessment Complete</h1>
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-serif font-bold text-slate-900 tracking-tight">
            {assessment.title}
          </h2>
          <div className="w-16 h-px bg-amber-600 mx-auto mt-4 sm:mt-6"></div>
        </div>

        {/* Score Card */}
        <div className="bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 overflow-hidden print:shadow-none print:border-none relative">
          <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700"></div>
          <div className="bg-slate-900 px-4 py-8 sm:px-8 sm:py-12 text-center text-white print:text-black print:bg-gray-100 print:border print:border-gray-300 print:rounded-t-2xl">
            <h3 className="text-lg sm:text-xl font-serif font-medium mb-3 sm:mb-4 text-slate-300">Overall Alignment Score</h3>
            <div className="text-6xl sm:text-7xl font-serif font-bold tracking-tight mb-5 sm:mb-6 text-amber-500">
              {attempt.score}%
            </div>
            <div className="inline-flex items-center px-4 py-2 sm:px-6 sm:py-2.5 rounded-full bg-slate-800 border border-slate-700 text-amber-100 text-sm sm:text-base font-medium tracking-wide print:bg-gray-200 print:text-gray-900 print:border-none shadow-inner">
              <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 mr-2 sm:mr-3 text-amber-500" />
              Profile: {attempt.resultCategory}
            </div>
          </div>
          
          <div className="p-5 sm:p-10 print:p-0 print:pt-6">
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed text-center mb-8 sm:mb-10 font-light max-w-2xl mx-auto">
              Here is the breakdown of your alignment across all 7 Chakras. Focus your attention on the ones marked "Needs Attention" or "Low".
            </p>

            <div className="space-y-6 sm:space-y-8 print:space-y-4">
              <h4 className="text-xl sm:text-2xl font-serif font-bold text-slate-900 flex items-center border-b border-slate-100 pb-3 sm:pb-4">
                <Activity className="w-5 h-5 sm:w-6 sm:h-6 text-amber-600 mr-2 sm:mr-3 print:text-gray-700" />
                Your 7 Chakras
              </h4>
              
              {/* Loop through the chakra scores saved in the DB */}
              {attempt.chakraScores && attempt.chakraScores.map((c: IChakraScore, idx: number) => (
                <div key={idx} className="bg-[#f9f8f6] rounded-xl p-4 sm:p-6 border border-slate-100 print:bg-white print:border-gray-200 hover:shadow-md transition-shadow">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-3 sm:mb-4 gap-2 sm:gap-0">
                    <span className="font-serif font-bold text-base sm:text-lg text-slate-900">{c.chakra}</span>
                    <span className="text-xs sm:text-sm font-medium text-slate-700 bg-white px-3 py-1 sm:px-4 sm:py-1.5 rounded-full shadow-sm border border-slate-100 print:shadow-none print:border-none w-max">
                      {c.interpretation} <span className="text-amber-700 font-bold ml-1">({c.percentage}%)</span>
                    </span>
                  </div>
                  
                  {/* Progress Bar */}
                  <div className="w-full bg-slate-200 rounded-full h-2 mb-5 print:bg-gray-100">
                    <div 
                      className={`h-2 rounded-full ${getChakraColor(c.percentage)} transition-all duration-1000 ease-out`} 
                      style={{ width: `${Math.min(100, Math.max(0, c.percentage))}%` }}
                    ></div>
                  </div>
                  
                  <p className="text-sm text-slate-600 leading-relaxed mb-3 font-light">
                    {getChakraExplanation(c.chakra, c.interpretation).short}
                  </p>

                  <div className="text-xs font-medium text-slate-400 text-right uppercase tracking-wider">
                    Raw Score: {c.score} / {c.maxScore}
                  </div>
                </div>
              ))}
              {(!attempt.chakraScores || attempt.chakraScores.length === 0) && (
                <div className="text-center text-gray-500 italic py-4">
                  No detailed Chakra scores available for this attempt.
                </div>
              )}

            </div>
          </div>
        </div>

        {/* Detailed Explanation Section */}
        {attempt.chakraScores && attempt.chakraScores.length > 0 && (
          <div className="bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 overflow-hidden print:shadow-none print:border-none p-6 sm:p-10 print:p-0 mt-8 sm:mt-12 print:mt-12 break-inside-avoid relative">
            <div className="absolute top-0 left-0 w-full h-1 bg-amber-200"></div>
            <h4 className="text-xl sm:text-2xl font-serif font-bold text-slate-900 border-b border-slate-100 pb-4 sm:pb-5 mb-6 sm:mb-8 print:border-gray-300">
              In-Depth Analysis
            </h4>
            <div className="space-y-8 sm:space-y-10">
              {attempt.chakraScores.map((c: IChakraScore, idx: number) => (
                <div key={idx} className="break-inside-avoid">
                  <h5 className="text-lg sm:text-xl font-serif font-bold text-slate-800 mb-2 sm:mb-3 flex items-center">
                    <span className={`w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full mr-3 sm:mr-4 ${getChakraColor(c.percentage)} shadow-sm`}></span>
                    {c.chakra} <span className="mx-1.5 sm:mx-2 text-slate-300 font-sans font-light">|</span> <span className="text-amber-700 italic">{c.interpretation}</span>
                  </h5>
                  <p className="text-sm sm:text-base text-slate-600 leading-relaxed pl-5 sm:pl-7 font-light">
                    {getChakraExplanation(c.chakra, c.interpretation).long}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-6 print:hidden pt-4 sm:pt-8 pb-10 sm:pb-16">
          <PrintButton />
          <Link
            href={`/assessment/${slug}`}
            className="inline-flex items-center justify-center px-6 py-3 sm:px-8 sm:py-3.5 border-2 border-slate-200 shadow-sm text-sm sm:text-base font-medium rounded text-slate-700 bg-white hover:bg-slate-50 hover:border-slate-300 transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-200"
          >
            <RotateCcw className="w-4 h-4 sm:w-5 sm:h-5 mr-2 sm:mr-3 text-slate-400" />
            Retake Assessment
          </Link>
          <Link
            href="/"
            className="inline-flex items-center justify-center px-6 py-3 sm:px-8 sm:py-3.5 border border-transparent shadow-md text-sm sm:text-base font-medium rounded text-white bg-slate-900 hover:bg-slate-800 hover:shadow-lg transition-all hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-900"
          >
            Back to Home
            <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2 sm:ml-3" />
          </Link>
        </div>

      </div>
    </div>
  );
}
