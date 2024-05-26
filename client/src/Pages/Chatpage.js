import { Box } from "@chakra-ui/layout";
import { useState } from "react";
import { ChatState } from "../Context/ChatProvider";
import Chatbox from "../Components/Chatbox";
import MyChats from "../Components/MyChats";
import SideDrawer from "../Components/miscellaneous/SideDrawer";

const Chatpage = () => {
  const [fetchAgain, setFetchAgain] = useState(false);
  const { user } = ChatState();

  return (
    <div style={{ width: "100%", height: "91.5vh" }}>
    {user && <SideDrawer />}
    <div style={{ display: "flex", width: "100%", height: "100%" }}>
      {user && (
        <div
          style={{
            width: "25%",
            height: "100%"
          }}
        >
          <MyChats fetchAgain={fetchAgain} />
        </div>
      )}
      {user && (
        <div  style={{
          width: "75%",
          height: "100%",
        }}>
          <Chatbox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
        </div>
      )}
    </div>
  </div>
  );
};

export default Chatpage;
