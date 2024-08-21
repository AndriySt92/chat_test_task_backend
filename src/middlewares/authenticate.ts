import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import { IDecodedToken, IUser } from '../interfaces/userInterfaces'
import userModel from '../models/user.model'

interface AuthenticatedRequest extends Request {
  user?: IUser
}

export const authenticate = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
) => {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized - No Token Provided' })
  }

  const { id } = jwt.verify(token, process.env.JWT_SECRET as string) as IDecodedToken

  if (!id) {
    return res.status(401).json({ error: 'Unauthorized - Invalid Token' })
  }

  const user = await userModel.findById(id).select('-password')
 
  if (!user) {
    return res.status(404).json({ error: 'User not found' })
  }

  req.user = user.toObject() as IUser;

  next()
}
