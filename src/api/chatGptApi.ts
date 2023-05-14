import dotenv from 'dotenv';
import path from 'path';
import { urls } from './urls';
// dotenv.config({ path: path.resolve('../.env') });

export async function postChatGpt(text: string): Promise<string> {
    // HTTPSのPOST時のオプションパラメータを設定する
    const options = {
        'payload': JSON.stringify({
            model: process.env.GPT_MODEL
            , messages: [{ role: "user", content: text }],
        }),
        'method': 'POST',
        'headers': { "Authorization": "Bearer " + process.env.BEARER_TOKEN },
        'contentType': 'application/json'
    };

    // chatGptにリクエストを送り返答をもらう。
    const result = await fetch(urls.ChatGpt, options).then(res => res.text());
    const json = JSON.parse(result);
    return json.choices[0].message.content.trim();
}
