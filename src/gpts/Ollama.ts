import { RolePlay } from "../roleplays/roleplays";
import { GptApi } from "./GptApi"
import ollama, { Message, ChatResponse } from 'ollama'

interface History{
    ai1:Message[];
    ai2:Message[];
}

export class Ollama implements GptApi<string, ChatResponse>{

    private history:History = {
        ai1: [],
        ai2: []
    };
    

    extractFromStream(chunk: ChatResponse): string {
        return chunk.message.content;
    }
    async prompt(text: string, second: boolean, play:RolePlay): Promise<AsyncGenerator<ChatResponse>> {
        if(this.history.ai1.length === 0){
            this.history.ai1.push({role:'system', content:play.instructionToAi1});
            this.history.ai2.push({role:'system', content:play.instructionToAi2});
            this.history.ai1.push({role:'user', content:play.prompt});
        }
        if (second) {
            this.history.ai1.push({role:'assistant', content:text});
            this.history.ai2.push({role:'user', content:text});
            return await ollama.chat({ model: "neural-chat", messages: this.history.ai2, stream: true, })
        }
        this.history.ai1.push({role:'user',content:text});
        this.history.ai2.push({role:'assistant', content:text});
        return ollama.chat({ model: "neural-chat", messages: this.history.ai1, stream: true });
    }

}