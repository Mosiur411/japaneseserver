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
exports.TutorialController = void 0;
const snedResponse_1 = __importDefault(require("../../utils/snedResponse"));
const trycatchAsyns_1 = __importDefault(require("../../utils/trycatchAsyns"));
const tutorial_model_1 = require("./tutorial.model");
const createTutorial = (0, trycatchAsyns_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    if (!data) {
        throw new Error("Tutorial data is required!");
    }
    const result = yield tutorial_model_1.TutorialModel.create(data);
    (0, snedResponse_1.default)(res, {
        statusCode: 201,
        success: true,
        message: 'Tutorial create successful',
        data: result,
    });
}));
const getTutorial = (0, trycatchAsyns_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
    const tutorial = yield tutorial_model_1.TutorialModel.find({})
        .sort(sort)
        .skip(skip)
        .limit(limit);
    // Count total documents for pagination metadata
    const totalTutorial = yield tutorial_model_1.TutorialModel.countDocuments({});
    // Respond with data and pagination info
    (0, snedResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: 'Tutorial fetched successfully.',
        data: { tutorial, totalPages: Math.ceil(totalTutorial / limit), },
    });
}));
const updateTutorial = (0, trycatchAsyns_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    if (!(data === null || data === void 0 ? void 0 : data._id) || !data) {
        throw new Error("Tutorial body data  is required!");
    }
    const updatetutorial = yield tutorial_model_1.TutorialModel.findByIdAndUpdate(data._id, data, { new: true, runValidators: true });
    (0, snedResponse_1.default)(res, {
        statusCode: 201,
        success: true,
        message: 'Tutorial update successful',
        data: updatetutorial,
    });
}));
const getSingleTutorial = (0, trycatchAsyns_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { _id } = req.params;
    if (!_id) {
        throw new Error("Tutorial id not found!");
    }
    const result = yield tutorial_model_1.TutorialModel.findById(_id);
    (0, snedResponse_1.default)(res, {
        statusCode: 201,
        success: true,
        message: 'Tutorial find successful',
        data: result,
    });
}));
const deleteTutorial = (0, trycatchAsyns_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { _id } = req.params;
    if (!_id) {
        throw new Error("Tutorial id not found!");
    }
    const result = yield tutorial_model_1.TutorialModel.deleteOne({ _id: _id });
    (0, snedResponse_1.default)(res, {
        statusCode: 201,
        success: true,
        message: 'Tutorial Delete successful',
        data: result,
    });
}));
exports.TutorialController = { createTutorial, getTutorial, updateTutorial, getSingleTutorial, deleteTutorial };
