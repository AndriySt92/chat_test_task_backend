import express from 'express'
import ChatController from '../controllers/chat.controller.js'
import { ctrlWrapper } from '../utils/ctrlWrapper.js'
import { authenticate } from '../middlewares/authenticate.js'

const router = express.Router()

router.get('/', authenticate, ctrlWrapper(ChatController.getChats))
router.get('/:id/messages', authenticate, ctrlWrapper(ChatController.getChatMessages))
router.post('/', authenticate, ctrlWrapper(ChatController.addChat))
router.patch('/:id', authenticate, ctrlWrapper(ChatController.updateChat))
router.delete('/:id', authenticate, ctrlWrapper(ChatController.removeChat))

export default router