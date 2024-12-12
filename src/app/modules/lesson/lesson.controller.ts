import sentResponse from "../../utils/snedResponse";
import trycatchAsyns from "../../utils/trycatchAsyns";
import { VocabularyModel } from "../vocabulary/vocabulary.model";
import { LessonModel } from "./lesson.model";

const createLesson = trycatchAsyns(async (req, res) => {
    const data = req.body;
    if (!data) {
        throw new Error("Lesson data is required!");
    }
    const result = await LessonModel.create(data);
    sentResponse(res, {
        statusCode: 201,
        success: true,
        message: 'Lesson create successful',
        data: result,
    });
});
const getLesson = trycatchAsyns(async (req, res) => {
    // Extract query parameters
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const sort = req.query.sort as string || "createdAt";
    if (!page || !limit || !sort) {
        throw new Error("page and limit or sort qurey required!");
    }


    // Calculate pagination values
    const skip = (page - 1) * limit;

    // Fetch lessons with pagination and sorting
    const lessons = await LessonModel.find({})
        .sort({ _id: -1 })
        .skip(skip)
        .limit(limit);

    // Count total documents for pagination metadata
    const totalLessons = await LessonModel.countDocuments({});

    // Respond with data and pagination info
    sentResponse(res, {
        statusCode: 200,
        success: true,
        message: 'Lessons fetched successfully.',
        data: { lessons, totalPages: Math.ceil(totalLessons / limit), },
    });

});
const updateLesson = trycatchAsyns(async (req, res) => {
    const data = req.body;
    if (!data?._id || !data) {
        throw new Error("Lesson body data  is required!");
    }
    const updatelesson = await LessonModel.findByIdAndUpdate(data._id, data, { new: true, runValidators: true });
    sentResponse(res, {
        statusCode: 201,
        success: true,
        message: 'Lesson update successful',
        data: updatelesson,
    });

});
const getSingleLesson = trycatchAsyns(async (req, res) => {
    const { _id } = req.params;
    if (!_id) {
        throw new Error("Lesson id not found!");
    }
    const result = await LessonModel.findById(_id);
    sentResponse(res, {
        statusCode: 201,
        success: true,
        message: 'Lesson find successful',
        data: result,
    });
});
const deleteLesson = trycatchAsyns(async (req, res) => {
    const { _id } = req.params;
    if (!_id) {
        throw new Error("Lesson id not found!");
    }
    const lessonFind = await LessonModel.findById(_id).select('lessonNo')
    const result = await LessonModel.deleteOne({ _id: _id });
    await VocabularyModel.deleteMany({ lessonNo: lessonFind?.lessonNo });
    sentResponse(res, {
        statusCode: 201,
        success: true,
        message: 'Lesson Delete successful',
        data: result,
    });

});



export const LessonController = { createLesson, updateLesson, getSingleLesson, deleteLesson, getLesson }