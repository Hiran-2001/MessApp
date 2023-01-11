import { Box, Img, Text } from '@chakra-ui/react'
import React from 'react'
import { ChatState } from '../../../Context/ChatProvider'
import chatLogo from "../../../Assets/images.png"
function SingleChat({fetchChatsAgain,setFetchChatsAgain}) {

    const {user,selectedChat,setSelectedChat} = ChatState()
  return (
    <div>
       {selectedChat ? (
        <>
           <Text>Sreekutty</Text>
        </>
       ):(
        <Box d="flex" alignContent="center" justifyContent="center" h="100%">
        <Text textAlign="center">
           <img src={chatLogo} alt='it logo'/>
           Select Chat To Continue
        </Text>


        </Box>
       )}
    </div>
  )
}

export default SingleChat