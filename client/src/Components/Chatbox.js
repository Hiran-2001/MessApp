import { Box } from "@chakra-ui/layout";
import "./styles.css";
import SingleChat from "./SingleChat";
import { ChatState } from "../Context/ChatProvider";

const Chatbox = ({ fetchAgain, setFetchAgain }) => {
  const { selectedChat } = ChatState();

  return (
  <div
  style={{
    display: selectedChat ? 'flex' : 'none',
    alignItems: 'center',
    flexDirection: 'column',
    padding: '12px',
    background: 'white',
    width: '100%',
    height: '100%',
    borderRadius: 'lg',
    borderWidth: '1px',
  }}
>
  <SingleChat fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
</div>
  );
};

export default Chatbox;
