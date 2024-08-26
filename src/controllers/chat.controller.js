import ChatService from '../services/chat.service.js'

const addChat = async (req, res) => {
  const { lastName, firstName } = req.body
  const userId = req.user._id 

  const createdChat = await ChatService.create({ lastName, firstName, userId })

  res.status(200).json(createdChat)
}

const updateChat = async (req, res) => {
  const { lastName, firstName } = req.body
  const { id: chatId } = req.params
  const userId = req.user._id

  const updatedChat = await ChatService.update({ lastName, firstName, userId, chatId })

  res.status(200).json(updatedChat)
}

const getChats = async (req, res) => {
  const userId = req.user?._id
  const { search } = req.query

  const chats = await ChatService.getAll(userId, search)

  res.status(200).json(chats)
}

const getChatMessages = async (req, res) => {
  const { id: chatId } = req.params
  const userId = req.user._id

  const messages = await ChatService.getMessages({ chatId, userId })

  res.status(200).json(messages)
}

const removeChat = async (req, res) => {
  const { id: chatId } = req.params
  const userId = req.user._id

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
