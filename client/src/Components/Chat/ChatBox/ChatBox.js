import React from 'react'
import "./ChatBox.css"
import {ChatState} from "../../../Context/ChatProvider"
import {Box} from "@chakra-ui/react"
import SingleChat from '../SingleChat/SingleChat'
function ChatBox({fetchChatsAgain,setFetchChatsAgain}) {
  const {selectedChat} = ChatState()
  return (
    <Box id='chatBox'
    d={{base:selectedChat ? "flex" : "none",md:"flex"}}
    alignItems="center"
    flexDir="column"
    p={3}
    bg="white"
    w={{base:"100%",md:"68%"}}
    borderRadius="lg"
    borderWidth="1px"

    >
     <SingleChat fetchChatsAgain={fetchChatsAgain} setFetchChatsAgain={setFetchChatsAgain}/>
    </Box>
  )
}

export default ChatBox