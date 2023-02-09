import React, {useState,useRef,useEffect, useLayoutEffect} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from "axios"
import NavbarComponent from "../../components/NavbarComponent/NavbarComponent"


export default function MainPage({setQuantity}) {
    const [name, setName] = useState("")
    const navigate=useNavigate('')
    
    const getCookie = async () => {
      try {
        const {data} = await axios.get('http://localhost:8008/api/login', { withCredentials: true })
        setName(data.message)  
      }
      catch (error) {
        navigate("/")
        console.log(error);
      }
    
    }
    useLayoutEffect(()=>{
      getCookie()
    },[])
    
  return (
    name&&<>
    <NavbarComponent name={name}/>
    
    <input onChange={(e)=>setQuantity(e.target.value)} type number></input>
    <Link to="/order">daaa</Link>
    </>||navigate("/")
  )
}
