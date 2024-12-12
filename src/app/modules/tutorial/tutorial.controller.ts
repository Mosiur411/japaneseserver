import sentResponse from "../../utils/snedResponse";
import trycatchAsyns from "../../utils/trycatchAsyns";
import { TutorialModel } from "./tutorial.model";

const createTutorial = trycatchAsyns(async (req, res) => {
    const data = req.body;
    if (!data) {
        throw new Error("Tutorial data is required!");
    }
    const result = await TutorialModel.create(data);
    sentResponse(res, {
        statusCode: 201,
        success: true,
        message: 'Tutorial create successful',
        data: result,
    });
});
const getTutorial = trycatchAsyns(async (req, res) => {
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
    const tutorial = await TutorialModel.find({})
        .sort(sort)
        .skip(skip)
        .limit(limit);

    // Count total documents for pagination metadata
    const totalTutorial = await TutorialModel.countDocuments({});

    // Respond with data and pagination info
    sentResponse(res, {
        statusCode: 200,
        success: true,
        message: 'Tutorial fetched successfully.',
        data: { tutorial, totalPages: Math.ceil(totalTutorial / limit), },
    });

});
const updateTutorial = trycatchAsyns(async (req, res) => {
    const data = req.body;
    if (!data?._id || !data) {
        throw new Error("Tutorial body data  is required!");
    }
    const updatetutorial = await TutorialModel.findByIdAndUpdate(data._id, data, { new: true, runValidators: true });
    sentResponse(res, {
        statusCode: 201,
        success: true,
        message: 'Tutorial update successful',
        data: updatetutorial,
    });

});
const getSingleTutorial = trycatchAsyns(async (req, res) => {
    const { _id } = req.params;
    if (!_id) {
        throw new Error("Tutorial id not found!");
    }
    const result = await TutorialModel.findById(_id);
    sentResponse(res, {
        statusCode: 201,
        success: true,
        message: 'Tutorial find successful',
        data: result,
    });
});
const deleteTutorial = trycatchAsyns(async (req, res) => {
    const { _id } = req.params;
    if (!_id) {
        throw new Error("Tutorial id not found!");
    }
    const result = await TutorialModel.deleteOne({ _id: _id });
    sentResponse(res, {
        statusCode: 201,
        success: true,
        message: 'Tutorial Delete successful',
        data: result,
    });

});



export const TutorialController = { createTutorial,getTutorial,updateTutorial,getSingleTutorial,deleteTutorial }