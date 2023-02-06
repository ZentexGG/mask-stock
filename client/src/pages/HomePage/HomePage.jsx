import React from 'react'
import NavbarComponent from "../../components/NavbarComponent/NavbarComponent"
import FooterComponent from "../../components/FooterComponent/FooterComponent"
const HomePage=()=>{
  return (
    <div className="HomePage">
        <NavbarComponent/>
        <div className="LandingPage">
          
        </div>
        <FooterComponent className="fixed-bottom"/>
    </div>
  )
}

export default HomePage
