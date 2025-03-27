import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Bottomwarning } from "./buttonwarning";

export function Login(){
    const [username,setUsername] = useState("");
    const [password,setPassword] = useState("");
    const navigate = useNavigate()

    function handleLogin(){
        if(!username || !password){
            alert("username and password required")
        }

        axios.post("https://to-do-wine-tau.vercel.app/login",{
            username : username,
            password : password
        }).then((res)=>{
            const token = res.data.token;
            sessionStorage.setItem("token",token);
            console.log("Successfull Login");
            navigate("/todos");
        }).catch(err=>{
            if(err.response && err.response.data.error){
                alert(err.response.data.error)
            }else{
                console.log(err);
                alert("Login failed");
            }
        })
    }

    return(
        <div className="flex justify-center bg-black h-screen w-screen">
           <div className="flex flex-col items-center">
                <h1 className="mt-6 text-6xl pt-4 font-bold bg-gradient-to-r from-rose-400 via-fuchsia-500 to-indigo-500 bg-clip-text text-transparent">Flow List</h1>
                <input className="w-full border border-gray-500 rounded-sm py-1 mt-8 p-1 text-white" type="text" placeholder="Enter Username" onChange={(e)=>{
                    setUsername(e.target.value);
                }}/> <br />
                <input className="w-full border border-gray-500 rounded-sm py-1 p-1 text-white" type="text" placeholder="Enter Password" onChange={(e)=>{
                    setPassword(e.target.value);
                }}/> <br />
                <button className="border border-black-500 mt-2 text-2xl p-2 bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl rounded-md" onClick={handleLogin}>Submit</button>
                <Bottomwarning label={"Don't have an account ?"} buttonText={" Sign up"} to={"/signup"}></Bottomwarning>
            </div> 
        </div>
        
    )
}
