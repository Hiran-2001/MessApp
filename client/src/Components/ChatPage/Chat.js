import { Box } from "@chakra-ui/react";
import React, { useState } from "react";
import { ChatState } from "../../Context/ChatProvider";
import ChatBox from "../Chat/ChatBox/ChatBox";
import ChatHeader from "../Chat/ChatHeader/ChatHeader";
import MyChat from "../Chat/MyChat/MyChat";
import "./ChatPage.css"
function Chat() {

  const { user } = ChatState()
    const [fetchChatsAgain,setFetchChatsAgain] = useState(false)
  return (

    <div className="chatpage">
      <ChatHeader />
      <Box id="Box">
        <MyChat fetchChatsAgain={fetchChatsAgain} />
        <ChatBox fetchChatsAgain={fetchChatsAgain} setFetchChatsAgain={setFetchChatsAgain}/>

      </Box>
    
    </div>
  )

}

export default Chat;
