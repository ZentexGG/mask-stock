import React from 'react'
import NavbarComponent from "../../components/NavbarComponent/NavbarComponent"
import FooterComponent from "../../components/FooterComponent/FooterComponent"
import RegisterFormComponent from "../../components/RegisterFormComponent/RegisterFormComponent"

const RegisterPage=()=>{
  return (
    <div className="RegisterPage">
        <NavbarComponent/>
        <RegisterFormComponent/>
    </div>
  )
}

export default RegisterPage
