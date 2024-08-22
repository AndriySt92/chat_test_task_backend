import MessageModel from '../models/message.model'
import ChatModel from '../models/chat.model'
import { ICreateMessageData, IUpdateMessageData } from '../interfaces/messageInterfaces'

const create = async ({
  messageText,
  senderId,
  receiverId,
}: ICreateMessageData): Promise<string> => {
  const message = await MessageModel.create({
    authorId: senderId,
    message: messageText,
  })

  await ChatModel.findOneAndUpdate(
    { user_creator: senderId, _id: receiverId },
    { $push: { messages: message._id }, $set: { lastMessage: message._id } },
  )

  //Implement socket and response from bot

  return 'Message created successfully.'
}

const update = async ({
  messageText,
  senderId,
  messageId,
}: IUpdateMessageData): Promise<string> => {
  await MessageModel.findOneAndUpdate(
    { _id: messageId, authorId: senderId },
    { $set: { message: messageText } },
  )

  //Implement socket

  return 'Message updated successfully.'
}

export default {
  create,
  update,
}
