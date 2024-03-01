import {Avatar, Box, Flex, SkeletonText, Text} from "@chakra-ui/react";
import {Colors} from "../colors/Colors.ts";

export interface ChatBubbleProps {
    name: string,
    avatarSrc: string,
    message: string,
    color: string,
    textColor: string,
    origin: "start" | "end"
    loading: boolean
}

export const ChatBubble = ({name, avatarSrc, message, color, textColor, origin, loading}: ChatBubbleProps) => {

    return <Flex gap={2} maxW="85%" alignSelf={origin === "start" ? "flex-start" : "flex-end"}>
        {!origin || origin === "start" ? <Avatar name={name} src={avatarSrc}/> : null}
        <Flex direction="column" alignItems={"start"}>
            <Text color="white" px={2} fontSize="small">{name}</Text>
            <Box borderRadius={10} bg={color || 'green'} borderTopLeftRadius={origin === "start" ? 10 : 10}
                 borderTopRightRadius={origin === "start" ? 10 : 10}>
                <div className={origin === "start" ? "tail-left " : "tail-right"} style={{backgroundColor: color}}/>

                <SkeletonText py={2} px={4} isLoaded={!loading}>
                    <Text textAlign="start" color={textColor || 'white'} fontSize="lg">{message}</Text>
                </SkeletonText>
            </Box>
        </Flex>
        {origin === "end" ? <Avatar name={name} src={avatarSrc}/> : null}
    </Flex>

}


export const createErrorBubbleProps = ({origin, avatarSrc, error, name}: { origin: "start" | "end", avatarSrc: string, error: string, name: string }): ChatBubbleProps => ({
    color: Colors.gray,
    textColor: 'red',
    loading: false,
    origin,
    avatarSrc,
    message: error,
    name: name
})