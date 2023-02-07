import {useState,useEffect} from 'react';
import {
  MDBBtn,
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBCheckbox,
  MDBValidation,
  MDBValidationItem,
  
}
from 'mdb-react-ui-kit';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Chip from '@mui/material/Chip';
import DeleteIcon from "@mui/icons-material/Delete"
import './RegisterFormComponent.css'
import { useNavigate,navi, Link } from 'react-router-dom';


function RegisterFormComponent() {
    const [path,setPath]=useState("/register")
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
      const data=await response.json()
      setPath("/")
      
    }
    const handleClick=()=>{
      
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
      <MDBValidation className='row g-3'onSubmit={(e)=>handleSubmit(e)}>
    
      <MDBContainer fluid className='d-flex align-items-center justify-content-center bg-image' style={{backgroundImage: 'url(https://mdbcdn.b-cdn.net/img/Photos/new-templates/search-box/img4.webp)'}}>
            <div className='mask gradient-custom-3'></div>
            <MDBCard className='m-5' style={{width: '450px'}}>
              <MDBCardBody className='px-5'>
                <h2 className="text-uppercase text-center mb-5">Create an account</h2>
                <MDBValidationItem feedback='Username is required' invalid>
                <MDBInput wrapperClass='mb-4' label='Your Name' size='lg' id='form1' type='text' required onChange={(e)=>setUsername(e.target.value)}/>
                </MDBValidationItem>
                <MDBValidationItem feedback='Email is Required' invalid>
                <MDBInput wrapperClass='mb-4' label='Your Email' size='lg' id='form2' type='email' required onChange={(e)=>setEmail(e.target.value)}/>
                </MDBValidationItem>
                <MDBValidationItem feedback='Password is required' invalid>
                <MDBInput wrapperClass='mb-4' label='Password' size='lg' id='form3' type='password' required onChange={(e)=>setPassword(e.target.value)}/>
                </MDBValidationItem>
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
                <MDBValidationItem feedback='Hospital is required' invalid>
              
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={hospital}
                    label="Age"
                    required
                    onChange={(e)=>handleCheck(e.target.value)}
                    sx={{width: "100%",height:50 }}
                  >
                    {
                      uncheckedHospitals?.map((e,i)=>{
                          return(
                            <MenuItem key={i}value={e['name']}>{e["name"]}</MenuItem>
                          )
                      })
                    }
                  </Select>
                  
                  </MDBValidationItem>
                <div className='d-flex flex-row justify-content-center mb-4'>
                  <MDBCheckbox name='flexCheck' id='flexCheckDefault' label='I agree all statements in Terms of service' />
                </div>
                <Link to={path} ><MDBBtn className='mb-4 w-100 gradient-custom-4' style={{maxHeight: '45px'}} size='lg'>Register</MDBBtn></Link>
              </MDBCardBody>
            </MDBCard>
      </MDBContainer>
      </MDBValidation>
      
  );
}

export default RegisterFormComponent;