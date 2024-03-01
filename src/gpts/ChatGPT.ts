
import { ChatHistory, GptApi } from "./GptApi";
import OpenAI from "openai";
import { ChatCompletionChunk } from "openai/resources/index.mjs";
import { RolePlay } from "../roleplays/roleplays";




const openai = new OpenAI({
    apiKey: import.meta.env.VITE_OPENAI_KEY,
    dangerouslyAllowBrowser:true
  });


export class ChatGPT implements GptApi<string, ChatCompletionChunk>{

    private history:ChatHistory = {
        ai1: [],
        ai2: []
    };

    async prompt(text: string, second: boolean, play:RolePlay): Promise<AsyncIterable<ChatCompletionChunk>> {
        // if(this.history.ai1.length === 0){
        //     this.history.ai1.push({role:'system', content:play.instructionToAi1});
        //     this.history.ai2.push({role:'system', content:play.instructionToAi2});
        //     this.history.ai1.push({role:'user', content:play.prompt});
        // }
        // if (second) {
        //     this.history.ai1.push({role:'assistant', content:text});
        //     this.history.ai2.push({role:'user', content:text});
        //     return await openai.chat.completions.create({ model: "gpt-3.5-turbo", messages: this.history.ai2, stream: true, });
           
        // }
        // this.history.ai1.push({role:'user', content:text});
        // this.history.ai2.push({role:'assistant', content:text});
        // return  await openai.chat.completions.create({ model: "gpt-3.5-turbo", messages:this.history.ai1, stream: true });

        if(this.history.ai1.length === 0){
            this.history.ai1.push({role:'system', content:play.instructionToAi1});
            this.history.ai2.push({role:'system', content:play.instructionToAi2});
            this.history.ai1.push({role:'user', content:play.prompt});
        }
        if (second) {
            this.history.ai1.push({role:'assistant', content:text});
            this.history.ai2.push({role:'user', content:text});
            return await openai.chat.completions.create({ model: "gpt-3.5-turbo", messages: this.history.ai2, stream: true, });
           
        }
        this.history.ai1.push({role:'user', content:text});
        this.history.ai2.push({role:'assistant', content:text});
        return  await openai.chat.completions.create({ model: "gpt-3.5-turbo", messages:this.history.ai1, stream: true });
             
    }
    extractFromStream(chunk:ChatCompletionChunk):string{
        return chunk.choices[0]?.delta?.content || "";
    }
}