import { postChatGpt } from "../api/chatGptApi";


export const chatGptService = async (text: string): Promise<string> => {
    const result = await postChatGpt(text);
    return result as string;
}