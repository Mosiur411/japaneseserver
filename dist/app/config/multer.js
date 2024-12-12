"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.upload = void 0;
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        const storagePath = path_1.default.join(__dirname, "../uploads/profilePhoto");
        console.log(storagePath);
        cb(null, storagePath); // Directory to store profile photos
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        cb(null, `${uniqueSuffix}-${file.originalname}`);
    },
});
exports.upload = (0, multer_1.default)({
    storage,
    limits: { fileSize: 1 * 1024 * 1024 }, // 1MB max file size
    fileFilter: (req, file, cb) => {
        const fileTypes = /jpeg|jpg|webp|png/;
        const extname = fileTypes.test(path_1.default.extname(file.originalname).toLowerCase());
        const mimeType = fileTypes.test(file.mimetype);
        if (extname && mimeType) {
            return cb(null, true);
        }
        cb(new Error("Only images are allowed!"));
    },
});
