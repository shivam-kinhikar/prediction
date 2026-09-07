import Link from "next/link";
import { ArrowRight, Clock, ShieldAlert } from "lucide-react";
import { notFound } from "next/navigation";

// Define the shape of our data
interface AssessmentData {
  assessment: {
    title: string;
    description: string;
    instructions: string;
  };
}

import dbConnect from "@/lib/db";
import { Assessment } from "@/models/Assessment";

async function getAssessment(slug: string) {
  try {
    await dbConnect();
    
    // Find the published assessment
    const assessment = await Assessment.findOne({ 
      slug,
      status: "PUBLISHED"
    }).lean();
    
    if (!assessment) return null;
    
    // We stringify and parse to remove any complex MongoDB ObjectIds that 
    // React Server Components can't serialize properly.
    return { assessment: JSON.parse(JSON.stringify(assessment)) };
  } catch (error: any) {
    console.error("Database error in getAssessment:", error.message);
    // Throwing here will let Next.js Error boundary handle it, 
    // or we can return null to show a 404. Let's throw so the developer sees the real error.
    throw new Error(`Database connection failed: ${error.message}`);
  }
}

export default async function AssessmentStartPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const data = await getAssessment(slug);

  // If the API returns 404, we show the Next.js not-found page
  if (!data) {
    notFound();
  }

  const { assessment } = data;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl w-full bg-white rounded-xl shadow-sm p-8 border border-gray-100 mt-10">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold text-gray-900 mb-4">{assessment.title}</h1>
          <p className="text-lg text-gray-600">{assessment.description}</p>
        </div>

        <div className="bg-indigo-50 rounded-lg p-6 mb-8 border border-indigo-100">
          <h2 className="text-lg font-semibold text-indigo-900 mb-3 flex items-center">
            <ShieldAlert className="w-5 h-5 mr-2" />
            Instructions
          </h2>
          <p className="text-indigo-800 leading-relaxed">
            {assessment.instructions}
          </p>
          <div className="mt-4 flex items-center text-indigo-700 font-medium">
            <Clock className="w-5 h-5 mr-2" />
            Estimated time: 5-10 minutes
          </div>
        </div>

        <div className="flex justify-center">
          <Link
            href={`/assessment/${slug}/questions`}
            className="inline-flex items-center justify-center px-8 py-4 text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:text-lg transition-colors shadow-sm w-full sm:w-auto"
          >
            Start Assessment
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
