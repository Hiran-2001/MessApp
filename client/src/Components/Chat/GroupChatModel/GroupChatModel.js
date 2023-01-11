import {
  Button,
  FormControl,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useState } from "react";
import { ChatState } from "../../../Context/ChatProvider";
import AddGroupUser from "../../UserLIst/AddGroupUser";
import UserList from "../../UserLIst/UserList";


export const GroupChatModel = ({ children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [groupChatName, setGroupChatName] = useState();
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const userInfo = JSON.parse(localStorage.getItem("userInfo"))
//   console.log(userInfo);
  //    console.log(token.token);
  const toast = useToast();

  const { user, chats, setChats } = ChatState();

  const handleSearch = async (q) => {
    setSearch(q);
    if (!q) {
      return;
    }
    try {
      setLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.get(`/user/alluser?search=${search}`, config);
      setLoading(false);
      setSearchResult(data);
      console.log(searchResult);
    } catch (error) {
      toast({
        title: "Error Occured",
        description: "Failed to load the search result",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };
  const handleSubmit = async() => {
    if(!groupChatName || !selectedUsers){
      toast({
        title: "please fill all the fields",
       status: "Warning",
       duration: 3000,
       isClosable: true,
       position: "top",
      })
      return;
    }
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const {data} = await axios.post('/chat/group',{
        name:groupChatName,
        users:JSON.stringify(selectedUsers.map((u)=> u._id))
      },
      config
      
      );
      setChats([data,...chats])
      onClose()
    } catch (error) {
      toast({
        title: "Something went wrong",
       status: "Warning",
       duration: 3000,
       isClosable: true,
       position: "top",
      })
    }

  };

  const handleGroup=(userToAdd)=>{
    if(selectedUsers.includes(userToAdd)){
     toast({
       title: "user already added",
       description: "Failed to load the search result",
       status: "error",
       duration: 3000,
       isClosable: true,
       position: "bottom-left",
     });
     return;
    }

    setSelectedUsers([...selectedUsers,userToAdd])
}

const handleDelete=(delUser)=>{
  // console.log(delUser);
  const reduceUser = selectedUsers.filter((e)=>{ return e._id !== delUser._id})
  setSelectedUsers(reduceUser)
}
  return (
    <div>
      <>
        <span onClick={onOpen}>{children}</span>
        
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader
              fontSize="25px"
              fontFamily="Work sans"
              d="flex"
              justifyContent="center"
            >
              New Group
            </ModalHeader>
            <ModalCloseButton />

            <ModalBody d="flex" flexDir="column" alignItems="center">
              <FormControl>
                <Input
                  placeholder="Group Name"
                  mb={3}
                  onChange={(e) => {
                    setGroupChatName(e.target.value);
                  }}
                />
                <Input
                  placeholder="Users"
                  mg={3}
                  onChange={(e) => {
                    handleSearch(e.target.value);
                  }}
                />
              </FormControl>
                    <div style={{display:"flex",backgroundColor:"blue", flexWrap:"wrap"}}>
                 
                 {
                  selectedUsers.map((u)=>{
                    return(

                    <AddGroupUser
                      key={user._id}
                      user={u}
                      handleFunction={()=>{handleDelete(u)}}
                    />
                    )

                  })
                 }
                    </div>


                  {
                    loading ? <span>Loading...</span> : (
                        searchResult.slice(0,4).map(user=>{
                            return (
                            <div style={{marginTop:"5px"}}>

                            <UserList  key={user._id} user={user} handleFunction={()=>{handleGroup(user)}} />
                            </div>
                            )
                        })
                    )
                  }
            </ModalBody>

            <ModalFooter>
              <Button colorScheme="red" mr="auto" onClick={handleSubmit}>
                Create Chat
              </Button>
              <Button colorScheme="blue" ml="auto" onClick={onClose}>
                Close
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    </div>
  );
};
