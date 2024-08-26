import MessageModel from '../models/message.model'
import ChatModel from '../models/chat.model'
import { ICreateMessageData, IUpdateMessageData } from '../interfaces/messageInterfaces'
import { httpError } from '../utils'
import { io } from '../socket/socket'
import { getRandomQuote } from '../helpers/getRandomQuote'

const create = async ({ messageText, senderId, receiverId }: ICreateMessageData) => {
  const message = await MessageModel.create({
    authorId: senderId,
    message: messageText,
  })

  await ChatModel.findOneAndUpdate(
    { user_creator: senderId, _id: receiverId },
    { $push: { messages: message._id }, $set: { lastMessage: message._id } },
    { new: true },
  )

  io.emit('newMessage', message)

  setTimeout(async () => {
    const quote = await getRandomQuote()

    const message = await MessageModel.create({
      authorId: receiverId,
      message: quote || 'Bot message',
    })

    await ChatModel.findOneAndUpdate(
      { user_creator: senderId, _id: receiverId },
      { $push: { messages: message._id }, $set: { lastMessage: message._id } },
      { new: true },
    )
    
    io.emit('newMessage', message)
  }, 3000)

  return message
}

const update = async ({ messageText, senderId, messageId }: IUpdateMessageData) => {
  const updatedMessage = await MessageModel.findOneAndUpdate(
    { _id: messageId, authorId: senderId },
    { $set: { message: messageText } },
    { new: true },
  )

  if (!updatedMessage) {
    throw httpError({ status: 400, message: 'Message not found' })
  }

  return updatedMessage
}

export default {
  create,
  update,
}
