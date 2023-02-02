import React from "react";
import { useState,useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

export default function RegisterForm() {
  const [valid, setValid] = useState(false);
  const [hospitals, setHospitals] = useState(null);
  const handleSubmit = (e) => {
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    }
    setValid(true);
    if (form.checkValidity() === true) {
      setValid(true);
        e.preventDefault();
        console.log("Valid, Fetch in DB")
      // TODO FETCH IN DB
    }
  };
  const getHospitals = async () => {
    let resp = await fetch("http://127.0.0.1:2002/api/signup");
    resp = await resp.json();
    setHospitals(resp);
  };
    
  useEffect(()=>{
    getHospitals()
  },[])

  return (
    <div>
      <h1>Register</h1>
      <Form noValidate validated={valid} onSubmit={handleSubmit}>
        <Form.Group controlId="formEmail">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            required
            type="email"
            placeholder="Enter email..."
            size="lg"
          />
          <Form.Control.Feedback type="invalid">
            Please enter a valid email!
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="formEmail">
          <Form.Label>Username</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Enter username..."
            size="lg"
          />
          <Form.Control.Feedback type="invalid">
            Please enter a valid username!
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="formPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            required
            type="password"
            placeholder="Enter password..."
            size="lg"
          />
          <Form.Control.Feedback type="invalid">
            Please enter a password!
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group>
          <Form.Label>Select hospital</Form.Label>
          <Form.Select size="lg">
            {hospitals?.map((e,i) => {
              return <option key={i}>{e["name"]}</option>;
            })}
          </Form.Select>
        </Form.Group>

        <br />
        <Button variant="success" type="submit">
          Login
        </Button>
      </Form>
    </div>
  );
}
