import express, { Application, Request, Response } from 'express'
import { chatGptController } from './src/controller/chatGptController'

const app: Application = express()
const PORT = 3000

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.listen(PORT, () => {
    console.log(`dev server running at: http://localhost:${PORT}/`)
})

// rooting
app.get('/chat', chatGptController);