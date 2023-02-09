import Button from "react-bootstrap/Button";
import PageHeader from "react-bootstrap/PageItem";
import Form from "react-bootstrap/Form";
import { useState, useRef } from "react";
import axios from "axios";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import "./LoginFormComponent.css";
function LoginFormComponent() {
  const input = useRef();
  const input2 = useRef();
  const navigate=useNavigate()
  const [validated, setValid] = useState(false);
  const getCookie = async () => {
      try {
        const { data } = await axios.get('http://localhost:8008/api/login', { withCredentials: true })
        console.log(data)
      }
      catch (error) {
        console.log(error );
      }
    }
  const storeCookie = async () => {
    try {
      const { data } = await axios.post(
        "http://localhost:8008/api/login",
        {
          username: input.current.value,
          password: input2.current.value
        },
        { withCredentials: true }
      );
      console.log(data)
    } catch (error) {
      console.log(error);
    }
  };

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = async (e) => {
    const form = e.currentTarget;
    e.preventDefault();
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
      setValid(true);
      return
    }
    if (form.checkValidity() === true) {
      setValid(true);
      e.preventDefault();
      console.log("e valid");
      
      await storeCookie();
      await getCookie();
      navigate("/main")
    }
  };
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
      }}
    >
      <Form
        noValidate
        id="box"
        validated={validated}
        onSubmit={(e) => {
          handleSubmit(e);
        }}
        style={{ textAlign: "center", padding: "2rem 1rem 1rem 1rem" }}
      >
        <h1 className="mb-5 card-title">Login</h1>
        <Form.Group className="mb-3"   >
          <Form.Floating className="mb-5">
            <Form.Control
              ref={input}
              id="floatingInputCustom"
              type="username"
              required
            />
            <label
              id="float"
              htmlFor="floatingInputCustom"
              style={{ paddingTop: "10px" }}
            >
              Username
            </label>
          </Form.Floating>
        </Form.Group>
        <Form.Group className="mb-3"   >
          <Form.Floating className="mb-5">
            <Form.Control ref={input2}id="floatingInputCustom" type="password" required />
            <label
              id="float"
              htmlFor="floatingInputCustom"
              style={{ paddingTop: "10px" }}
            >
              Password
            </label>
          </Form.Floating>
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
}

export default LoginFormComponent;
