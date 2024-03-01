import { GptApi } from "./GptApi";
import OpenAI from "openai";
import { ChatCompletionChunk } from "openai/resources/index.mjs";
import { RolePlay } from "../roleplays/roleplays";

console.log("ENV", import.meta.env.VITE_OPENAI_KEY);

const openai = new OpenAI({
    apiKey: import.meta.env.VITE_OPENAI_KEY,
    dangerouslyAllowBrowser:true
  });


export class ChatGPT implements GptApi<string, ChatCompletionChunk>{
    async prompt(text: string, second: boolean, play:RolePlay): Promise<AsyncIterable<ChatCompletionChunk>> {
        console.log(text);
        if (second) {
            
            return await openai.chat.completions.create({ model: "gpt-3.5-turbo", messages: [
                { role: 'system', content: play.instructionToAi2}, { role: 'user', content: text }
            ], stream: true, });
           
        }
        return  await openai.chat.completions.create({ model: "gpt-3.5-turbo", messages: [{
             role: 'user', content: text }, 
             { role: 'system', content: play.instructionToAi1 }], stream: true });
             
    }
    extractFromStream(chunk:ChatCompletionChunk):string{
        return chunk.choices[0]?.delta?.content || "";
    }
}