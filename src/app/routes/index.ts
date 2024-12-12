import { Router } from "express"
import { VocabularyRouter } from "../modules/vocabulary/vocabulary.route";
import { LessonRouter } from "../modules/lesson/lesson.route";
import { UserRouter } from "../modules/user/user.route";
import { TutorialRouter } from "../modules/tutorial/tutorial.route";

const router = Router()
const moduleRoutes = [
    {
        path: "/user",
        modules: UserRouter
    },
    {
        path: "/lesson",
        modules: LessonRouter
    },
    {
        path: "/vocabulary",
        modules: VocabularyRouter
    },
    {
        path: "/tutorial",
        modules: TutorialRouter
    },
]


moduleRoutes.forEach((route) => router.use(route.path, route.modules))

export default router;

