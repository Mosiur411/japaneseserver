"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LessonController = void 0;
const snedResponse_1 = __importDefault(require("../../utils/snedResponse"));
const trycatchAsyns_1 = __importDefault(require("../../utils/trycatchAsyns"));
const vocabulary_model_1 = require("../vocabulary/vocabulary.model");
const lesson_model_1 = require("./lesson.model");
const createLesson = (0, trycatchAsyns_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    if (!data) {
        throw new Error("Lesson data is required!");
    }
    const result = yield lesson_model_1.LessonModel.create(data);
    (0, snedResponse_1.default)(res, {
        statusCode: 201,
        success: true,
        message: 'Lesson create successful',
        data: result,
    });
}));
const getLesson = (0, trycatchAsyns_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Extract query parameters
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const sort = req.query.sort || "createdAt";
    if (!page || !limit || !sort) {
        throw new Error("page and limit or sort qurey required!");
    }
    // Calculate pagination values
    const skip = (page - 1) * limit;
    // Fetch lessons with pagination and sorting
    const lessons = yield lesson_model_1.LessonModel.find({})
        .sort(sort)
        .skip(skip)
        .limit(limit);
    // Count total documents for pagination metadata
    const totalLessons = yield lesson_model_1.LessonModel.countDocuments({});
    // Respond with data and pagination info
    (0, snedResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: 'Lessons fetched successfully.',
        data: { lessons, totalPages: Math.ceil(totalLessons / limit), },
    });
}));
const updateLesson = (0, trycatchAsyns_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    if (!(data === null || data === void 0 ? void 0 : data._id) || !data) {
        throw new Error("Lesson body data  is required!");
    }
    const updatelesson = yield lesson_model_1.LessonModel.findByIdAndUpdate(data._id, data, { new: true, runValidators: true });
    (0, snedResponse_1.default)(res, {
        statusCode: 201,
        success: true,
        message: 'Lesson update successful',
        data: updatelesson,
    });
}));
const getSingleLesson = (0, trycatchAsyns_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { _id } = req.params;
    if (!_id) {
        throw new Error("Lesson id not found!");
    }
    const result = yield lesson_model_1.LessonModel.findById(_id);
    (0, snedResponse_1.default)(res, {
        statusCode: 201,
        success: true,
        message: 'Lesson find successful',
        data: result,
    });
}));
const deleteLesson = (0, trycatchAsyns_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { _id } = req.params;
    if (!_id) {
        throw new Error("Lesson id not found!");
    }
    const lessonFind = yield lesson_model_1.LessonModel.findById(_id).select('lessonNo');
    const result = yield lesson_model_1.LessonModel.deleteOne({ _id: _id });
    yield vocabulary_model_1.VocabularyModel.deleteMany({ lessonNo: lessonFind === null || lessonFind === void 0 ? void 0 : lessonFind.lessonNo });
    (0, snedResponse_1.default)(res, {
        statusCode: 201,
        success: true,
        message: 'Lesson Delete successful',
        data: result,
    });
}));
exports.LessonController = { createLesson, updateLesson, getSingleLesson, deleteLesson, getLesson };
