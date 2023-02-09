
import NavbarComponent from "../../components/NavbarComponent/NavbarComponent"
import RegisterFormComponent from "../../components/RegisterFormComponent/RegisterFormComponent"
import axios from "axios";
import { useLayoutEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
const RegisterPage=()=>{
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
        <>
        <NavbarComponent/>
        <RegisterFormComponent/>
        </>  
  )
}

export default RegisterPage
