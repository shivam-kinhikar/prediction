import mongoose, { Schema, Document, Model, Types } from 'mongoose';

export interface IOption {
  text: string;
  weight: number;
}

export interface IQuestion extends Document {
  assessmentId: Types.ObjectId;
  questionText: string;
  questionType: 'MULTIPLE_CHOICE';
  category?: string;
  options: IOption[];
  order: number;
}

const OptionSchema: Schema<IOption> = new Schema({
  text: { type: String, required: true },
  weight: { type: Number, required: true },
});

const QuestionSchema: Schema<IQuestion> = new Schema(
  {
    assessmentId: { type: Schema.Types.ObjectId, ref: 'Assessment', required: true },
    questionText: { type: String, required: true },
    questionType: { type: String, enum: ['MULTIPLE_CHOICE'], default: 'MULTIPLE_CHOICE' },
    category: { type: String },
    options: { type: [OptionSchema], required: true },
    order: { type: Number, required: true },
  },
  { timestamps: true }
);

export const Question = mongoose.models.Question as Model<IQuestion> || mongoose.model<IQuestion>('Question', QuestionSchema);
