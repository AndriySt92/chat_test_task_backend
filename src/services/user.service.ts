import bcrypt from 'bcryptjs'
import UserModel from '../models/user.model'
import { httpError, generateToken } from '../utils'
import { ILoginData, IRegisterData, IUser } from '../interfaces/userInterfaces'
import chatService from './chat.service'

const register = async (registerData: IRegisterData): Promise<IUser & { token: string }> => {
  const { firstName, lastName, password, email } = registerData

  const user = await UserModel.findOne({ email })

  if (user) {
    throw httpError({ status: 409, message: 'Email already use' })
  }

  const hashedPassword = await bcrypt.hash(password, 10)

  const newUser = await UserModel.create({
    firstName,
    lastName,
    email,
    password: hashedPassword,
  })

  await chatService.addInitialChats(newUser._id.toString());

  const token = generateToken(newUser._id.toString())

  return {
    ...newUser.toObject(),
    token,
  }
}

const login = async (loginData: ILoginData): Promise<IUser & { token: string }> => {
  const { password, email } = loginData

  const user = await UserModel.findOne({ email })

  if (!user) {
    throw httpError({ status: 400, message: 'Invalid username or password' })
  }

  const isPasswordCorrect = await bcrypt.compare(password, user.password)

  if (!isPasswordCorrect) {
    throw httpError({ status: 400, message: 'Invalid username or password' })
  }

  const token = generateToken(user._id.toString())

  return { ...user.toObject(), token }
}


export default {
  register,
  login,
}
