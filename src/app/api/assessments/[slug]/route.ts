import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import { Assessment } from "@/models/Assessment";
import { Question } from "@/models/Question";

export const dynamic = "force-dynamic";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    await dbConnect();

    // 1. Find the assessment by its unique slug
    const assessment = await Assessment.findOne({ 
      slug,
      status: "PUBLISHED" // Only return published assessments to the public
    }).lean();

    if (!assessment) {
      return NextResponse.json(
        { error: "Assessment not found" },
        { status: 404 }
      );
    }

    // 2. Fetch all questions linked to this assessment
    // We sort them by the 'order' field so they appear correctly
    const questions = await Question.find({ assessmentId: assessment._id })
      .sort({ order: 1 })
      .lean();

    // 3. Optional Security Step: 
    // If you don't want to expose the "weight" (answers) to the frontend, 
    // you would map over questions and remove it here. 
    // For this app, we do calculation on backend, so we should NOT send weights to frontend.
    const sanitizedQuestions = questions.map(q => ({
      _id: q._id,
      questionText: q.questionText,
      questionTextMarathi: q.questionTextMarathi,
      options: q.options.map(opt => ({ 
        text: opt.text,
        textMarathi: opt.textMarathi
      })) // omit weight!
    }));

    // Return the combined data
    return NextResponse.json({
      assessment,
      questions: sanitizedQuestions
    });

  } catch (error) {
    console.error("Error fetching assessment:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
