import jwt from 'jsonwebtoken'
import userModel from '../models/user.model.js'

export const authenticate = async (
  req,
  res,
  next,
) => {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized - No Token Provided' })
  }

  const { id } = jwt.verify(token, process.env.JWT_SECRET)

  if (!id) {
    return res.status(401).json({ error: 'Unauthorized - Invalid Token' })
  }

  const user = await userModel.findById(id).select('-password')
 
  if (!user) {
    return res.status(404).json({ error: 'User not found' })
  }

  req.user = user.toObject();

  next()
}
