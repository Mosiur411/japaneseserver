

import express from 'express'
import { Auth } from '../../middleware/auth'
import { TutorialController } from './tutorial.controller'
const router = express.Router()


router.post('/create', Auth.authUser, Auth.onlyAdmin, TutorialController.createTutorial)
router.get('/',  TutorialController.getTutorial)
router.get('/single/:_id', Auth.authUser, Auth.onlyAdmin, TutorialController.getSingleTutorial)
router.put('/update', Auth.authUser, Auth.onlyAdmin, TutorialController.updateTutorial)
router.delete('/delete/:_id', Auth.authUser, Auth.onlyAdmin, TutorialController.deleteTutorial)



export const TutorialRouter = router