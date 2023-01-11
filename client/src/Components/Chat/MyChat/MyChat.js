import React, { useEffect } from 'react'
import { ChatState } from '../../../Context/ChatProvider';
import SearchBar from '../SearchBar/SearchBar'
import "./MyChat.css"
import { useState } from 'react';
import { Box, Button, Stack, Text, useToast } from '@chakra-ui/react';
import axios from 'axios';
import { IoMdAdd } from "react-icons/io"
import ChatLoading from "../ChatLoading/ChatLoading"
import { GroupChatModel } from '../GroupChatModel/GroupChatModel';
function MyChat({fetchChatsAgain}) {
  const [loggedUser, setLoggedUser] = useState()
  const { setSelectedChat, selectedChat, user, notification, setNotification, chats, setChats, } = ChatState();

  const toast = useToast()
  const token = JSON.parse(localStorage.getItem("userInfo"))
  // console.log(token.token);
  const fetchChat = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token.token}`
        }
      };

      const { data } = await axios.get("/chat", config)
      console.log(data);
      setChats(data)
    } catch (error) {
      toast({
        title: "Error Occured!",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top-left",
      })
    }
  }


  useEffect(() => {
    setLoggedUser(JSON.parse(localStorage.getItem("userInfo")))
    fetchChat()
  }, [fetchChatsAgain])

  const getSender = (loggedUser, users) => {
    return users[0]._id === loggedUser._id ? users[1].name : users[0].name
  }

  return (
    <div
      d={{ base: selectedChat ? "none" : "flex", md: "flex" }}
      flexDir="column"
      alignItems="center"
      p={3}
      w={{ base: "100%", md: "31%" }}
      borderRadius="lg"
      borderWidth="1px"
    >
      <Box id='myChat-div' >

        <Box
          id='myChat-Box'
          pb={3}
          px={3}
          fontSize={{ base: "28px", md: "30px" }}
          fontFamily="Work sans"

          w="100%"

        >Chats
          <GroupChatModel>

          <Button rightIcon={<IoMdAdd />}>New Group</Button>
          </GroupChatModel>
        </Box>
        <SearchBar />

        <Box
          d="flex"
          flexDir="column"
          p={3}
          w="100%"
          h="74vh"
          overflow="hidden"

        >
          {
            chats ? (
              <Stack overflowY="scroll">
                {
                  chats.map((chat) => {
                    return (
                      <Box
                        onClick={() => setSelectedChat(chat)}
                        cursor="pointer"
                        bg={selectedChat === chat ? "black" : "white"}
                        color={selectedChat === chat ? "white" : "black"}
                        borderRadius={selectedChat===chat ? "lg" : ""}
                        px={3}
                        py={2}
                        key={chat._id}
                      >
                        <Text>
                        {!chat.isGroupChat ? getSender(loggedUser, chat.users) : chat.chatName}
                        </Text>
                      </Box>
                    )

                  })
                }
              </Stack>
            ) : (
              <ChatLoading />
            )
          }
        </Box>
      </Box>
    </div>
  )
}

export default MyChat