import React from "react";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
export default function LoginForm() {
  const [valid, setValid] = useState(false);
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
      console.log("Valid, Fetch in DB");
      // TODO FETCH IN DB
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <Form noValidate validated={valid} onSubmit={handleSubmit}>
        <Form.Group controlId="formEmail">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            required
            type="email"
            placeholder="Enter email..."
            size="lg"
          />
        </Form.Group>

        <Form.Group controlId="formPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            required
            type="password"
            placeholder="Enter password..."
            size="lg"
          />
        </Form.Group>
        <br />
        <Button variant="success" type="submit">
          Login
        </Button>
      </Form>
    </div>
  );
}
