import { calculateScore, AnswerPayload } from "./scoring.service";
import mongoose from "mongoose";

describe("Scoring Service", () => {
  const mockQuestions = [
    {
      _id: new mongoose.Types.ObjectId("64e4b9e2f1a2b3c4d5e6f7a8"),
      questionText: "Test Q1",
      category: "Root Chakra - Muladhara",
      options: [
        { text: "Needs Attention", weight: 1 },
        { text: "Strong", weight: 5 },
      ]
    },
    {
      _id: new mongoose.Types.ObjectId("64e4b9e2f1a2b3c4d5e6f7a9"),
      questionText: "Test Q2",
      category: "Heart Chakra - Anahata",
      options: [
        { text: "Needs Attention", weight: 1 },
        { text: "Strong", weight: 5 },
      ]
    }
  ];

  it("should calculate 100% and 'Strong' for all highest weight answers", () => {
    const answers: AnswerPayload[] = [
      { questionId: mockQuestions[0]._id.toString(), selectedOptionIndex: 1 }, // weight 5
      { questionId: mockQuestions[1]._id.toString(), selectedOptionIndex: 1 }, // weight 5
    ];

    const result = calculateScore(answers, mockQuestions);

    expect(result.totalScore).toBe(10); 
    expect(result.maxPossibleScore).toBe(10);
    expect(result.percentage).toBe(100);
    expect(result.resultCategory).toBe("Strong");
    expect(result.chakraScores.length).toBe(2);
    expect(result.chakraScores[0].chakra).toBe("Root Chakra - Muladhara");
    expect(result.chakraScores[0].score).toBe(5);
  });

  it("should calculate correct percentage for mixed answers", () => {
    const answers: AnswerPayload[] = [
      { questionId: mockQuestions[0]._id.toString(), selectedOptionIndex: 0 }, // weight 1
      { questionId: mockQuestions[1]._id.toString(), selectedOptionIndex: 0 }, // weight 1
    ];

    const result = calculateScore(answers, mockQuestions);

    expect(result.totalScore).toBe(2);
    // Max possible is 10. 2/10 = 20%
    expect(result.percentage).toBe(20);
    expect(result.resultCategory).toBe("Needs Attention");
  });

  it("should handle missing answers gracefully", () => {
    const answers: AnswerPayload[] = [
      { questionId: mockQuestions[0]._id.toString(), selectedOptionIndex: 1 }, // weight 5
      // Missed Q2
    ];

    const result = calculateScore(answers, mockQuestions);

    expect(result.totalScore).toBe(5);
    // Max possible is still 10. 5/10 = 50%
    expect(result.percentage).toBe(50);
    expect(result.resultCategory).toBe("Low");
  });
});
