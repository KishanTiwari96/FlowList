import {BrowserRouter,Routes,Route, useNavigate} from "react-router-dom"
import { Signup } from "./components/signup";
import { Login } from "./components/login";
import { Todos } from "./components/Todos";
import "./App.css"

function App(){
  return(
    <div >
      <BrowserRouter>
        <Routes>
          <Route path = "/" element = {<AppBar />}></Route>
          <Route path = "/signup" element = {<Signup />}></Route>
          <Route path = "/login" element = {<Login />}></Route>
          <Route path = "/todos" element = {<Todos />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

function AppBar(){
  const navigate = useNavigate();
  return (
    <div className="font-semibold text-center bg-black h-screen w-screen">
      <h1 className="mt-6 text-8xl pt-4 bg-gradient-to-r from-rose-400 via-fuchsia-500 to-indigo-500 bg-clip-text text-transparent">To-Do App</h1>      
      <button className="border border-black-500 mt-20 text-2xl p-2  bg-gray-500 hover:bg-blue-500 rounded-md" onClick={()=>{
        navigate("/signup")
      }}>Sign Up</button>
      <br /><br />
      <button className="border border-black-500 mt-2 text-2xl p-2  bg-gray-500 hover:bg-blue-500 rounded-md" onClick={()=>{
        navigate("/login")
      }}>Login</button>
    </div>
  )
}

export default App;
