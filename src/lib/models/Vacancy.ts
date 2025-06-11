import mongoose, { Schema, Document, models, model } from 'mongoose';

export interface IVacancy extends Document {
  title: string;
  location: string;
  type: 'Full-time' | 'Part-time' | 'Contract' | 'Internship';
  description: string;
  createdAt: Date;
}

const VacancySchema: Schema = new Schema({
  title: { type: String, required: true },
  location: { type: String, required: true },
  type: { type: String, required: true, enum: ['Full-time', 'Part-time', 'Contract', 'Internship'] },
  description: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

export default models.Vacancy || model<IVacancy>('Vacancy', VacancySchema);