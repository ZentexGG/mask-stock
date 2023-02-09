import React from 'react'
import { cookies } from 'react-cookie';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function LogoutPage() {
    const navigate = useNavigate()
    const logout = async () => {
        const { data } = await axios.get("http://localhost:8008/api/logout", {withCredentials: true})
        console.log(data);
        navigate("/")
    }
    logout();
  return (
    <div>
      <h1 id="Logout">Logging out...</h1>
    </div>
  )
}