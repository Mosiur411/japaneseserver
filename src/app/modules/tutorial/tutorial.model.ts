import { Schema, model } from 'mongoose';
import { TTutorial } from './tutorial.interface';

const tutorialSchema = new Schema<TTutorial>(
  {
    title: {
      type: String,
      required: [true, 'title is required'],
      minlength: [2, 'title must be at least 2 characters long'],
      maxlength: [50, 'title cannot exceed 50 characters'],
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
      minlength: [5, 'Description must be at least 5 characters long'],
    },
    youtubeLink: {
        type: String,
        required: [true, 'YouTube link is required'],
        minlength: [5, 'YouTube link must be at least 5 characters long'],
        validate: {
          validator: function (value: string) {
            const regex = /^https:\/\/www\.youtube\.com\/watch\?v=[a-zA-Z0-9_-]+$/;
            return regex.test(value);
          },
          message: 'Invalid YouTube link format.',
        },}
  },
  {
    timestamps: true,
  },
);

// Export the model
export const TutorialModel = model<TTutorial>('Tutorial', tutorialSchema);
