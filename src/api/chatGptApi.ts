import { ChatCompletionResponseMessage, Configuration, OpenAIApi } from 'openai';
import { urls } from './urls';


export async function postChatGpt(text: string): Promise<ChatCompletionResponseMessage | undefined> {

    // env fileのチェック
    if (!process.env.OPENAI_API_KEY || !process.env.GPT_MODEL) {
        new Error("OPEN_AI_API_KEY or GPT_MODEL is not defined in .env file");
    }
    const openai = new OpenAIApi(new Configuration({
        apiKey: process.env.OPENAI_API_KEY,
    }));
    const completion = await openai.createChatCompletion({
        model: process.env.GPT_MODEL as string,
        messages: [{ role: "user", content: text }],
    });
    return completion.data.choices[0].message;
}

/** 後で消す */
export async function postChatGpt_bk(text: string): Promise<string> {
    console.info('OPEN_AI_API_KEY:', process.env.OPEN_AI_API_KEY);
    console.info('GPT_MODEL:', process.env.GPT_MODEL);
    // HTTPSのPOST時のオプションパラメータを設定する
    const options = {
        'payload': JSON.stringify({
            model: process.env.GPT_MODEL
            , messages: [{ role: "user", content: text }],
        }),
        'method': 'POST',
        'headers': { "Authorization": "Bearer " + process.env.OPEN_AI_API_KEY },
        'contentType': 'application/json'
    };
    // chatGptにリクエストを送り返答をもらう。
    const result = await fetch(urls.ChatGpt, options).then(res => res.text());
    const json = JSON.parse(result);
    console.info(json);
    return json.choices[0].message.content.trim();
}
