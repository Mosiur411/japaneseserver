"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TutorialModel = void 0;
const mongoose_1 = require("mongoose");
const tutorialSchema = new mongoose_1.Schema({
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
            validator: function (value) {
                const regex = /^https:\/\/www\.youtube\.com\/watch\?v=[a-zA-Z0-9_-]+$/;
                return regex.test(value);
            },
            message: 'Invalid YouTube link format.',
        },
    }
}, {
    timestamps: true,
});
// Export the model
exports.TutorialModel = (0, mongoose_1.model)('Tutorial', tutorialSchema);
