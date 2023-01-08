import {
  Avatar,
  Box,
  Button,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Text,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { FaUserAstronaut } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
// import { ChatState } from "../../../Context/ChatProvider";
import "./ChatHeader.css";
function ChatHeader() {
  // const [user,setUser] =useState()

    const navigate = useNavigate()
  // const { user } = ChatState();
  
  const userInfo = JSON.parse(localStorage.getItem("userInfo"))
    // console.log(userInfo);

  const logoutHandler =()=>{
    localStorage.removeItem("userInfo");
    navigate("/")
  }

  return (
    <div id="ChatHeader">
      <div className="logo">
        <Box>
          <FaUserAstronaut />
        </Box>
        <Text>MessUP</Text>
      </div>
      <div className="profile">
        <Menu id="profileMenu">
          <MenuButton as={Button}>
            <Avatar
              size="sm"
              cursor="pointer"
              name={userInfo.name}
              src={userInfo.pic}
            />
          </MenuButton>
          <MenuList>
            <MenuItem>My Profile</MenuItem>
            <MenuDivider />
            <MenuItem onClick={logoutHandler}>Logout</MenuItem>
          </MenuList>
        </Menu>
      </div>
    </div>
  );
}

export default ChatHeader;
