import express, { Application, Request, Response } from 'express'
import { chatGptService } from '../service/chatGptService';

const app = express()
const port = 3000

export const chatGptController = async (_req: Request, res: Response) => {
  const text = _req.params.text;

  const result = await chatGptService(text);

  return res.status(200).send({
    message: 'Hello World!' + result,
  })
};
