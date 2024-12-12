

import express from 'express'
import { Auth } from '../../middleware/auth'
import { VocabularyController } from './vocabulary.controller'
const router = express.Router()


router.post('/create', Auth.authUser, Auth.onlyAdmin, VocabularyController.createVocabulary)
router.get('/', Auth.authUser, VocabularyController.getVocabulary)
router.get('/single/:lessonNo', Auth.authUser, Auth.onlyAdmin, VocabularyController.getSingleVocabulary)
router.put('/update', Auth.authUser, Auth.onlyAdmin, VocabularyController.updateVocabulary)
router.delete('/delete/:_id', Auth.authUser, Auth.onlyAdmin, VocabularyController.deleteVocabulary)




export const VocabularyRouter = router