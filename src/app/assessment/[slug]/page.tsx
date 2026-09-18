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
    <div className="min-h-screen bg-[#fdfbf7] flex flex-col items-center justify-center py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl w-full bg-white rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-6 md:p-10 border border-slate-100 relative overflow-hidden">
        {/* Subtle decorative top border */}
        <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700"></div>
        
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-serif font-bold text-slate-900 mb-4 tracking-tight leading-tight">{assessment.title}</h1>
          <div className="w-12 h-px bg-amber-600 mx-auto mb-4"></div>
          <p className="text-base md:text-lg text-slate-600 font-light leading-relaxed">{assessment.description}</p>
        </div>

        <div className="bg-[#f9f8f6] rounded-xl p-6 mb-8 border border-slate-200 shadow-inner">
          <h2 className="text-lg font-serif font-semibold text-slate-800 mb-3 flex items-center justify-center">
            <ShieldAlert className="w-5 h-5 mr-3 text-amber-600" />
            Before You Begin
          </h2>
          <p className="text-sm md:text-base text-slate-600 font-light leading-relaxed text-center mb-5">
            {assessment.instructions}
          </p>
          <div className="flex items-center justify-center text-slate-500 font-medium text-xs md:text-sm bg-white py-2 px-5 rounded-full border border-slate-200 mx-auto w-max">
            <Clock className="w-4 h-4 mr-2 text-amber-600" />
            Estimated time: 5-10 minutes
          </div>
        </div>

        <div className="flex justify-center">
          <Link
            href={`/assessment/${slug}/questions`}
            className="inline-flex items-center justify-center px-8 py-3 text-base font-medium rounded text-white bg-amber-700 hover:bg-amber-800 transition-all shadow-md hover:shadow-lg w-full sm:w-auto hover:-translate-y-0.5"
          >
            Start Assessment
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
