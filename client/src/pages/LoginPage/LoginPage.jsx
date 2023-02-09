import LoginFormComponent from "../../components/LoginFormComponent/LoginFormComponent";
import NavbarComponent from "../../components/NavbarComponent/NavbarComponent"
import axios from "axios";
import { useLayoutEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
const LoginPage=()=>{
    const [name,setName]=useState("")
  const navigate = useNavigate()
  const getCookie = async () => {
    try {
      const {data} = await axios.get('http://localhost:8008/api/login', { withCredentials: true })
      setName(data.message)  
    }
    catch (error) {
      console.log(error);
    }
  
  }
  useLayoutEffect(()=>{
    getCookie()
  },[])
    return (
        name&&navigate("/main")||<>
        <NavbarComponent name={name}/>
        <LoginFormComponent/>
        </>  
    )
}

export default LoginPage