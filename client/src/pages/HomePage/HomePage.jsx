import React from 'react'
import NavbarComponent from "../../components/NavbarComponent/NavbarComponent"
import FooterComponent from "../../components/FooterComponent/FooterComponent"
import RegisterFormComponent from "../../components/RegisterFormComponent/RegisterFormComponent"

const HomePage=()=>{
  return (
    <div className="HomePage">
        <NavbarComponent/>
        <RegisterFormComponent/>
        <FooterComponent/>
    </div>
  )
}

export default HomePage
