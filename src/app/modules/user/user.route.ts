import express from "express";
import { UserController } from "./user.controller";
import { Auth } from "../../middleware/auth";
import { upload } from "../../config/multer";

const router = express.Router();

/*  autn  */
router.post("/login", UserController.loginUser);
router.post("/logout", UserController.logoutUser);
/* user */
router.post("/register", upload.single("profilePhoto"), UserController.createUser);
router.get("/", Auth.authUser, Auth.onlyAdmin, UserController.getUser);
router.get("/single/:_id", Auth.authUser, Auth.onlyAdmin, UserController.singleUser);
router.get("/profile", Auth.authUser, UserController.profileUser);
router.put("/profile-update", upload.single("profilePhoto"), Auth.authUser, UserController.profileUpdateUser);
router.put("/admin/profile-update", Auth.authUser, Auth.onlyAdmin, UserController.adminUpdateUser);
router.delete("/delete/:_id", Auth.authUser, Auth.onlyAdmin, UserController.deleteUser);


export const UserRouter = router;
