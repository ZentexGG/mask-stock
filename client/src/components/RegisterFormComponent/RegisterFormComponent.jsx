import {useState,useEffect} from 'react';
import './RegisterFormComponent.css'
import { useNavigate } from 'react-router-dom';
import Chip from "@mui/material/Chip"
import DeleteIcon from "@mui/icons-material/Delete"
import FloatingLabel from "react-bootstrap/FloatingLabel"
import Container from "react-bootstrap/Container"
import Form from "react-bootstrap/Form"
import Button from 'react-bootstrap/Button';

function RegisterFormComponent() {
    const [validated,setValid]=useState(false)
    const [error,setError]=useState(true)
    const navigate=useNavigate("/login")
    const [username,setUsername]=useState("")
    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")
    const [checkedHospitals,setCheckedHospitals]=useState([])
    const [uncheckedHospitals,setUncheckedHospitals]=useState([])
    const [hospital,setHospital]=useState('')
    const [hospitals,setHospitals]=useState([])
    const putRequest=async ()=>{
      const response=await fetch('http://localhost:8008/api/register',{
        method:"PUT",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify({
          username:username,
          hospital:checkedHospitals,
        })
      })
      const data1=await response.json()
      console.log(data1)
    }
    const postRequest=async ()=>{
      const response2=await fetch('http://localhost:8008/api/register',{
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify({
          username:username,
          email:email,
          password:password
        })
      })
      const data2=await response2.json()
      console.log(data2)
      console.log(data2)
    }
    const handleSubmit=async (e)=>{
      e.preventDefault()
      const form = e.currentTarget;
      if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
      setValid(true);
      return
    }
    navigate("/login")
    if (form.checkValidity() === true) {
      setValid(true);
      e.preventDefault();
      // TODO FETCH IN DB
      await postRequest()
      await putRequest()
    }
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
      let checked=checkedHospitals.filter((element)=>{
        console.log(element)
        if(element!==e)
        {
          return element 
        }
      })
      setCheckedHospitals(checked)
      let unchecked=hospitals.filter((element)=>{
        if(element['name']===e)
        {
          return e 
        }
      })
      setUncheckedHospitals([...uncheckedHospitals,unchecked[0]])
    }
    const handleCheck=(e)=>{
        setHospital(e)
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
    <div style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
      <Form noValidate id='box' validated={validated} onSubmit={(e)=>{handleSubmit(e)}} style={{textAlign:"center",width:"90%",padding:"2rem 1rem 1rem 1rem"}}> 
      <h1 className="mb-5 card-title">Register</h1>
        <Form.Group className="mb-3">
        <Form.Floating className="mb-5">
        <Form.Control
          id="floatingInputCustom"
              type="username"
              maxLength={30}
          onChange={(e)=>{setUsername(e.target.value)}}
        />
        <label id="float" htmlFor="floatingInputCustom" style={{paddingTop:"10px"}}>Username</label>
      </Form.Floating>
        </Form.Group>     
        <Form.Group className="mb-3"  >
        <Form.Floating className="mb-5">
        <Form.Control
          id="floatingInputCustom"
          type="email"
          onChange={(e)=>{setEmail(e.target.value)}}
        />
        <label id="float" htmlFor="floatingInputCustom" style={{paddingTop:"10px"}}>Email address</label>
      </Form.Floating>
        </Form.Group>
        <Form.Group className="mb-3" >
        <Form.Floating className="mb-5">
        <Form.Control
          id="floatingInputCustom"
              type="password"
              minLength={1}
              onChange={(e) => { setPassword(e.target.value) }}
        />
        <label id="float" htmlFor="floatingInputCustom" style={{paddingTop:"10px"}}>Password</label>
      </Form.Floating>
        </Form.Group>
        <Form.Group className="mb-3">
        <Container>
        {checkedHospitals?.map((e)=>{
                      return(
                        <Chip
                        label={e}
                        onDelete={()=>handleDelete(e)}
                        deleteIcon={<DeleteIcon />}
                        variant="outlined"
                      />          
                      )
                  })}
        </Container>
        <Form.Select size="sm" label="Choose a hospital" required defaultValue="Choose a hospital" onChange={(e)=>{handleCheck(e.target.value)}} id="select" className='mb-4'>
          <option value="">Select the hospitals</option>
          {
            uncheckedHospitals.map((e)=>{
              return(
                <option value={e['name']}>{e['name']}</option>
              )
            })
          }
        </Form.Select>
        
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
      </div>
  );
}

export default RegisterFormComponent;