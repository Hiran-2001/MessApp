import React, { useEffect, useState } from "react";
import axios from "axios";
function Chat() {
  const [user, setUser] = useState([]);
  const fetchApi = async () => {
    const res = await axios.get("/user");
    setUser(res.data);
    console.log(user);
  };

  useEffect(() => {
    fetchApi();
  }, []);
  return (

    <div>
       <h2>Data</h2>
       
        </div>
  )
  
}

export default Chat;
