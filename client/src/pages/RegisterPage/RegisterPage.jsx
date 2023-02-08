import React from 'react'
import NavbarComponent from "../../components/NavbarComponent/NavbarComponent"
import RegisterFormComponent from "../../components/RegisterFormComponent/RegisterFormComponent"

const RegisterPage=()=>{
  return (
    <div className="RegisterPage" style={{overflow:"hidden"}}>
        <NavbarComponent/>
        <RegisterFormComponent/>
    </div>
  )
}

export default RegisterPage
