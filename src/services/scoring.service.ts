export interface AnswerPayload {
  questionId: string;
  selectedOptionIndex: number;
}

export interface ChakraScore {
  chakra: string;
  score: number;
  maxScore: number;
  percentage: number;
  interpretation: string;
}

export interface ScoredResult {
  totalScore: number;
  maxPossibleScore: number;
  percentage: number;
  resultCategory: string;
  chakraScores: ChakraScore[];
}

function getChakraInterpretation(score: number): string {
  if (score >= 23) return "Strong";
  if (score >= 20) return "Balanced";
  if (score >= 15) return "Developing";
  if (score >= 10) return "Low";
  return "Needs Attention";
}

/**
 * Reusable scoring service for the Chakra Assessment.
 * Calculates overall score and individual chakra scores.
 */
export function calculateScore(
  answers: AnswerPayload[],
  questionsFromDb: any[] // Array of Mongoose Question documents
): ScoredResult {
  let totalScore = 0;
  let totalMaxPossibleScore = 0;

  // Track scores per chakra category
  const chakraMap: Record<string, { score: number, maxScore: number }> = {};

  for (const dbQuestion of questionsFromDb) {
    const category = dbQuestion.category || "General";
    
    // Initialize category if it doesn't exist
    if (!chakraMap[category]) {
      chakraMap[category] = { score: 0, maxScore: 0 };
    }

    // Determine the maximum possible points someone could get for this question
    const highestWeight = Math.max(...dbQuestion.options.map((o: any) => o.weight));
    chakraMap[category].maxScore += highestWeight;
    totalMaxPossibleScore += highestWeight;

    // Find what the user actually answered
    const userAnswer = answers.find(a => a.questionId === dbQuestion._id.toString());
    
    // Add their points to the total
    if (userAnswer && dbQuestion.options[userAnswer.selectedOptionIndex]) {
      const earnedWeight = dbQuestion.options[userAnswer.selectedOptionIndex].weight;
      chakraMap[category].score += earnedWeight;
      totalScore += earnedWeight;
    }
  }

  // Build the detailed Chakra scores array
  const chakraScores: ChakraScore[] = Object.keys(chakraMap).map(chakraName => {
    const stats = chakraMap[chakraName];
    const percentage = stats.maxScore > 0 ? (stats.score / stats.maxScore) * 100 : 0;
    return {
      chakra: chakraName,
      score: stats.score,
      maxScore: stats.maxScore,
      percentage: Math.round(percentage),
      interpretation: getChakraInterpretation(stats.score)
    };
  });

  // Calculate overall percentage safely
  const percentage = totalMaxPossibleScore > 0 ? (totalScore / totalMaxPossibleScore) * 100 : 0;
  
  // Determine overall category based on average percentage thresholds
  let resultCategory = "Needs Attention";
  if (percentage >= 92) resultCategory = "Strong";
  else if (percentage >= 80) resultCategory = "Balanced";
  else if (percentage >= 60) resultCategory = "Developing";
  else if (percentage >= 40) resultCategory = "Low";

  return {
    totalScore,
    maxPossibleScore: totalMaxPossibleScore,
    percentage: Math.round(percentage),
    resultCategory,
    chakraScores
  };
}
