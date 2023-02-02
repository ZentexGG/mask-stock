import React from "react";
import Card from "react-bootstrap/Card";
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
        <Card.Link href="#">Card Link</Card.Link>
        <Card.Link href="#">Another Link</Card.Link>
      </Card.Body>
    </Card>
  );
}
