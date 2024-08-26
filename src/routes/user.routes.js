import express from 'express'
import UserController from '../controllers/user.controller.js'
import { ctrlWrapper } from '../utils/ctrlWrapper.js'
import { loginValidation, registerValidation } from '../utils/authValidation.js'
import { authenticate } from '../middlewares/authenticate.js'

const router = express.Router()

router.post('/register', registerValidation, ctrlWrapper(UserController.register))
router.post('/login', loginValidation, ctrlWrapper(UserController.login))
router.get('/current', authenticate, ctrlWrapper(UserController.current))

export default router
