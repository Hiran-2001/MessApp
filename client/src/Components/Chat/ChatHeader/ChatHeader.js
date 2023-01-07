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
import React from "react";
import { FaUserAstronaut } from "react-icons/fa";
import { ChatState } from "../../../Context/ChatProvider";
import "./ChatHeader.css";
function ChatHeader() {
  const { user } = ChatState();
  return (
    <div id="ChatHeader">
      <div className="logo">
        <Box>
          <FaUserAstronaut />
        </Box>
        <Text>MessUP</Text>
      </div>
      <div className="profile">
        <Menu id="profile-menu">
          <MenuButton  as={Button}>
            <Avatar
              size="sm"
              cursor="pointer"
              name={user.name}
              src={user.pic}
            />
          </MenuButton>
          <MenuList>
            <MenuItem>My Profile</MenuItem>
            <MenuDivider />
            <MenuItem>Logout</MenuItem>
          </MenuList>
        </Menu>
      </div>
    </div>
  );
}

export default ChatHeader;
