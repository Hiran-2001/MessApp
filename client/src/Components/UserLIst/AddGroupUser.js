import { Box, CloseButton } from "@chakra-ui/react";
import React from "react";
import "./AddGroupUser.css"
const AddGroupUser = ({ user, handleFunction }) => {
  return (
    <Box
    id="addGroupUser"
      px={2}
      py={1}
      borderRadius="lg"
      m={1}
      mb={2}
      cursor="pointer"
      onClick={handleFunction}
    >
      <p>{user.name}</p>
      <CloseButton />
    </Box>
  );
};

export default AddGroupUser;
