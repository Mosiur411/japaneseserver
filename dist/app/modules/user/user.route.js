"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRouter = void 0;
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("./user.controller");
const auth_1 = require("../../middleware/auth");
const router = express_1.default.Router();
/*  autn  */
router.post("/login", user_controller_1.UserController.loginUser);
router.post("/logout", user_controller_1.UserController.logoutUser);
/* user */
router.post("/register", user_controller_1.UserController.createUser); //upload.single("profilePhoto"),
router.get("/", auth_1.Auth.authUser, auth_1.Auth.onlyAdmin, user_controller_1.UserController.getUser);
router.get("/single/:_id", auth_1.Auth.authUser, auth_1.Auth.onlyAdmin, user_controller_1.UserController.singleUser);
router.get("/profile", auth_1.Auth.authUser, user_controller_1.UserController.profileUser);
router.put("/profile-update", auth_1.Auth.authUser, user_controller_1.UserController.profileUpdateUser); //upload.single("profilePhoto"), 
router.put("/admin/profile-update", auth_1.Auth.authUser, auth_1.Auth.onlyAdmin, user_controller_1.UserController.adminUpdateUser);
router.delete("/delete/:_id", auth_1.Auth.authUser, auth_1.Auth.onlyAdmin, user_controller_1.UserController.deleteUser);
exports.UserRouter = router;
