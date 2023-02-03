import React from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col, Button, Jumbotron } from "react-bootstrap";

export default function HomePage() {
  return (
    <Container>
      <Row className="justify-content-center">
        <Col xs={10} md={8} lg={6}>
          <div className="jumbotron">
            <h1 className="display-4">Welcome to Mask Stock!</h1>
            <p className="lead">Choose one of the following options:</p>
            <hr className="my-4" />
            <Row className="justify-content-center">
              <Col xs={10} md={8} lg={6} className="text-center">
                <Link to="/login">
                  <Button variant="primary" size="lg" block="true">
                    Login
                  </Button>
                </Link>
                <Link to="/register">
                  <Button variant="secondary" size="lg" block="true">
                    Register
                  </Button>
                </Link>
              </Col>
            </Row>
          </div>
        </Col>
      </Row>
    </Container>
  );
};


