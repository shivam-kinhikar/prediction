import { NextResponse } from "next/server";
import { z } from "zod";
import dbConnect from "@/lib/db";
import { Assessment } from "@/models/Assessment";
import { Question } from "@/models/Question";
import { AssessmentAttempt } from "@/models/AssessmentAttempt";
import { calculateScore } from "@/services/scoring.service";

// Zod schema to validate incoming frontend data
const attemptSchema = z.object({
  answers: z.record(z.string(), z.number()) // Validates an object like: { "64fa1...": 2 }
});

export async function POST(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    await dbConnect();
    
    // 1. Validate payload using Zod
    const body = await request.json();
    const validatedData = attemptSchema.safeParse(body);
    
    if (!validatedData.success) {
      return NextResponse.json(
        { error: "Invalid data format", details: validatedData.error.format() }, 
        { status: 400 }
      );
    }

    // 2. Find the assessment
    const assessment = await Assessment.findOne({ slug }).lean();
    if (!assessment) {
      return NextResponse.json({ error: "Assessment not found" }, { status: 404 });
    }

    // 3. Fetch all questions from the DB to get the true, hidden weights
    const questions = await Question.find({ assessmentId: assessment._id }).lean();

    // 4. Format answers into an array for our scoring service
    const formattedAnswers = Object.entries(validatedData.data.answers).map(([questionId, selectedOptionIndex]) => ({
      questionId,
      selectedOptionIndex
    }));

    // 5. Calculate Score securely on the server!
    const result = calculateScore(formattedAnswers, questions);

    // 6. Save the attempt to MongoDB
    const attempt = await AssessmentAttempt.create({
      assessmentId: assessment._id,
      answers: formattedAnswers,
      score: result.percentage, 
      resultCategory: result.resultCategory,
      chakraScores: result.chakraScores,
      startedAt: new Date(), // In a real app, track start time on frontend
      completedAt: new Date()
    });

    // 7. Return success and the ID so the frontend can redirect
    return NextResponse.json({ 
      success: true, 
      attemptId: attempt._id 
    });

  } catch (error) {
    console.error("Submission error:", error);
    return NextResponse.json(
      { error: "Failed to submit assessment" }, 
      { status: 500 }
    );
  }
}
