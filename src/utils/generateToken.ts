import jwt from 'jsonwebtoken'
import { Types } from 'mongoose'

export const generateToken = (id: string) => {  
  return jwt.sign({ id }, process.env.JWT_SECRET as string, {
    expiresIn: '30d',
  })
}
