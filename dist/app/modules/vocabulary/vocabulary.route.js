"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VocabularyRouter = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = require("../../middleware/auth");
const vocabulary_controller_1 = require("./vocabulary.controller");
const router = express_1.default.Router();
router.post('/create', auth_1.Auth.authUser, auth_1.Auth.onlyAdmin, vocabulary_controller_1.VocabularyController.createVocabulary);
router.get('/', auth_1.Auth.authUser, vocabulary_controller_1.VocabularyController.getVocabulary);
router.get('/single/:lessonNo', auth_1.Auth.authUser, auth_1.Auth.onlyAdmin, vocabulary_controller_1.VocabularyController.getSingleVocabulary);
router.put('/update', auth_1.Auth.authUser, auth_1.Auth.onlyAdmin, vocabulary_controller_1.VocabularyController.updateVocabulary);
router.delete('/delete/:_id', auth_1.Auth.authUser, auth_1.Auth.onlyAdmin, vocabulary_controller_1.VocabularyController.deleteVocabulary);
exports.VocabularyRouter = router;
