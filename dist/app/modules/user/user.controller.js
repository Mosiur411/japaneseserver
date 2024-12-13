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
exports.UserController = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const trycatchAsyns_1 = __importDefault(require("../../utils/trycatchAsyns"));
const user_model_1 = require("./user.model");
const config_1 = __importDefault(require("../../config"));
const snedResponse_1 = __importDefault(require("../../utils/snedResponse"));
const JWT_SECRET = config_1.default.jwt_secret;
const createUser = (0, trycatchAsyns_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    /*     if (!req.file) {
            throw new Error("Profile photo is required!");
        }
        const filepath = (req.file as any).filename;
        const profilePhotoPath = `/uploads/profilePhoto/${filepath}`; */
    const user = new user_model_1.UserModel(data);
    const result = yield user.save();
    ;
    (0, snedResponse_1.default)(res, {
        statusCode: 201,
        success: true,
        message: 'Register successful',
        data: result,
    });
}));
const getUser = (0, trycatchAsyns_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
    const result = yield user_model_1.UserModel.find({})
        .sort({ _id: -1 })
        .skip(skip)
        .limit(limit);
    // Count total documents for pagination metadata
    const totaluser = yield user_model_1.UserModel.countDocuments({});
    // Respond with data and pagination info
    (0, snedResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: 'User fetched successfully.',
        data: { result, totalPages: Math.ceil(totaluser / limit), },
    });
}));
const profileUser = (0, trycatchAsyns_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    if (!user) {
        throw new Error("Invalid User!");
    }
    const result = yield user_model_1.UserModel.findOne({ _id: user === null || user === void 0 ? void 0 : user._id });
    (0, snedResponse_1.default)(res, {
        statusCode: 201,
        success: true,
        message: 'View profile successful',
        data: result,
    });
}));
const profileUpdateUser = (0, trycatchAsyns_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { _id } = req.user;
    let data = req.body;
    if (!_id || !data) {
        throw new Error("Not body emtry data");
    }
    /*  if (req.file) {
         const filepath = (req.file as any).filename;
         const profilePhotoPath = `/uploads/profilePhoto/${filepath}`;
         data={...data,profilePhoto: profilePhotoPath,}
     } */
    const updatedUser = yield user_model_1.UserModel.findByIdAndUpdate(_id, data, { new: true, runValidators: true });
    (0, snedResponse_1.default)(res, {
        statusCode: 201,
        success: true,
        message: 'Update profile successful',
        data: updatedUser,
    });
}));
const adminUpdateUser = (0, trycatchAsyns_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    if (!data) {
        throw new Error("Not body emtry data");
    }
    const updatedUser = yield user_model_1.UserModel.findByIdAndUpdate(data === null || data === void 0 ? void 0 : data._id, data, { new: true, runValidators: true });
    (0, snedResponse_1.default)(res, {
        statusCode: 201,
        success: true,
        message: 'Update profile successful',
        data: updatedUser,
    });
}));
const singleUser = (0, trycatchAsyns_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { _id } = req.params;
    if (!_id) {
        throw new Error("Invalid user Id");
    }
    const result = yield user_model_1.UserModel.findById(_id);
    (0, snedResponse_1.default)(res, {
        statusCode: 201,
        success: true,
        message: 'Update profile successful',
        data: result,
    });
}));
const loginUser = (0, trycatchAsyns_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    if (!email || !password) {
        throw new Error("Email and password not found!");
    }
    const user = yield user_model_1.UserModel.findOne({ email: email });
    if (!user) {
        throw new Error("Invalid email address!");
    }
    const isPasswordValid = yield bcrypt_1.default.compare(password, user.password);
    if (!isPasswordValid) {
        throw new Error("Invalid  password!");
    }
    const token = jsonwebtoken_1.default.sign({
        _id: user._id,
        email: user.email,
        name: user.name,
        role: user.role,
        profilePhoto: user.profilePhoto,
    }, JWT_SECRET, { expiresIn: "1h" });
    (0, snedResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: 'Login successful',
        data: { token, user },
    });
}));
const deleteUser = (0, trycatchAsyns_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { _id } = req.params;
    if (!_id) {
        throw new Error("Invalid user Id");
    }
    const result = yield user_model_1.UserModel.deleteOne({ _id: _id });
    (0, snedResponse_1.default)(res, {
        statusCode: 201,
        success: true,
        message: 'Delete user successful',
        data: result,
    });
}));
const TokenBlacklist = [];
const logoutUser = (0, trycatchAsyns_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1]; // Extract the token
    if (!token) {
        throw new Error("Token is required for logout!");
    }
    // Add the token to the blacklist
    TokenBlacklist.push(token);
    (0, snedResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: 'Logout successful',
        data: { token },
    });
}));
exports.UserController = { adminUpdateUser, createUser, loginUser, logoutUser, profileUser, profileUpdateUser, getUser, singleUser, deleteUser };
