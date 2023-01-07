import { Box, Button, Text, Tooltip } from "@chakra-ui/react";
import React, { useState } from "react";
import {FaSearch} from "react-icons/fa"
function SearchBar() {
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState();
  return (
    <div>
      <Box 
      d="flex"
      justifyContent="space-between"
      alignItems="center"
      bg="white"
      w="100%"
      p="5px 10px 5px 10px"
      borderWidth="5px">
        <Tooltip label="Search users to chat" hasArrow placement="bottom-end">
          <Button variant="ghost">
            <FaSearch/>
            <Text d={{base:"none", md:"flex"}}>
                Search User
            </Text>
          </Button>
        </Tooltip>
      </Box>
    </div>
  );
}

export default SearchBar;
