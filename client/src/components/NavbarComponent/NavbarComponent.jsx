import { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Form } from 'react-bootstrap';

function NavbarComponent({name}) {
  const [hospitals,setHospitals]=useState([])

  const getHospitals=async ()=>{
    try{
    const response=await fetch("http://localhost:8008/api/hospitals",{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({
        user:"daniekk"
      })
    })
    const data=await response.json()
    setHospitals(data)
  }catch(error){
    console.log(error)
  }
  }
  getHospitals()
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" fixed='top'>
      <Container>
        <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#features">{name? "":'Login'}</Nav.Link>
            <Nav.Link href="#pricing">{name? "":'Register'}</Nav.Link>
          </Nav>
          <Nav>
            <NavDropdown title="select">
              {
                hospitals ? hospitals.map((e)=>{
                  return(
                    <NavDropdown.Item>{e['name']}</NavDropdown.Item>
                  )
                }):""
              }
            </NavDropdown>
            <Nav.Link eventKey={2} href="#memes">
              {name? name:""}
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarComponent;