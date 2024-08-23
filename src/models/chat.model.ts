import mongoose from 'mongoose'

export interface IChatSchema {
  bot_firstName: string
  bot_lastName: string
  user: mongoose.Schema.Types.ObjectId
  messages: mongoose.Schema.Types.ObjectId[]
  lastMessage: mongoose.Schema.Types.ObjectId | null
  avatar: string | null
  user_creator: mongoose.Schema.Types.ObjectId
  createdAt: Date
  updatedAt: Date
}

const chatSchema = new mongoose.Schema<IChatSchema>(
  {
    bot_firstName: { type: String, required: true },
    bot_lastName: { type: String, required: true },
    messages: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Message',
        default: [],
      },
    ],
    lastMessage: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Message',
      default: null,
    },
    avatar: { type: String, default: null },
    user_creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  },
  { timestamps: true },
)

const Chat = mongoose.model('Chat', chatSchema)

export default Chat
