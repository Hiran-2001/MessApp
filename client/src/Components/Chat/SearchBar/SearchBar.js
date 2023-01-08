import { Box, Button, Input, useToast } from "@chakra-ui/react";
import axios from "axios";
import React, { useState } from "react";
// import { FaSearch } from "react-icons/fa"
import {ChatState} from "../../../Context/ChatProvider"
import UserList from "../../UserLIst/UserList";
import ChatLoading from "../ChatLoading/ChatLoading";
import "./Search.css"
function SearchBar() {
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState();

  const userInfo = JSON.parse(localStorage.getItem("userInfo"))
    // console.log(userInfo.token);
  const {
    setSelectedChat,
    user,
    notification,
    setNotification,
    chats,
    setChats,
  } = ChatState();
  const toast = useToast()

  // searching a user 


  const handleSearch = async()=>{
    if(!search){
      toast({
        title: "Please Enter something!",
          status: "warning",
          duration: 5000,
          isClosable: true,
          position: "top-left",
      })
      return
    }

    try {
      setLoading(true)
      const config = {
        headers:{
          Authorization: `Bearer ${userInfo.token}`
        }
      }

      const {data} = await axios.get(`user/alluser?search=${search}`,config)
        setLoading(false);
        setSearchResult(data)
        console.log(searchResult);
    } catch (error) {
      toast({
        title: "Error Occured!",
        description:"Failed to Load the Search Results",
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "bottom-left",
      })
    }
  }

  // Accessing all chat 

  const accessChat= async(userId)=>{
       
    try {
      setLoadingChat(true)
      const config = {
        headers:{
          "Content-type": "application/json",
          Authorization: `Bearer ${user.token}`,
        }
      }
         
      const {data} = await axios.post('/chat' ,{userId},config)
      if(!chats.find((c)=>c._id===data._id)) setChats([data,...chats])

        setSelectedChat(data)
        setLoadingChat(false)
        onclose();
    } catch (error) {
      toast({
        title: "Error fetching the chat!",
        description:"Failed to Load the Search Results",
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "bottom-left",
      })
    }
      }
  return (
    <div id="search-box-div">
      <Box id="Search-box">
        <Input
          placeholder="Search User"
            value={search}
            onChange={(e)=>{setSearch(e.target.value)}}
          />

        <Button onClick={handleSearch}>Go</Button>
      </Box>
        {

        loading ? <ChatLoading/> : (
          searchResult.map((user)=>{
            return(
              <UserList
              key={user._id}
              user={user}
              handleFunction={() => accessChat(user._id)}
            />
            )
            
          })
        )}
    </div>
  );
}

export default SearchBar;
