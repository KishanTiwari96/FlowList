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

        axios.post("http://localhost:3000/login",{
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
        <div className="flex justify-center">
           <div className="flex flex-col items-center">
                <h1 className="mt-6 text-6xl pt-4 font-bold ">To-Do App</h1>
                <input className="w-full border border-gray-500 rounded-sm py-1 mt-8 p-1" type="text" placeholder="Enter Username" onChange={(e)=>{
                    setUsername(e.target.value);
                }}/> <br />
                <input className="w-full border border-gray-500 rounded-sm py-1 p-1" type="text" placeholder="Enter Password" onChange={(e)=>{
                    setPassword(e.target.value);
                }}/> <br />
                <button className="border border-black-500 mt-2 text-2xl p-2  bg-gray-500 hover:bg-blue-500 rounded-md" onClick={handleLogin}>Submit</button>
                <Bottomwarning label={"Don't have an account ?"} buttonText={" Sign up"} to={"/signup"}></Bottomwarning>
            </div> 
        </div>
        
    )
}