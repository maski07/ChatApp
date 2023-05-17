import { ChatCompletionResponseMessage } from "openai";
import { postChatGpt } from "../api/chatGptApi";
import { readFile } from "node:fs/promises";

export const chatGptService = async (text: string): Promise<string | undefined> => {
    // プロンプトを作成
    const prompt = await configurePrompt(text);

    // ChatGPTへ質問
    const result: ChatCompletionResponseMessage | undefined = await postChatGpt(prompt);
    const resultMessage = result?.content;

    // 備忘：undefinedならエラーにする。

    // メッセージをDBへ登録（ユーザID、プロンプトID、ChatGPTレスポンス、処理時間など）

    return resultMessage;
}

/**
 * プロンプトを構成する
 * @param question 
 * @returns 
 */
const configurePrompt = async (question: string): Promise<string> => {
    // todo: ユーザのエラー情報を出力
    // todo: プロンプトをDBにすべきか
    const originPrompt = await readFile(require('app-root-path') + '/prompts/prompt.md', { encoding: "utf8" })
        .then(file => file);

    // todo: textに動的変数が仕込まれたらどうする？

    // プロンプトに質問を設定
    const userPrompt = originPrompt.replace('__QUESTION__', question);

    // todo: プロンプトにユーザ情報を設定

    console.log(userPrompt);

    return userPrompt;
}