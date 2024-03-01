
import { RolePlay } from "../roleplays/roleplays";

export interface Message{
    role: 'system' | 'user' | 'assistant',
    content: string
}

export interface ChatHistory{
    ai1:Message[];
    ai2:Message[];
}

export interface GptApi<I,O> {
    prompt(text:I, second:boolean, play:RolePlay): Promise<AsyncIterable<O>>;
    extractFromStream(chunk:O):string;
}