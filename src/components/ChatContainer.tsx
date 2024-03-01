import {Flex, Text} from "@chakra-ui/react";
import {ChatBubble, ChatBubbleProps, createErrorBubbleProps} from "./ChatBubble.tsx";
import {useEffect, useRef, useState} from "react";
import {Colors} from "../colors/Colors.ts";
import { Ollama } from "../gpts/Ollama.ts";
import { OllamaHistory } from "../gpts/OllamaHistory.ts";
import { ChatGPT } from "../gpts/ChatGPT.ts";
import { RolePlay } from "../roleplays/roleplays.ts";

export interface ChatContainerProps {
    context: RolePlay;
}





export const ChatContainer = ({context}: ChatContainerProps) => {

    // Fuck this type.
const gptBubbleData: Record<number, Exclude<ChatBubbleProps, ChatBubbleProps['message'] | ChatBubbleProps['loading']>> = {
    // 0 is on the left, 1 is on the right
    // @ts-ignore
    0: {
        name: context.ai1Name || '',
        avatarSrc: '',
        color: Colors.blue,
        textColor: 'white',
        origin:'start',
    },
    // @ts-ignore
    1: {
        name: context.ai2Name || '',
        avatarSrc: '',
        color: Colors.purple,
        textColor: 'white',
        origin: 'end'
    }
}


    let isPlaying = false;

    const firstGpt = useRef(new OllamaHistory());
    const secondGpt = useRef(new OllamaHistory());
    const gpts = [firstGpt, secondGpt];

    const [messages, setMessages] = useState<ChatBubbleProps[]>([]);

    let messageHistory = messages.map(message => ({role: 'user', content: message.message}))



    const replaceMessages = (newMessage: ChatBubbleProps) => {
        setMessages((innerMessages) => {
            return [...innerMessages.slice(0, innerMessages.length - 1), newMessage]
        })
    }

    const playMessages = async () => {
        let lastContext = context.prompt;
        for (let i = 0; i < 10; i++) {
            const side = i % 2;
            const gpt = gpts[side].current;


            /*
                Or just render another empty ChatMessage in the render with loading = true.
                But nobody ain't got time fo' dat.
             */
            setMessages((innerMessages) => {
                // @ts-ignore
                return [...innerMessages, {
                    ...gptBubbleData[side],
                    message: 'loading..',
                    loading: true
                }]

            })





   

            try {
                const response = await gpt.prompt(messageHistory, !!side, context);
                if(typeof response === "string")
                {
                    lastContext = response;

                    replaceMessages({
                        ...gptBubbleData[side],
                        message: response,
                        loading: false
                    })
                }
                else {
                    let responseText:string = "";
                    for await (const part of response) {
                        responseText += gpt.extractFromStream(part);
                        replaceMessages({
                            ...gptBubbleData[side],
                            message: responseText,
                            loading: false
                        });  
                    }
                    lastContext=responseText;
                     
                }
            } catch (e) {
                console.error("GptApi Prompting failed: ", e)
                replaceMessages(createErrorBubbleProps({
                    ...gptBubbleData[side],
                    error: "Failed to fetch from GPT API. This is faked error with 30% probability, don't be alarmed.",
                    name: 'OH-SO',
                }))
                // TODO: Decrement `i` ? And maybe come up with better loop altogether.
            }
        }
    }

    useEffect(() => {
        // Fucking React triggers this useEffect twice
        // Do not use React 18 ;) 
        if (!isPlaying) {
            isPlaying = true;
            playMessages()
        }
    }, [])


    return <Flex gap="4" w="100%" direction="column" p={4}>
        <Text fontSize="xx-large" color="white">{context.prompt}</Text>
        {messages.map((message, i) => <ChatBubble key={i} {...message} />)}
    </Flex>
}