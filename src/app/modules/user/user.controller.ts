import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import trycatchAsyns from "../../utils/trycatchAsyns"
import { UserModel } from "./user.model";
import config from '../../config';
import sentResponse from '../../utils/snedResponse';

const JWT_SECRET = config.jwt_secret as string

const createUser = trycatchAsyns(async (req, res) => {
    const data = req.body;
    console.log('data',data)
/*     if (!req.file) {
        throw new Error("Profile photo is required!");
    }
    const filepath = (req.file as any).filename;
    const profilePhotoPath = `/uploads/profilePhoto/${filepath}`; */
    const user = new UserModel(data);
    const result = await user.save();;
    sentResponse(res, {
        statusCode: 201,
        success: true,
        message: 'Register successful',
        data: result,
    });
});
const getUser = trycatchAsyns(async (req, res) => {
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
    const result = await UserModel.find({})
        .sort(sort)
        .skip(skip)
        .limit(limit);

    // Count total documents for pagination metadata
    const totaluser = await UserModel.countDocuments({});

    // Respond with data and pagination info


    sentResponse(res, {
        statusCode: 200,
        success: true,
        message: 'User fetched successfully.',
        data: {result,totalPages: Math.ceil(totaluser / limit),},
    });

});
const profileUser = trycatchAsyns(async (req, res) => {
    const user = (req as any).user;
    if (!user) {
        throw new Error("Invalid User!");
    }
    const result = await UserModel.findOne({ _id: user?._id });
    sentResponse(res, {
        statusCode: 201,
        success: true,
        message: 'View profile successful',
        data: result,
    });
});
const profileUpdateUser = trycatchAsyns(async (req, res) => {
    const { _id } = (req as any).user;
    let data = req.body;
    if (!_id || !data) {
        throw new Error("Not body emtry data");
    }
   /*  if (req.file) {
        const filepath = (req.file as any).filename;
        const profilePhotoPath = `/uploads/profilePhoto/${filepath}`;
        data={...data,profilePhoto: profilePhotoPath,}
    } */
    const updatedUser = await UserModel.findByIdAndUpdate(_id, data, { new: true, runValidators: true });

    sentResponse(res, {
        statusCode: 201,
        success: true,
        message: 'Update profile successful',
        data: updatedUser,
    });
});
const adminUpdateUser = trycatchAsyns(async (req, res) => {
    const data = req.body;
    if (!data) {
        throw new Error("Not body emtry data");
    }
    const updatedUser = await UserModel.findByIdAndUpdate(data?._id, data, { new: true, runValidators: true });

    sentResponse(res, {
        statusCode: 201,
        success: true,
        message: 'Update profile successful',
        data: updatedUser,
    });
});
const singleUser = trycatchAsyns(async (req, res) => {
    const { _id } = req.params
    if (!_id) {
        throw new Error("Invalid user Id");
    }
    const result = await UserModel.findById(_id);
    sentResponse(res, {
        statusCode: 201,
        success: true,
        message: 'Update profile successful',
        data: result,
    });
});

const loginUser = trycatchAsyns(async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        throw new Error("Email and password not found!");
    }
    const user = await UserModel.findOne({ email: email })
    if (!user) {
        throw new Error("Invalid email address!");
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        throw new Error("Invalid  password!");
    }
    const token = jwt.sign(
        {
            _id: user._id,
            email: user.email,
            name: user.name,
            role: user.role
        },
        JWT_SECRET,
        { expiresIn: "1h" }
    );
    sentResponse(res, {
        statusCode: 200,
        success: true,
        message: 'Login successful',
        data: { token },
    });


});
const deleteUser = trycatchAsyns(async (req, res) => {
    const { _id } = req.params
    if (!_id) {
        throw new Error("Invalid user Id");
    }
    const result = await UserModel.deleteOne({_id:_id});
    sentResponse(res, {
        statusCode: 201,
        success: true,
        message: 'Delete user successful',
        data: result,
    });
});

const TokenBlacklist = [];

const logoutUser = trycatchAsyns(async (req, res) => {
    const token = req.headers.authorization?.split(" ")[1]; // Extract the token
    if (!token) {
        throw new Error("Token is required for logout!");
    }
    // Add the token to the blacklist
    TokenBlacklist.push(token);
    sentResponse(res, {
        statusCode: 200,
        success: true,
        message: 'Logout successful',
        data: { token },
    });
});
export const UserController = { adminUpdateUser, createUser, loginUser, logoutUser, profileUser, profileUpdateUser, getUser, singleUser,deleteUser}