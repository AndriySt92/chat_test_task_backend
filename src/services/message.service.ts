import MessageModel from '../models/message.model'
import ChatModel from '../models/chat.model'
import { ICreateMessageData, IUpdateMessageData } from '../interfaces/messageInterfaces'
import { httpError } from '../utils'

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

  //Implement socket and response from bot

  setTimeout(async () => {
    try {
      // const response = await fetch('https://api.quotable.io/quotes/random');
      
      // if (!response.ok) {
      //   throw new Error(`HTTP error! Status: ${response.status}`);
      // }
      
      // const data: any = await response.json();
      
      // const quote = data.content;
      // const author = data.author;
      

      const message = await MessageModel.create({
        authorId: receiverId,
        message: "Bot message",
      })

      await ChatModel.findOneAndUpdate(
        { user_creator: senderId, _id: receiverId },
        { $push: { messages: message._id }, $set: { lastMessage: message._id } },
        { new: true },
      )
      
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
      return null;
    }
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
