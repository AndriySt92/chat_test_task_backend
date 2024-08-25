import mongoose from 'mongoose'

export interface IUserSchema {
  firstName: string
  lastName: string
  email: string
  avatar: string | null
  password: string
}

const UserSchema = new mongoose.Schema<IUserSchema>(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    avatar: { type: String, default: null },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
)

export default mongoose.model('User', UserSchema)