import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import NoteState from "./context/NoteState";
import Alert from "./components/Alert";
import Login from "./components/Login";
import Signup from "./components/Signup";


function App() {
  return (
   <>
   <NoteState>
   <Navbar/>
   <Alert/>
   <div className="container">
   <Routes>

    <Route path="/" element={<Home/>} />
    <Route path="/about" element={<About/>} />
    <Route  path="/login" element={<Login/>} />
    <Route path="/signup" element={<Signup/>} />
   
   </Routes>
   </div>
   </NoteState>
   </>
  );
}

export default App;
