import { Box } from "@chakra-ui/react";
import React from "react";
import { ChatState } from "../../Context/ChatProvider";
import ChatBox from "../Chat/ChatBox/ChatBox";
import ChatHeader from "../Chat/ChatHeader/ChatHeader";
import MyChat from "../Chat/MyChat/MyChat";
import SearchBar from "../Chat/SearchBar/SearchBar";
import "./ChatPage.css"
function Chat() {

const {user} = ChatState()

  return (

    <div className="chatpage">
    <ChatHeader/>
    {user && <SearchBar/>}
    <Box id="Box">
    {user && <MyChat/>}
    {user && <ChatBox/>}

    </Box>
    </div>
  )

}

export default Chat;
