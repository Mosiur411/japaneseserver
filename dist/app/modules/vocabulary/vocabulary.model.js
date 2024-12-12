"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VocabularyModel = void 0;
const mongoose_1 = require("mongoose");
const vocabularySchema = new mongoose_1.Schema({
    word: {
        type: String,
        required: [true, 'Word is required'],
        minlength: [2, 'Word must be at least 2 characters long'],
        maxlength: [50, 'Word cannot exceed 50 characters'],
    },
    description: {
        type: String,
        required: [true, 'Description is required'],
        minlength: [5, 'Description must be at least 5 characters long'],
    },
    lessonNo: {
        type: String,
        required: [true, 'Lesson number is required'],
        validate: {
            validator: function (lessonNo) {
                return /^[a-zA-Z0-9-]+$/.test(lessonNo); // Alphanumeric and hyphen format
            },
            message: 'Lesson number can only contain letters, numbers, and hyphens',
        },
    },
    status: {
        type: Boolean,
        required: [true, 'Status is required'],
        default: true,
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        validate: {
            validator: function (email) {
                return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email); // Basic email format validation
            },
            message: 'Please provide a valid email address',
        },
    },
}, {
    timestamps: true,
});
// Export the model
exports.VocabularyModel = (0, mongoose_1.model)('Vocabulary', vocabularySchema);
