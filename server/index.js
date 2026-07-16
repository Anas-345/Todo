import express from 'express'
import { authRouter } from './routes/auth.js'
import { todoRouter } from './routes/todos.js'

const app = express()
app.use(express.json())

app.use('/api/auth', authRouter)
app.use('/api/todo', todoRouter)

app.listen(3000, () => console.log('Server is running'))