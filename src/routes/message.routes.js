import express from 'express'
import MessageController from '../controllers/message.controller.js'
import { ctrlWrapper } from '../utils/ctrlWrapper.js'
import { authenticate } from '../middlewares/authenticate.js'

const router = express.Router()

router.post('/add/:id', authenticate, ctrlWrapper(MessageController.addMessage))
router.patch('/:id', authenticate, ctrlWrapper(MessageController.updateMessage))

export default router