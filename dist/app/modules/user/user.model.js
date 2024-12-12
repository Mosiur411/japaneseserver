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
exports.UserModel = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        minlength: [3, 'Name must be at least 3 characters long'],
        maxlength: [50, 'Name cannot exceed 50 characters'],
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        validate: {
            validator: function (email) {
                return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email); // Email regex
            },
            message: 'Please provide a valid email address',
        },
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: [6, 'Password must be at least 6 characters long'],
    },
    profilePhoto: {
        type: String,
        required: [true, 'Profile photo is required'],
    },
    role: {
        type: String,
        enum: {
            values: ['user', 'admin'],
            message: 'Role must be either "user" or "admin"',
        },
        default: 'user',
    },
    status: {
        type: String,
        enum: {
            values: ['in-progress', 'blocked'],
            message: 'Status must be either "in-progress" or "blocked"',
        },
        default: 'in-progress',
    },
    isDeleted: {
        type: Boolean,
        default: false,
    },
}, {
    timestamps: true,
});
userSchema.index({ email: 1 }, { unique: true });
userSchema.pre('save', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = this;
        if (user.isModified("password")) {
            try {
                const salt = yield bcrypt_1.default.genSalt(10);
                user.password = yield bcrypt_1.default.hash(user.password, salt);
                next();
            }
            catch (err) {
                next(err);
            }
        }
        else {
            next();
        }
    });
});
// Method to compare passwords
userSchema.methods.comparePassword = function (candidatePassword) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield bcrypt_1.default.compare(candidatePassword, this.password);
    });
};
exports.UserModel = (0, mongoose_1.model)('User', userSchema);
