import express, { NextFunction, Response, Request } from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import connectDB from './src/db/connectDb'
import userRoutes from './src/routes/user.routes'
import chatRoutes from './src/routes/chat.routes'
import messageRoutes from './src/routes/message.routes'
import { IHttpError } from './src/interfaces/errorInterfaces'
import { errorMessageList } from './src/utils/httpError'

const app = express()
dotenv.config()
connectDB()

const PORT = process.env.PORT || 3001

app.use(cors())
app.use(express.json())

app.use('/api/auth', userRoutes)
app.use('/api/messages', messageRoutes)
app.use('/api/chats', chatRoutes)

app.use((req: Request, res: Response): void => {
  res.status(404).json({ message: 'Not Found' })
})

app.use((err: IHttpError, req: Request, res: Response, next: NextFunction): void => {
  //To avoid error "RangeError [ERR_HTTP_INVALID_STATUS_CODE]: Invalid status code: undefined"
  const status =
    err.status && Number.isInteger(err.status) && err.status >= 100 && err.status < 600
      ? err.status
      : 500
  const message = err.message || errorMessageList[status] || 'Internal Server Error'

  res.status(status).json({ message })
})

app.listen(PORT, () => {
  console.log(`server is listening on ${PORT}`)
})
