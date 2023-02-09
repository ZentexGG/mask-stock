import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import MaskImg from "../../img/mask-img.jpg";
import Form from "react-bootstrap/Form";

export default function CardComponent({ order }) {
  const [value, setValue] = useState("");
  const [currentStock, setCurrentStock] = useState(0);
  const [price, setPrice] = useState(0);
  const handleChange = (e) => {
    let result = e.target.value.replace(/\D/g, "");
    setValue(result);
  };

  const getStock = async () => {
    let data = await fetch("http://localhost:8008/api/stock");
    data = await data.json();
    setCurrentStock(data[0]["stock"]);
    setPrice(data[0]["price"]);
  };
  getStock();

  return (
    <Card style={{ width: "18rem" }}>
      <Card.Img variant="top" src={MaskImg} />
      <Card.Body>
        <Card.Title>100 pcs Face Mask Box</Card.Title>
        <Card.Text>
          Delivered and packaged with care by passenger trains at CFR Calatori.
          Please excuse us for the 99% delayed orders, we are doing the best we
          can.
        </Card.Text>
        <Form.Control
          onChange={handleChange}
          value={value}
          placeholder="Input ammount of boxes..."
        ></Form.Control>
        <Card.Footer>Price per box: {price}€</Card.Footer>
        <Card.Footer>Available Stock: {currentStock} boxes</Card.Footer>
        {value <= 0 ? (
          <p style={{ color: "red", fontSize: "0.9rem" }}>
            The ammount should be bigger than 0
          </p>
        ) : (
          ""
        )}
        <Button onClick={(e) => order(e, value)} variant="primary">
          Place your order
        </Button>
      </Card.Body>
    </Card>
  );
}
