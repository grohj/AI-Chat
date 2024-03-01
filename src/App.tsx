import './App.css'
import { Center, ChakraProvider, extendTheme } from "@chakra-ui/react";
import { ChatContainer } from "./components/ChatContainer.tsx";
import { PlayBook } from './roleplays/roleplays.ts';
import { Video } from './components/Video.tsx';
import { useState } from 'react';
import { VideoOrder } from './roleplays/videos.ts';


const theme = extendTheme({
    fonts: {
        heading: `'Midnight Fat', sans-serif`,
        body: `'Midnight', sans-serif`,
      },
})
function App() {
    const [videosPlaying, setVideosPlaying] = useState(true);
    const [videoIndex, setVideoIndex] = useState(0);

    const onVideoEnd = () => {
        console.log("Video ended", videoIndex);
        
        if (videoIndex < VideoOrder.length -1) {
            setVideoIndex(index => index + 1)
        }
        else {
            setVideosPlaying(false)
            setVideoIndex(0)
        }
    }

    const onChatEnd = () : void => {

        setVideoIndex(0);
        setVideosPlaying(true)
        console.log("Chat ended")
    }


    const plays = Object.values(PlayBook);
    const  playContext = plays[Date.now()%plays.length]
    return (
        <ChakraProvider theme={theme}>

            {videosPlaying ?
                <Video src={VideoOrder[videoIndex]} onEnd={onVideoEnd} /> :
                <ChatContainer context={playContext} onChatEnd={onChatEnd}></ChatContainer>
                }

        </ChakraProvider>
    )
}

export default App
