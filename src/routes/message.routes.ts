import express from 'express'
import MessageController from '../controllers/message.controller'
import { ctrlWrapper } from '../utils'
import { authenticate } from '../middlewares/authenticate'

const router = express.Router()

router.post('/add/:id', authenticate, ctrlWrapper(MessageController.addMessage))
router.patch('/:id', authenticate, ctrlWrapper(MessageController.updateMessage))

export default router