import React from 'react'
import Container from 'react-bootstrap/Container'
import RegisterForm from '../../components/RegisterForm/RegisterForm'
import './Register.css'

export default function () {
  return (
    <div
      id="page"
      className="d-flex justify-content-md-center align-items-center vh-100"
    >
      <Container id="registerContainer" className="mw">
        <RegisterForm />
      </Container>
    </div>
  );
}
