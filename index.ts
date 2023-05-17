import express, { Application, Request, Response } from 'express'
import { chatGptController } from './src/controller/chatGptController'

const app: Application = express()
const PORT = 3000

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.listen(PORT, () => {
    // const envPath = path.join(path.resolve(process.cwd()), '.env');
    // dotenv.config({ path: envPath, debug: true });
    // 環境変数の設定
    const appRoot = require('app-root-path');
    console.log(`App Root: ${appRoot}`);
    require('dotenv').config({ path: `${appRoot}/.env` });

    // console.log(process.cwd(), envPath);
    // console.log('OPEN_AI_API_KEY', process.env.OPEN_AI_API_KEY);
    console.log(`dev server running at: http://localhost:${PORT}/`)
})

// rooting
app.get('/chat', chatGptController);