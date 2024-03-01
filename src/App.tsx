import './App.css'
import {ChakraProvider} from "@chakra-ui/react";
import {ChatContainer} from "./components/ChatContainer.tsx";
import { PlayBook } from './roleplays/roleplays.ts';

function App() {
    const play = PlayBook.GhandiVsSteveJobsBraginn;

    
    return (
        <ChakraProvider>
            <ChatContainer context={play}></ChatContainer>
        </ChakraProvider>
    )
}

export default App
