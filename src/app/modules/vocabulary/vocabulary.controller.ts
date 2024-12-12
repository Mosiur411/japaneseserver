import sentResponse from "../../utils/snedResponse";
import trycatchAsyns from "../../utils/trycatchAsyns";
import { LessonModel } from "../lesson/lesson.model";
import { VocabularyModel } from "./vocabulary.model";

const createVocabulary = trycatchAsyns(async (req, res) => {
    const data = req.body;
    const user = (req as any).user;

    if (!data || !user) {
        throw new Error("Vocabulary data is not found!");
    }
    const checklesson = await LessonModel.findOne({ lessonNo: data?.lessonNo })

    if (!checklesson) {
        throw new Error("Invalid lesson number!");
    }
    data.email = user?.email;
    const result = await VocabularyModel.create(data);
    await LessonModel.updateOne(
        { _id: checklesson?._id },  // Find the lesson by its lessonNo
        { $inc: { vocabularyCount: 1 } }  // Increment vocabularyCount by 1
    );
    sentResponse(res, {
        statusCode: 201,
        success: true,
        message: 'Vocabulary add successful',
        data: result,
    });
});
const getVocabulary = trycatchAsyns(async (req, res) => {
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
    const vocabular = await VocabularyModel.find({})
        .sort({_id:-1})
        .skip(skip)
        .limit(limit);

    // Count total documents for pagination metadata
    const totalVocabular = await VocabularyModel.countDocuments({});

    // Respond with data and pagination info
    sentResponse(res, {
        statusCode: 200,
        success: true,
        message: 'Vocabular fetched successfully.',
        data: { vocabular, totalPages: Math.ceil(totalVocabular / limit), },
    });


});
const updateVocabulary = trycatchAsyns(async (req, res) => {
    const data = req.body;
    if (!data?._id || !data) {
        throw new Error("Invalid not found");
    }
    const result = await VocabularyModel.findByIdAndUpdate(data?._id, data.updateData, { new: true, runValidators: true });
    
    sentResponse(res, {
        statusCode: 201,
        success: true,
        message: 'Vocabulary uodate successful',
        data: result,
    });


});
const getSingleVocabulary = trycatchAsyns(async (req, res) => {
    const { lessonNo } = req.params;
    if (!lessonNo) {
        throw new Error("Invalid lesson number!");
    }
    const result = await VocabularyModel.find({ lessonNo: lessonNo });
    sentResponse(res, {
        statusCode: 201,
        success: true,
        message: 'Vocabulary add successful',
        data: result,
    });
});
const deleteVocabulary = trycatchAsyns(async (req, res) => {
    const { _id } = req.params;
    if (!_id) {
        throw new Error("Invalid vocabulary number!");
    }
    const checklesson = await VocabularyModel.findById(_id)

    if (!checklesson) {
        throw new Error("Invalid lesson number!");
    }
    const result = await VocabularyModel.deleteOne({ _id: _id });

    await LessonModel.updateOne(
        { lessonNo: checklesson?.lessonNo },
        { $inc: { vocabularyCount: -1 } }
    );

    sentResponse(res, {
        statusCode: 201,
        success: true,
        message: 'Vocabulary delete successful',
        data: result,
    });
});



export const VocabularyController = { createVocabulary, updateVocabulary, getSingleVocabulary, deleteVocabulary, getVocabulary }