import Button from "react-bootstrap/Button";
import PageHeader from "react-bootstrap/PageItem"
import Form from "react-bootstrap/Form";
import { useState } from "react";
import FloatingLabel from "react-bootstrap/FloatingLabel"
import Cookies from "js-cookie";
import './LoginFormComponent.css'
function LoginFormComponent() {
  const [validated,setValid]=useState(false)
  const saveCookies = (cookies) => {
    cookies.forEach((cookie) => {
      Cookies.set(cookie.name, cookie.value, { expires: cookie.expires });
    });
  };

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = async (e) => {
    const form = e.currentTarget;
    e.preventDefault()
    if (form.checkValidity() === false) {
    e.preventDefault();
    e.stopPropagation();
    setValid(true);
    }
  if (form.checkValidity() === true) {
    setValid(true);
    e.preventDefault();
    console.log('e valid')
    // TODO FETCH IN DB
  }
    const response = await fetch("http://localhost:8008/api/login", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    });
    const data = await response.headers["Cookie"];
    console.log(data);  
  };
  return (
    <div style={{display:"flex",justifyContent:"center",alignItems:"center",width:"100%"}}>
      <Form noValidate id='box' validated={validated} onSubmit={(e)=>{handleSubmit(e)}} style={{textAlign:"center",width:"30%",padding:"2rem 1rem 1rem 1rem"}}> 
      <h1 className="mb-5 card-title">Login</h1>
        <Form.Group className="mb-3" controlId="formBasicEmail">
        <FloatingLabel
        id="float"
        controlId="floatingInput"
        label="Username"
        className="mb-5"
         >
          <Form.Control type="email" placeholder="Enter email" required/>
        </FloatingLabel>
        </Form.Group>     
        <Form.Group className="mb-3" controlId="formBasicEmail">
        <FloatingLabel
        id="float"
        controlId="floatingInput"
        label="Email address"
        className="mb-5"
         >
          <Form.Control type="email" placeholder="Enter email" required/>
        </FloatingLabel>
        </Form.Group>

      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
    </div>
  );
}

export default LoginFormComponent;
