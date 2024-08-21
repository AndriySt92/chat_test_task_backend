import { Request, Response } from 'express'
import { validationResult } from 'express-validator'
import { httpError } from '../utils'
import UserService from '../services/user.service'

const register = async (req: Request, res: Response) => {
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    throw httpError({ status: 400, message: errors.array()[0].msg })
  }

  const user = await UserService.register(req.body)

  res.status(201).json({
    ...user,
  })
}

const login = async (req: Request, res: Response) => {
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    throw httpError({ status: 400, message: errors.array()[0].msg })
  }

  const user = await UserService.login(req.body)

  res.status(200).json({ ...user })
}

const current = async (req: Request, res: Response) => {
    const user = req.user;
    return res.status(200).json(user)
}

export default {
  register,
  login,
  current,
}
