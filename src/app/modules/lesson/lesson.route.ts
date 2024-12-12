import express from 'express'
import { Auth } from '../../middleware/auth'
import { LessonController } from './lesson.controller'
const router = express.Router()


router.post('/create', Auth.authUser, Auth.onlyAdmin, LessonController.createLesson)
router.get('/', Auth.authUser, LessonController.getLesson)
router.get('/sinlge/:_id', Auth.authUser, Auth.onlyAdmin, LessonController.getSingleLesson)
router.put('/update', Auth.authUser, Auth.onlyAdmin, LessonController.updateLesson)
router.delete('/delete/:_id', Auth.authUser, Auth.onlyAdmin, LessonController.deleteLesson)


export const LessonRouter = router