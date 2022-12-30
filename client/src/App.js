import './App.css';
import { Routes, Route } from "react-router-dom";
import Home from './Components/HomePage/Home';
import Chat from './Components/ChatPage/Chat';
function App() {
  return (
    <div className="App">
      <Routes>
      <Route path="/" element={<Home/>} />    
      <Route path="/chat" element={<Chat/>} />    
        </Routes>
    </div>
  );
}

export default App;
