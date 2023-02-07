import {useState,useEffect} from 'react';
import {
  MDBBtn,
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBCheckbox
}
from 'mdb-react-ui-kit';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Chip from '@mui/material/Chip';
import './RegisterFormComponent.css'


function RegisterFormComponent() {
    const [checkedHospitals,setCheckedHospitals]=useState([])
    const [hospital,setHospital]=useState('')
    const [hospitals,setHospitals]=useState([])
    const getHospitals=async()=>{
        const response=await fetch("http://127.0.0.1:8008/api/hospitals")
        const data=await response.json()
        setHospitals(data)

    }
    useEffect(()=>{
        getHospitals()
    },[])
    const handleCheck=(e)=>{

        setHospital(e)
    

    }
    useEffect(()=>{
      if(hospital){
        let uncheckedHospitals;
        setCheckedHospitals([...checkedHospitals,hospital])
        uncheckedHospitals=hospitals.filter((element)=>{
          if(element['name']!==hospital)
          {
            return element
          }
        })
        setHospitals(uncheckedHospitals)
      }
  },[hospital])
  return (
  <MDBContainer fluid className='d-flex align-items-center justify-content-center bg-image' style={{backgroundImage: 'url(https://mdbcdn.b-cdn.net/img/Photos/new-templates/search-box/img4.webp)'}}>
  <div className='mask gradient-custom-3'></div>
  <MDBCard className='m-5' style={{width: '500px'}}>
    <MDBCardBody className='px-5'>
      <h2 className="text-uppercase text-center mb-5">Create an account</h2>
      <MDBInput wrapperClass='mb-4' label='Your Name' size='lg' id='form1' type='text'/>
      <MDBInput wrapperClass='mb-4' label='Your Email' size='lg' id='form2' type='email'/>
      <MDBInput wrapperClass='mb-4' label='Password' size='lg' id='form3' type='password'/>
      <MDBInput wrapperClass='mb-4' label='Repeat your password' size='lg' id='form4' type='password'/>
      <div>
        {checkedHospitals?.map((e)=>{
            return(
              <Chip label={e} onDelete/>          
            )
        })}
      </div>
      <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={hospital}
          label="Age"
          onChange={(e)=>handleCheck(e.target.value)}
          sx={{width: 400,height:50 }}
        >
          {
            hospitals.map((e)=>{
                return(
                    <MenuItem value={e['name']}>{e['name']}</MenuItem>
                )
            })
          }
        </Select>
      <div className='d-flex flex-row justify-content-center mb-4'>
        <MDBCheckbox name='flexCheck' id='flexCheckDefault' label='I agree all statements in Terms of service' />
      </div>
      <MDBBtn className='mb-4 w-100 gradient-custom-4' style={{maxHeight: '45px'}} size='lg'>Register</MDBBtn>
    </MDBCardBody>
  </MDBCard>
</MDBContainer>
  );
}

export default RegisterFormComponent;