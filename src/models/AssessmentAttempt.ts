import mongoose, { Schema, Document, Model, Types } from 'mongoose';

export interface IAnswer {
  questionId: Types.ObjectId;
  selectedOptionIndex: number;
}

export interface IChakraScore {
  chakra: string;
  score: number;
  maxScore: number;
  percentage: number;
  interpretation: string;
}

export interface IAssessmentAttempt extends Document {
  userId?: Types.ObjectId;
  assessmentId: Types.ObjectId;
  answers: IAnswer[];
  score: number;
  resultCategory: string;
  chakraScores?: IChakraScore[];
  startedAt: Date;
  completedAt: Date;
}

const AnswerSchema: Schema<IAnswer> = new Schema({
  questionId: { type: Schema.Types.ObjectId, ref: 'Question', required: true },
  selectedOptionIndex: { type: Number, required: true },
});

const ChakraScoreSchema: Schema<IChakraScore> = new Schema({
  chakra: { type: String, required: true },
  score: { type: Number, required: true },
  maxScore: { type: Number, required: true },
  percentage: { type: Number, required: true },
  interpretation: { type: String, required: true },
});

const AssessmentAttemptSchema: Schema<IAssessmentAttempt> = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
    assessmentId: { type: Schema.Types.ObjectId, ref: 'Assessment', required: true },
    answers: { type: [AnswerSchema], required: true },
    score: { type: Number, required: true },
    resultCategory: { type: String, required: true },
    chakraScores: { type: [ChakraScoreSchema] },
    startedAt: { type: Date, required: true },
    completedAt: { type: Date },
  },
  { timestamps: true }
);

export const AssessmentAttempt = mongoose.models.AssessmentAttempt as Model<IAssessmentAttempt> || mongoose.model<IAssessmentAttempt>('AssessmentAttempt', AssessmentAttemptSchema);
