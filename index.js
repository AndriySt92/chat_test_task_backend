import dotenv from 'dotenv'
import cors from 'cors'
import connectDB from './src/db/connectDb.js'
import userRoutes from './src/routes/user.routes.js'
import chatRoutes from './src/routes/chat.routes.js'
import messageRoutes from './src/routes/message.routes.js'
import { errorMessageList } from './src/utils/httpError.js'
import { app, server } from './src/socket/socket.js'

dotenv.config()
connectDB()

const PORT = process.env.PORT || 5000

app.use(cors())
app.use(express.json())

app.use('/api/auth', userRoutes)
app.use('/api/messages', messageRoutes)
app.use('/api/chats', chatRoutes)

app.use((req, res) => {
  res.status(404).json({ message: 'Not Found' })
})

app.use((err, req, res, next) => {
  //To avoid error "RangeError [ERR_HTTP_INVALID_STATUS_CODE]: Invalid status code: undefined"
  const status =
    err.status && Number.isInteger(err.status) && err.status >= 100 && err.status < 600
      ? err.status
      : 500
  const message = err.message || errorMessageList[status] || 'Internal Server Error'

  res.status(status).json({ message })
})

server.listen(PORT, () => {
  console.log(`server is listening on ${PORT}`)
})
