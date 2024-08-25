import { Request, Response } from 'express'
import MessageService from '../services/message.service'

const addMessage = async (req: Request, res: Response) => {
  const { messageText } = req.body
  const { id: receiverId } = req.params
  const senderId = req.user?._id as string

  const message = await MessageService.create({ messageText, receiverId, senderId })

  res.status(200).json({ message })
}

const updateMessage = async (req: Request, res: Response) => {
  const { messageText } = req.body
  const { id: messageId } = req.params
  const senderId = req.user?._id as string

  const message = await MessageService.update({ messageText, messageId, senderId })

  res.status(200).json({ message })
}

export default {
  addMessage,
  updateMessage,
}
