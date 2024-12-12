"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LessonModel = void 0;
const mongoose_1 = require("mongoose");
const lessonSchema = new mongoose_1.Schema({
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
            validator: function (lessonNo) {
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
}, {
    timestamps: true,
});
// Export the model
exports.LessonModel = (0, mongoose_1.model)('Lesson', lessonSchema);
