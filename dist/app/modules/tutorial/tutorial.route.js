"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TutorialRouter = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = require("../../middleware/auth");
const tutorial_controller_1 = require("./tutorial.controller");
const router = express_1.default.Router();
router.post('/create', auth_1.Auth.authUser, auth_1.Auth.onlyAdmin, tutorial_controller_1.TutorialController.createTutorial);
router.get('/', tutorial_controller_1.TutorialController.getTutorial);
router.get('/single/:_id', auth_1.Auth.authUser, auth_1.Auth.onlyAdmin, tutorial_controller_1.TutorialController.getSingleTutorial);
router.put('/update', auth_1.Auth.authUser, auth_1.Auth.onlyAdmin, tutorial_controller_1.TutorialController.updateTutorial);
router.delete('/delete/:_id', auth_1.Auth.authUser, auth_1.Auth.onlyAdmin, tutorial_controller_1.TutorialController.deleteTutorial);
exports.TutorialRouter = router;
