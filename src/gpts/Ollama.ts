import { RolePlay } from "../roleplays/roleplays";
import { GptApi } from "./GptApi"
import ollama, { ChatResponse, GenerateResponse } from 'ollama'

export class Ollama implements GptApi<string, ChatResponse>{
    extractFromStream(chunk: ChatResponse): string {
        return chunk.message.content;
    }
    async prompt(text: string, second: boolean, play:RolePlay): Promise<AsyncGenerator<ChatResponse>> {
        console.log(text, second);
        if (second) {
            return await ollama.chat({ model: "llama2-uncensored", messages: [
                { role: 'system', content: `${second ? play.instructionToAi2 : play.instructionToAi1}. While answering, consider this topic ${play.prompt}, but do not use it literally` },
                { role: 'user', content: `This is the last message you received from your friend ${text}. Respond in maximum of 2 sentences to the topic. Make sure the conversation is natural and to also ask questions to the parnter.` }
            ], stream: true, })
        }
        
        return ollama.chat({ model: "llama2-uncensored", messages: [{
             role: 'user', content: text }, 
             { role: 'system', content: play.instructionToAi1 }], stream: true });

        // return await ollama.generate({
        //     stream: true,
        //     model: 'neural-chat',
        //     system: `You are chatting with somebody online. You are acting as ${second? 'Steve Jobs' : 'Gandhi'}. Be absolutely rude and wild. If you feel like the conversation is at the end. Come up with wild and bizzare next topic. Speak like a human.`,
        //     // template: 'Conversation',
        //     prompt: `This is the previous message in the conversation ${text}. Provide short answer to this message without the use of markdown. Be brief and use maximum of 3 short sentences. You must response as closely as the person you are representing would. Use only natural sentences that would be used in a real conversation.`
        // })
    }

}