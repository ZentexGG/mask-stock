import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Row from "react-bootstrap/Row";
import Badge from 'react-bootstrap/Badge';
import ListGroup from "react-bootstrap/ListGroup";
import { useNavigate } from "react-router-dom";
import FloatingLabel from "react-bootstrap/FloatingLabel";

function OrderFormComponent({ quantity, name }) {
  const [hospitals, setHospitals] = useState([]);
  const [validated, setValidated] = useState(false);
  const [selectedHospital, setSelectedHospital] = useState(null)
  const navigate = useNavigate();

  

  const getHospitals = async () => {
    try {
      const response = await fetch("http://localhost:8008/api/hospitals", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user: name,
        }),
      });
      const data = await response.json();
      setHospitals(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getHospitals();
  }, [hospitals])

  const handleSubmit = async (e) => {
    e.preventDefault();
    let response = await fetch("http://localhost:8008/api/order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        quantity: quantity,
        hospital: selectedHospital,
      }),
    })
    response = await response.json()
    navigate('/success')

  };

  const handleSelect = (e) => {
    setSelectedHospital(e.target.childNodes[e.target.selectedIndex].innerText)
  }

  return (
    <>
      <Form
        noValidate
        validated={validated}
        onSubmit={handleSubmit}
        id="box"
        className="p-4"
      >
      <ListGroup as="ul">
        <ListGroup.Item
          as="li"
        >
          <div className="ms-2 me-auto">
              <div className="fw-bold">{quantity} x Face Mask Box</div>
            100 piece Face Mask Box
          </div>
        </ListGroup.Item>
        </ListGroup> <br />
          <Form.Select required onChange={handleSelect}>
          {!selectedHospital && <option>Select your hospital...</option>}
            {hospitals?.map((e, i) => <option key={i}>{e['name']}</option>)}
          </Form.Select> <br />
        {selectedHospital && <Button type="submit" >Place order</Button>}
      </Form>
    </>
  );
}

export default OrderFormComponent;
