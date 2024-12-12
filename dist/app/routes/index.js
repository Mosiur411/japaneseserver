"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const vocabulary_route_1 = require("../modules/vocabulary/vocabulary.route");
const lesson_route_1 = require("../modules/lesson/lesson.route");
const user_route_1 = require("../modules/user/user.route");
const tutorial_route_1 = require("../modules/tutorial/tutorial.route");
const router = (0, express_1.Router)();
const moduleRoutes = [
    {
        path: "/user",
        modules: user_route_1.UserRouter
    },
    {
        path: "/lesson",
        modules: lesson_route_1.LessonRouter
    },
    {
        path: "/vocabulary",
        modules: vocabulary_route_1.VocabularyRouter
    },
    {
        path: "/tutorial",
        modules: tutorial_route_1.TutorialRouter
    },
];
moduleRoutes.forEach((route) => router.use(route.path, route.modules));
exports.default = router;
