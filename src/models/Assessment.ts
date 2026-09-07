import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IAssessment extends Document {
  title: string;
  slug: string;
  description: string;
  instructions: string;
  status: 'DRAFT' | 'PUBLISHED';
  createdAt: Date;
  updatedAt: Date;
}

const AssessmentSchema: Schema<IAssessment> = new Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    instructions: { type: String, required: true },
    status: { type: String, enum: ['DRAFT', 'PUBLISHED'], default: 'DRAFT' },
  },
  { timestamps: true }
);

export const Assessment = mongoose.models.Assessment as Model<IAssessment> || mongoose.model<IAssessment>('Assessment', AssessmentSchema);
