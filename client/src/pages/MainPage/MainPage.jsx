import React, {useState,useRef,useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import axios from "axios"
import NavbarComponent from "../../components/NavbarComponent/NavbarComponent"


export default function MainPage() {
    const [name, setName] = useState("")
    const navigate=useNavigate('')
    
    const getCookie = async () => {
      try {
        const {data} = await axios.get('http://localhost:8008/api/login', { withCredentials: true })
        console.log(data)
        setName(data.message)        
      }
      catch (error) {
        console.log(error);
      }
    
    }
    getCookie()
    
  return (
    <>
    <NavbarComponent/>
    <div>{name ? name:navigate('/')}</div>
    </>
  )
}
