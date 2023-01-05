import {
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  useToast,
  VStack,
} from "@chakra-ui/react";
import React, { useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

function Signup() {

  const navigate = useNavigate()
  const [show, setShow] = useState(false);
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [pic, setPic] = useState();
  const [picLoading, setPicLoading] = useState(false);
  const toast = useToast()
  const handleClick = () => setShow(!show);
  
 

  const postDetails = (pics) => {
    setPicLoading(true);
    if (pics === undefined) {
      toast({
        title: "Please Select an Image!",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }

    // console.log(pics);
    if (pics.type === "image/jpeg" || pics.type === "image/png" || pics.type === "image/jpg") {
      const data = new FormData();
      data.append("file", pics);
      data.append("upload_preset", "MessUp");
      data.append("cloud_name", "dtipbxhkg");
      fetch("https://api.cloudinary.com/v1_1/dtipbxhkg/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          setPic(data.url.toString());
          console.log(data.url.toString());
          setPicLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setPicLoading(false);
        });
    } else {
      toast({
        title: "Please Select an Image!",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setPicLoading(false);
      return;
    }
  }


  const submitHandler = async () => {
    setPicLoading(false);
    if (!name || !email || !password || !confirmPassword) {
      toast({
        title: "Please fill all the fields!",
        status: "warning",
        duration: 3000,
        isClosable: true,
        position: "bottom",
      })
      setPicLoading(false)
      return;
    }
    if (password !== confirmPassword) {
      toast({
        title: "Password doesnt match!",
        status: "warning",
        duration: 3000,
        isClosable: true,
        position: "bottom",
      })
      return;
    }

    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        }
      };
      const { data } = await axios.post("/user/register", { name, email, password, pic }, config)
      toast({
        title: "Registration successful!",
        status: "warning",
        duration: 3000,
        isClosable: true,
        position: "bottom",
      })

      localStorage.setItem('userinfo',JSON.stringify(data))
      setPicLoading(false)
      navigate("/chat")
    } catch (error) {
      toast({
        title: "Error Occured!",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "bottom",
      })
      setPicLoading(false)
    }

  }
  return (
    <VStack color={"black"}>
      {/* name */}
      <FormControl id="first-name" isRequired>
        <FormLabel>Name</FormLabel>
        <Input
          placeholder="Enter Your Name"
          onChange={(e) => setName(e.target.value)}
        />
      </FormControl>

      {/* email */}
      <FormControl id="email" isRequired>
        <FormLabel>Email</FormLabel>
        <Input
          placeholder="Enter Your Email"
          onChange={(e) => setEmail(e.target.value)}
        />
      </FormControl>
      {/* password  */}
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
      {/* confirm password  */}
      <FormControl id="c-password" isRequired>
        <FormLabel> Confirm Password</FormLabel>
        <InputGroup>
          <Input
            type={show ? "text" : "password"}
            placeholder="Enter Your Your Password"
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <InputRightElement width="4.5rem">
            <Button onClick={handleClick}>{show ? "Hide" : "Show"}</Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      {/* Pic */}
      <FormControl id="email" isRequired>
        <FormLabel>Picture</FormLabel>
        <Input
          type="file"
          p={1.5}
          accept="image/*"
          onChange={(e) => postDetails(e.target.files[0])}
        />
      </FormControl>

      <Button
        colorScheme="blue"
        width="100%"
        style={{ marginTop: 15 }}
        onClick={submitHandler}
        isLoading={picLoading}
      >
        Sign Up
      </Button>
    </VStack>
  );
}

export default Signup;
