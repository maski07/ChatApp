import { ChatCompletionResponseMessage } from "openai";
import { postChatGpt } from "../api/chatGptApi";
import { readFile } from "node:fs/promises";

export const chatGptService = async (text: string): Promise<string | undefined> => {
    // プロンプトを取得（todo: ユーザのエラー情報を出力）
    const prompt = await readFile(require('app-root-path') + '/prompts/prompt.md', { encoding: "utf8" })
        .then(file => file);

    // プロンプトに質問を設定
    const userPrompt = prompt.replace('{#QUESTION}', text);

    console.log(userPrompt);
    // ChatGPTへ質問
    const result: ChatCompletionResponseMessage | undefined = await postChatGpt(userPrompt);
    const resultMessage = result?.content;
    // 備忘：undefinedならエラーにする。

    // メッセージをDBへ登録（ユーザID、プロンプト、ChatGPTレスポンス、処理時間など）

    return resultMessage;
}