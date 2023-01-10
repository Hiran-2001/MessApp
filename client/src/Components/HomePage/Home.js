import React, { useEffect } from "react";
import { Box, Container, Tab, TabList, TabPanel, TabPanels, Tabs, Text } from "@chakra-ui/react";
import Login from "../Authentication/Login";
import Signup from "../Authentication/Signup";
import { useNavigate } from "react-router-dom";
function Home() {

  const Navigate = useNavigate()
  useEffect(() => {
  
      const userInfo = JSON.parse(localStorage.getItem("userInfo"))
  
       if (userInfo) {
          Navigate("/chat")
       }
        

    
  }, [Navigate])

  return (
    <Container maxW="x1" centerContent>
      <Box
        d="flex"
        justifyContent="center"
        p={3}
        bg="white"
        w="50%"
        m="40px 0 15px 0"
        borderRadius="lg"
        borderWidth="1px"
      >
        <Text fontSize="3xl" fontFamily="Work sans">
          MessUP
        </Text>
      </Box>
      <Box bg="white" p={3} w="50%" borderRadius="lg">
        <Tabs variant="soft-rounded" colorScheme="blue">
          <TabList mb="1em">
            <Tab width="50%">Login</Tab>
            <Tab width="50%">Sign Up</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
            {/* login component */}
              <Login/>
            </TabPanel>
            <TabPanel>
            {/* signup component  */}
              <Signup/>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Container>
  );
}

export default Home;
