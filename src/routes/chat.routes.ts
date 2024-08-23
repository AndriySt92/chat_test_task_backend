import express from 'express'
import ChatController from '../controllers/chat.controller'
import { ctrlWrapper } from '../utils'
import { authenticate } from '../middlewares/authenticate'

const router = express.Router()

router.get('/', authenticate, ctrlWrapper(ChatController.getChats))
router.get('/:id/messages', authenticate, ctrlWrapper(ChatController.getChatMessages))
router.post('/', authenticate, ctrlWrapper(ChatController.addChat))
router.patch('/:id', authenticate, ctrlWrapper(ChatController.updateChat))
router.delete('/:id', authenticate, ctrlWrapper(ChatController.removeChat))

export default router