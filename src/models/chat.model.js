import mongoose from 'mongoose'

const chatSchema = new mongoose.Schema(
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
