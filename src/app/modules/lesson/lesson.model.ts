import { Schema, model } from 'mongoose';
import { TLesson } from './lesson.interface';

const lessonSchema = new Schema<TLesson>(
  {
    title: {
      type: String,
      required: [true, 'Lesson title is required'],
      minlength: [3, 'Lesson title must be at least 3 characters long'],
      maxlength: [100, 'Lesson title cannot exceed 100 characters'],
    },
    lessonNo: {
      type: String,
      required: [true, 'Lesson number is required'],
      unique: true,
      validate: {
        validator: function (lessonNo: string) {
          return /^[a-zA-Z0-9-]+$/.test(lessonNo);
        },
        message: 'Lesson number can only contain letters, numbers, and hyphens',
      },
    },
    status: {
      type: Boolean,
      required: [true, 'Status is required'],
      default: true,
    },
    vocabularyCount: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  {
    timestamps: true,
  },
);

// Export the model
export const LessonModel = model<TLesson>('Lesson', lessonSchema);
