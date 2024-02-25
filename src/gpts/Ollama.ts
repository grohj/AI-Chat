import {GptApi} from "./GptApi"
import ollama, { ChatResponse } from 'ollama'

export class Ollama implements GptApi<string, AsyncGenerator<ChatResponse>>{
    async prompt(text: string, second:boolean): Promise<AsyncGenerator<ChatResponse>> {
        console.log(text);
        if(second){
            return await ollama.chat({model:"neural-chat", messages:[{role:'user', content:"Please form a follow up question to provided statement."},{role:'system', content:text}], stream:true, })
        }
        return ollama.chat({model:"neural-chat", messages:[{role:'user', content:text}], stream:true});
    }

}