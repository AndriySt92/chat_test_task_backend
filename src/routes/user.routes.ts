import express from 'express'
import UserController from '../controllers/user.controller'
import { ctrlWrapper, loginValidation, registerValidation } from '../utils'
import { authenticate } from '../middlewares/authenticate'

const router = express.Router()

router.post('/register', registerValidation, ctrlWrapper(UserController.register))
router.post('/login', loginValidation, ctrlWrapper(UserController.login))
router.get('/current', authenticate, ctrlWrapper(UserController.current))

export default router
