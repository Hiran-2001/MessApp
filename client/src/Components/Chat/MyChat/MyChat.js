import React, { useEffect } from 'react'
import { ChatState } from '../../../Context/ChatProvider';
import SearchBar from '../SearchBar/SearchBar'
import "./MyChat.css"
import { useState } from 'react';
import { useToast } from '@chakra-ui/react';
import axios from 'axios';
function MyChat() {
  const [loggedUser, setLoggedUser] = useState()
  const {setSelectedChat, selectedChat, user, notification,setNotification, chats, setChats,} = ChatState();

  const toast = useToast()

  const fetchChat = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`
        }
      };

      const { data } = await axios.get("/chat", config)
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
  }, [])

  return (
    <div id='myChat-div'>
      <SearchBar />
      MyChat
    </div>
  )
}

export default MyChat