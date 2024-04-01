import React,{useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
 const Signup=()=>{
    const [name,setName]=useState("");
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const navigate=useNavigate();
    useEffect(()=>{
        const auth=localStorage.getItem("user");
        if(auth){
            navigate("/");
    }
});
    const collectData=async ()=>{
        console.warn(name,email,password);
        //INTIGRATE SIGNUP API IN REACT JS
        let result=await fetch("https://e-commerce-web-7.onrender.com/register",{
            method:"POST",
            body:JSON.stringify({name:name,email:email,password:password}),
            headers:{
                "Content-Type":"application/json",
                "Accept":"application/json"
            }
    });
    result = await result.json();
    console.warn(result);
    //to keep data in local storage
    localStorage.setItem("user",JSON.stringify(result.result));
    localStorage.setItem("token",JSON.stringify(result.auth));
    if(result){
        navigate("/"); //redirect to home page
    }
    }
return(

    <div className="register">
        <h1>Register</h1>
        <input className="inputBox" type="text"
         value={name} onChange={(e)=>setName(e.target.value)} placeholder="Enter Name"/>
        <input className="inputBox" type="text" 
        value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="Enter Email"/>
        <input className="inputBox" type="password"  
        value={password} onChange={(e)=>setPassword(e.target.value)}placeholder="Enter Password"/>
        <button onClick={collectData}  className="button" type="button">Sign Up</button>
    </div>
)
 }
 export default Signup;