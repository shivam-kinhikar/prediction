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
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 print:bg-white print:py-0">
      <div className="max-w-3xl mx-auto space-y-8 print:space-y-4">
        
        {/* Header Section */}
        <div className="text-center space-y-2 print:mt-8">
          <h1 className="text-sm font-semibold tracking-wide text-indigo-600 uppercase">Assessment Complete</h1>
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            {assessment.title}
          </h2>
        </div>

        {/* Score Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden print:shadow-none print:border-none">
          <div className="bg-indigo-600 px-6 py-8 text-center text-white print:text-black print:bg-gray-100 print:border print:border-gray-300 print:rounded-t-2xl">
            <h3 className="text-xl font-medium mb-2">Overall Alignment Score</h3>
            <div className="text-6xl font-extrabold tracking-tight mb-2">
              {attempt.score}%
            </div>
            <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-white/20 text-white font-medium print:bg-gray-200 print:text-gray-900">
              <TrendingUp className="w-4 h-4 mr-2" />
              Profile: {attempt.resultCategory}
            </div>
          </div>
          
          <div className="p-8 print:p-0 print:pt-6">
            <p className="text-lg text-gray-700 leading-relaxed text-center mb-8">
              Here is the breakdown of your alignment across all 7 Chakras. Focus your attention on the ones marked &quot;Needs Attention&quot; or &quot;Low&quot;!
            </p>

            <div className="space-y-6 print:space-y-4">
              <h4 className="text-xl font-bold text-gray-900 flex items-center border-b pb-2">
                <Activity className="w-5 h-5 text-indigo-500 mr-2 print:text-gray-700" />
                Your 7 Chakras
              </h4>
              
              {/* Loop through the chakra scores saved in the DB */}
              {attempt.chakraScores && attempt.chakraScores.map((c: IChakraScore, idx: number) => (
                <div key={idx} className="bg-gray-50 rounded-lg p-5 border border-gray-100 print:bg-white print:border-gray-200">
                  <div className="flex justify-between items-center mb-3">
                    <span className="font-bold text-gray-900">{c.chakra}</span>
                    <span className="text-sm font-semibold text-gray-700 bg-white px-3 py-1 rounded-full shadow-sm border border-gray-100 print:shadow-none print:border-none">
                      {c.interpretation} ({c.percentage}%)
                    </span>
                  </div>
                  
                  {/* Progress Bar */}
                  <div className="w-full bg-gray-200 rounded-full h-3 mb-4 print:bg-gray-100">
                    <div 
                      className={`h-3 rounded-full ${getChakraColor(c.percentage)}`} 
                      style={{ width: `${Math.min(100, Math.max(0, c.percentage))}%` }}
                    ></div>
                  </div>
                  
                  <p className="text-sm text-gray-600 leading-relaxed mb-2">
                    {getChakraExplanation(c.chakra, c.interpretation).short}
                  </p>

                  <div className="text-xs font-medium text-gray-400 text-right">
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
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden print:shadow-none print:border-none p-8 print:p-0 mt-8 print:mt-12 break-inside-avoid">
            <h4 className="text-xl font-bold text-gray-900 border-b pb-4 mb-6 print:border-gray-300">
              In-Depth Analysis
            </h4>
            <div className="space-y-8">
              {attempt.chakraScores.map((c: IChakraScore, idx: number) => (
                <div key={idx} className="break-inside-avoid">
                  <h5 className="text-lg font-bold text-gray-800 mb-2 flex items-center">
                    <span className={`w-3 h-3 rounded-full mr-3 ${getChakraColor(c.percentage)}`}></span>
                    {c.chakra} — {c.interpretation}
                  </h5>
                  <p className="text-gray-700 leading-relaxed text-md pl-6">
                    {getChakraExplanation(c.chakra, c.interpretation).long}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-4 print:hidden">
          <PrintButton />
          <Link
            href={`/assessment/${slug}`}
            className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 shadow-sm text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            Retake Assessment
          </Link>
          <Link
            href="/"
            className="inline-flex items-center justify-center px-6 py-3 border border-transparent shadow-sm text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
          >
            Back to Home
            <ArrowRight className="w-4 h-4 ml-2" />
          </Link>
        </div>

      </div>
    </div>
  );
}
