import { Avatar, Box, Text } from '@chakra-ui/react'
import React from 'react'
import { ChatState } from '../../Context/ChatProvider'
import "./userList.css"
function UserList({ user, handleFunction }) {
    return (

        <Box
            id='userlistBox'
            onClick={handleFunction}

            w="100%"
            d='flex'
            alignItems="center"
            color="white"
            px={2}
            py={2}
            mb={2}
            borderRadius="lg"
        >
            <Avatar
                mr={2}
                size="sm"
                cursor="pointer"
                name={user.name}
                src={user.pic}
            />
            <Box>
                <Text>{user.name}</Text>
                <Text fontSize="xs">
                    <b>Email:</b>
                    {user.email}
                </Text>
            </Box>

        </Box>

    )
}

export default UserList