import { Request, Response } from 'express'
import ChatService from '../services/chat.service'

const addChat = async (req: Request, res: Response) => {
  const { lastName, firstName, userId } = req.body

  const createdChat = await ChatService.create({ lastName, firstName, userId })

  res.status(200).json(createdChat)
}


const updateChat = async (req: Request, res: Response) => {
  const { lastName, firstName } = req.body
  const { id: chatId } = req.params
  const userId = req.user?._id as string

  const updatedChat = await ChatService.update({ lastName, firstName, userId, chatId })

  res.status(200).json(updatedChat)
}

const getChats = async (req: Request, res: Response) => {
  const userId = req.user?._id as string

  const chats = await ChatService.getAll(userId)

  res.status(200).json(chats)
}

const getChatMessages = async (req: Request, res: Response) => {
  const { id: chatId } = req.params
  const userId = req.user?._id as string

  const messages = await ChatService.getMessages({ chatId, userId })

  res.status(200).json(messages)
}

const removeChat = async (req: Request, res: Response) => {
  const { id: chatId } = req.params
  const userId = req.user?._id as string

  const deletedChatId = await ChatService.remove({ chatId, userId })

  res.status(200).json(deletedChatId)
}

export default {
  addChat,
  updateChat,
  getChats,
  getChatMessages,
  removeChat,
}
