"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LessonRouter = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = require("../../middleware/auth");
const lesson_controller_1 = require("./lesson.controller");
const router = express_1.default.Router();
router.post('/create', auth_1.Auth.authUser, auth_1.Auth.onlyAdmin, lesson_controller_1.LessonController.createLesson);
router.get('/', auth_1.Auth.authUser, lesson_controller_1.LessonController.getLesson);
router.get('/sinlge/:_id', auth_1.Auth.authUser, auth_1.Auth.onlyAdmin, lesson_controller_1.LessonController.getSingleLesson);
router.put('/update', auth_1.Auth.authUser, auth_1.Auth.onlyAdmin, lesson_controller_1.LessonController.updateLesson);
router.delete('/delete/:_id', auth_1.Auth.authUser, auth_1.Auth.onlyAdmin, lesson_controller_1.LessonController.deleteLesson);
exports.LessonRouter = router;
