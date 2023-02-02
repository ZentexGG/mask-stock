import React from "react";
import LoginForm from "../../components/LoginForm/LoginForm";
import Container from "react-bootstrap/Container";
import "./Login.css";

export default function Login() {
  return (
    <div
      id="page"
      className="d-flex justify-content-md-center align-items-center vh-100"
    >
      <Container id="loginContainer" className="mw">
        <LoginForm />
      </Container>
    </div>
  );
}
