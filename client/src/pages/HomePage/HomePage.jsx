import React, { useEffect, useState } from 'react'
import NavbarComponent from "../../components/NavbarComponent/NavbarComponent"
import FooterComponent from "../../components/FooterComponent/FooterComponent"
import LoginFormComponent from "../../components/LoginFormComponent/LoginFormComponent"
import './HomePage.css'
import Container from 'react-bootstrap/esm/Container'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/esm/Button'
import { useNavigate } from 'react-router-dom'

const HomePage=()=>{
  const [path,setPath]=useState("")
  const navigate = useNavigate()
  useEffect(()=>{
    if(path)
    {
      navigate(path)
    }
  },[path])
  return (
    <div className="HomePage">
        <NavbarComponent/>
        <Container id="main"fluid style={{textAlign:"center",height:"73.5vh",alignItems:"center",display:"grid",margin:0}}>
            <Container style={{maxWidth:"65%"}}>
            <Row> 
              <Col>
              <h1>
                Welcome to our website! If you don't already have an account you can register by pressing the button register.
                </h1>
              </Col>
            </Row>
            </Container>
            <Container fluid style={{height:"100%",display:"grid",alignItems:"baseline",maxWidth:"65%"}}>
            <Row>
              <Col>
              <Button variant="primary" style={{width:"40%",height:'130%'}} onClick={()=>setPath('/register')}>Register</Button>
              </Col>
              <Col>
              <Button variant="primary" style={{width:"40%",height:'130%'}} onClick={()=>setPath("/login")}>Login</Button>
              </Col>
            </Row>
            </Container>
        </Container>
        <FooterComponent/>  
    </div>
  )
}

export default HomePage;
