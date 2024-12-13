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
exports.VocabularyController = void 0;
const snedResponse_1 = __importDefault(require("../../utils/snedResponse"));
const trycatchAsyns_1 = __importDefault(require("../../utils/trycatchAsyns"));
const lesson_model_1 = require("../lesson/lesson.model");
const vocabulary_model_1 = require("./vocabulary.model");
const createVocabulary = (0, trycatchAsyns_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    const user = req.user;
    if (!data || !user) {
        throw new Error("Vocabulary data is not found!");
    }
    const checklesson = yield lesson_model_1.LessonModel.findOne({ lessonNo: data === null || data === void 0 ? void 0 : data.lessonNo });
    if (!checklesson) {
        throw new Error("Invalid lesson number!");
    }
    data.email = user === null || user === void 0 ? void 0 : user.email;
    const result = yield vocabulary_model_1.VocabularyModel.create(data);
    yield lesson_model_1.LessonModel.updateOne({ _id: checklesson === null || checklesson === void 0 ? void 0 : checklesson._id }, // Find the lesson by its lessonNo
    { $inc: { vocabularyCount: 1 } } // Increment vocabularyCount by 1
    );
    (0, snedResponse_1.default)(res, {
        statusCode: 201,
        success: true,
        message: 'Vocabulary add successful',
        data: result,
    });
}));
const getVocabulary = (0, trycatchAsyns_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
    const vocabular = yield vocabulary_model_1.VocabularyModel.find({})
        .sort({ _id: -1 })
        .skip(skip)
        .limit(limit);
    // Count total documents for pagination metadata
    const totalVocabular = yield vocabulary_model_1.VocabularyModel.countDocuments({});
    // Respond with data and pagination info
    (0, snedResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: 'Vocabular fetched successfully.',
        data: { vocabular, totalPages: Math.ceil(totalVocabular / limit), },
    });
}));
const updateVocabulary = (0, trycatchAsyns_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    if (!(data === null || data === void 0 ? void 0 : data._id) || !data) {
        throw new Error("Invalid not found");
    }
    const result = yield vocabulary_model_1.VocabularyModel.findByIdAndUpdate(data === null || data === void 0 ? void 0 : data._id, data.updateData, { new: true, runValidators: true });
    (0, snedResponse_1.default)(res, {
        statusCode: 201,
        success: true,
        message: 'Vocabulary uodate successful',
        data: result,
    });
}));
const getSingleVocabulary = (0, trycatchAsyns_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { lessonNo } = req.params;
    if (!lessonNo) {
        throw new Error("Invalid lesson number!");
    }
    const result = yield vocabulary_model_1.VocabularyModel.find({ lessonNo: lessonNo });
    (0, snedResponse_1.default)(res, {
        statusCode: 201,
        success: true,
        message: 'Vocabulary add successful',
        data: result,
    });
}));
const deleteVocabulary = (0, trycatchAsyns_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { _id } = req.params;
    if (!_id) {
        throw new Error("Invalid vocabulary number!");
    }
    const checklesson = yield vocabulary_model_1.VocabularyModel.findById(_id);
    if (!checklesson) {
        throw new Error("Invalid lesson number!");
    }
    const result = yield vocabulary_model_1.VocabularyModel.deleteOne({ _id: _id });
    yield lesson_model_1.LessonModel.updateOne({ lessonNo: checklesson === null || checklesson === void 0 ? void 0 : checklesson.lessonNo }, { $inc: { vocabularyCount: -1 } });
    (0, snedResponse_1.default)(res, {
        statusCode: 201,
        success: true,
        message: 'Vocabulary delete successful',
        data: result,
    });
}));
exports.VocabularyController = { createVocabulary, updateVocabulary, getSingleVocabulary, deleteVocabulary, getVocabulary };
