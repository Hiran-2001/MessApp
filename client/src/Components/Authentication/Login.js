import {
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  VStack,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import "./Login.css"
function Login() {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  // const [loading, setLoading] = useState(false);
  const handleClick = () => setShow(!show);
  const toast = useToast()
  const navigate = useNavigate()

  const submitHandler = async () => {
  //  setLoading(true)

   if (!email || !password) {
    toast({
      title: "Please Fill all fields!",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
    })
    // setLoading(false)
    return
   }

   try {
    const config ={
      headers:{
        "Content-type": "application/json"
      },
    }

    const {data} = await axios.post("/user/login",{email,password},config)
      console.log(data);
      if (data.status===401) {
        toast({
          title: "Email or password is incorrect!",
            status: "error",
            duration: 5000,
            isClosable: true,
            position: "bottom",
        })
        // setLoading(false)
      }
    toast({
      title: "Login Successfully!",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
    })
    localStorage.setItem("userInfo",JSON.stringify(data));
    // setLoading(false)
    navigate('/chat')
   } catch (error) {
    toast({
      title: "Error Occured!",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
    })
   }
  };

  return (
    <div className="loginPage">

    <VStack color={"black"}>
      <FormControl id="first-name" isRequired>
        <FormLabel>Email</FormLabel>
        <Input
          placeholder="Enter Your Email"
          onChange={(e) => setEmail(e.target.value)}
        />
      </FormControl>
      <FormControl id="password" isRequired>
        <FormLabel>Password</FormLabel>
        <InputGroup>
          <Input
            type={show ? "text" : "password"}
            placeholder="Enter Your Your Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <InputRightElement width="4.5rem">
            <Button onClick={handleClick}>{show ? "Hide" : "Show"}</Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <Button
        colorScheme="blue"
        width="100%"
        style={{ marginTop: 15 }}
        onClick={submitHandler}
        // isLoading={loading}
      >
        Login
      </Button>
      <Button
        colorScheme="red"
        width="100%"
        style={{ marginTop: 15 }}
        onClick={() => {
          setEmail("guest@gmail.com");
          setPassword("guest@gmail.com");
        }}
      >
        Guest User
      </Button>
    </VStack>
    </div>
  );
}

export default Login;
