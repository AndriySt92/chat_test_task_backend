import mongoose from 'mongoose'

export interface IMessageSchema {
  authorId: mongoose.Schema.Types.ObjectId; 
  message: string;
  createdAt: Date;
  updatedAt: Date;
}

const messageSchema = new mongoose.Schema(
  {
    authorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
)

const Message = mongoose.model('Message', messageSchema)

export default Message