import ChatModel from '../models/chat.model'
import { ICreateChatData, IUpdateChatData } from '../interfaces/chatInterfaces'
import { httpError } from '../utils'
import { initialChats } from '../seedData/initialChats'

const create = async ({ lastName, firstName, userId }: ICreateChatData) => {
  const createdChat = await ChatModel.create({
    bot_firstName: firstName,
    bot_lastName: lastName,
    user_creator: userId,
  })

  return createdChat
}

const update = async ({ lastName, firstName, userId, chatId }: IUpdateChatData) => {
  const updateChat = await ChatModel.findOneAndUpdate(
    { _id: chatId, user_creator: userId },
    { $set: { bot_lastName: lastName, bot_firstName: firstName } },
    { new: true },
  )

  if (!updateChat) {
    throw httpError({ status: 400, message: 'Chat not found' })
  }

  return updateChat
}

const getAll = async (userId: string, search: string) => {
  const query: any = { user_creator: userId }

  if (search) {
    query['$or'] = [
      { bot_firstName: { $regex: search, $options: 'i' } },
      { bot_lastName: { $regex: search, $options: 'i' } },
    ]
  }

  return await ChatModel.find(query).select('-messages').populate('lastMessage')
}

const getMessages = async ({ userId, chatId }: { userId: string; chatId: string }) => {
  const chat = await ChatModel.findOne({ user_creator: userId, _id: chatId })
    .select('messages')
    .populate('messages')

  return chat ? chat.messages : []
}

const remove = async ({ userId, chatId }: { userId: string; chatId: string }) => {
  const deletedChat = await ChatModel.findOneAndDelete({ user_creator: userId, _id: chatId })

  if (!deletedChat) {
    throw httpError({ status: 400, message: 'Chat not found' })
  }

  return deletedChat._id
}

const addInitialChats = async (userId: string) => {
  const chatPromises = initialChats.map((chat) =>
    ChatModel.create({
      bot_firstName: chat.firstName,
      bot_lastName: chat.lastName,
      user_creator: userId,
    }),
  )

  await Promise.all(chatPromises)
}

export default {
  create,
  update,
  getAll,
  getMessages,
  remove,
  addInitialChats,
}
