import mongoose, { Schema, Document, Model, Types } from 'mongoose';

export interface IOption {
  text: string;
  textMarathi?: string;
  weight: number;
}

export interface IQuestion extends Document {
  assessmentId: Types.ObjectId;
  questionText: string;
  questionTextMarathi?: string;
  questionType: 'MULTIPLE_CHOICE';
  category?: string;
  options: IOption[];
  order: number;
}

const OptionSchema: Schema<IOption> = new Schema({
  text: { type: String, required: true },
  textMarathi: { type: String },
  weight: { type: Number, required: true },
});

const QuestionSchema: Schema<IQuestion> = new Schema(
  {
    assessmentId: { type: Schema.Types.ObjectId, ref: 'Assessment', required: true },
    questionText: { type: String, required: true },
    questionTextMarathi: { type: String },
    questionType: { type: String, enum: ['MULTIPLE_CHOICE'], default: 'MULTIPLE_CHOICE' },
    category: { type: String },
    options: { type: [OptionSchema], required: true },
    order: { type: Number, required: true },
  },
  { timestamps: true }
);

// Force Next.js to reload the schema by deleting the cached model
if (mongoose.models.Question) {
  delete mongoose.models.Question;
}

export const Question = mongoose.model<IQuestion>('Question', QuestionSchema);
