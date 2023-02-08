import {useState,useEffect} from 'react';
import './RegisterFormComponent.css'
import { useNavigate } from 'react-router-dom';
import Container from "react-bootstrap/Container"
import Form from "react-bootstrap/Form"
import Button from 'react-bootstrap/Button';
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import InputGroup from 'react-bootstrap/InputGroup';

function RegisterFormComponent() {
    const [validated,setValidated]=useState(false)
    const [error,setError]=useState(true)
    const navigate=useNavigate()
    const [username,setUsername]=useState("")
    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")
    const [checkedHospitals,setCheckedHospitals]=useState([])
    const [uncheckedHospitals,setUncheckedHospitals]=useState([])
    const [hospital,setHospital]=useState('')
    const [hospitals,setHospitals]=useState([])
    const handleSubmit=async (e)=>{
      e.preventDefault()
      
        const response1=await fetch('http://localhost:8008/api/register',{
          method:"PUT",
          headers:{
            "Content-Type":"application/json"
          },
          body:JSON.stringify({
            username:username,
            hospital:checkedHospitals,
          })
      })
      const response2=await fetch('http://localhost:8008/api/register',{
        method:"post",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify({
          username:username,
          email:email,
          password:password
        })
      })
      navigate('/')

      const data1=await response1.json()
      const data2=await response1.json()

      
    }
    const getHospitals=async()=>{
        const response=await fetch("http://127.0.0.1:8008/api/hospitals")
        const data=await response.json()
        setHospitals(data)
        setUncheckedHospitals(data)
      }
      useEffect(()=>{
        getHospitals()    
    },[])
    const handleDelete=(e)=>{
      let hospitalss=checkedHospitals.filter((element)=>{
        if(element!==e)
        {
          return element
        }
      })
      setCheckedHospitals(hospitalss)
      hospitals.map((e)=>{
        if(e['name']===hospital)
        {
          setUncheckedHospitals([...uncheckedHospitals,e])
        }
      })

    }
    const handleCheck=(e)=>{
        setHospital(e)
        setError(false)
    }
    useEffect(()=>{
      if(hospital){
        let unCheck;
        setCheckedHospitals([...checkedHospitals,hospital])
        unCheck=uncheckedHospitals.filter((element)=>{
          if(element['name']!==hospital)
          {
            return element
          }
        })
        setUncheckedHospitals(unCheck)
      }
  },[hospital])
  return (
<Form noValidate validated={validated} onSubmit={handleSubmit}>
      <Row className="mb-3">
        <Form.Group as={Col} md="4" controlId="validationCustom01">
          <Form.Label>First name</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="First name"
            defaultValue="Mark"
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="4" controlId="validationCustom02">
          <Form.Label>Last name</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Last name"
            defaultValue="Otto"
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="4" controlId="validationCustomUsername">
          <Form.Label>Username</Form.Label>
          <InputGroup hasValidation>
            <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
            <Form.Control
              type="text"
              placeholder="Username"
              aria-describedby="inputGroupPrepend"
              required
            />
            <Form.Control.Feedback type="invalid">
              Please choose a username.
            </Form.Control.Feedback>
          </InputGroup>
        </Form.Group>
      </Row>
      <Row className="mb-3">
        <Form.Group as={Col} md="6" controlId="validationCustom03">
          <Form.Label>City</Form.Label>
          <Form.Control type="text" placeholder="City" required />
          <Form.Control.Feedback type="invalid">
            Please provide a valid city.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="3" controlId="validationCustom04">
          <Form.Label>State</Form.Label>
          <Form.Control type="text" placeholder="State" required />
          <Form.Control.Feedback type="invalid">
            Please provide a valid state.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="3" controlId="validationCustom05">
          <Form.Label>Zip</Form.Label>
          <Form.Control type="text" placeholder="Zip" required />
          <Form.Control.Feedback type="invalid">
            Please provide a valid zip.
          </Form.Control.Feedback>
        </Form.Group>
      </Row>
      <Form.Group className="mb-3">
        <Form.Check
          required
          label="Agree to terms and conditions"
          feedback="You must agree before submitting."
          feedbackType="invalid"
        />
      </Form.Group>
      <Button type="submit">Submit form</Button>
    </Form>
  );
}

export default RegisterFormComponent;