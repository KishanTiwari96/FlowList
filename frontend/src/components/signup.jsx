import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom";
import { Bottomwarning } from "./buttonwarning";

export function Signup(){
    const [user,setUser] = useState("");
    const [pass,setPass] = useState("");
    const navigate = useNavigate();

    function handleSignUp(){
        if(!user || !pass){
            alert("username and password required")
        }

        axios.post("https://to-do-wine-tau.vercel.app/signup",{
            username : user,
            password : pass
        }).then((res)=>{
            axios.post("https://to-do-wine-tau.vercel.app/login",{
                username : user,
                password : pass
            }).then((res)=>{
                const token = res.data.token;
                sessionStorage.setItem("token",token);
                navigate("/todos")
            }).catch((err)=>{
                console.log("Failure in logging in",err);
            })
        }).catch((err)=>{
            if(err.response){
                if(err.response.status == 411){
                    alert("Username already taken")
                }else if(err.response && err.response.data.error){
                    alert(err.response.data.error)
                }else{
                    console.log(err);
                    alert("Failure in signup");
                }
            }
        })
    }
    return(
        <div className="flex justify-center bg-black h-screen w-screen">
            <div className="flex flex-col items-center ">
                <h1 className="mt-6 text-6xl pt-4 font-bold bg-gradient-to-r from-rose-400 via-fuchsia-500 to-indigo-500 bg-clip-text text-transparent" >Flow List</h1>
                <input className="w-full border border-gray-500 rounded-sm py-1 mt-8 p-1 text-white" type="text" placeholder="Enter Username" onChange={(e)=>{
                    setUser(e.target.value);
                }}/> <br />
                <input className="w-full border border-gray-500 rounded-sm py-1 p-1 text-white" type="text" placeholder="Enter Password" onChange={(e)=>{
                    setPass(e.target.value);
                }}/> <br />
                <button className="border border-black-500 mt-2 text-2xl p-2 bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl rounded-md" onClick={handleSignUp}>Submit</button>
                <Bottomwarning label={"Already have an account ? "} buttonText={"Login"} to={"/login"}></Bottomwarning>
            </div>
        </div>
        
    )
}
