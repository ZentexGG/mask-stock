import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import maskImg from "./../../img/mask-1.jpg";

export default function ProductCard({text, price, description}) {
  return (
    <Card style={{ width: "18rem" }}>
      <Card.Img src={maskImg} />
      <Card.Body>
        <Card.Title>Face Mask</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{price} {text}</Card.Subtitle>
        <Card.Text>
          {description}
        </Card.Text>
        <Button>Add to Cart</Button>
      </Card.Body>
    </Card>
  );
}
