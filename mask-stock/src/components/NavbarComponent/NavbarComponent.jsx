import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Form from "react-bootstrap/Form";

function NavbarComponent() {
  const handleChange = (e) => {
    let selectedOption = e.target.options[e.target.options["selectedIndex"]];
  };

  return (
    <Navbar bg="dark" variant="dark" sticky="top">
      <Container fluid>
        <Navbar.Brand href="#home">Navbar</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link href="#home">Home</Nav.Link>
          <Nav.Link href="#features">Features</Nav.Link>
          <Nav.Link href="#pricing">Pricing</Nav.Link>
        </Nav>
        <Nav className="mr-auto">
          <Nav.Link>
            <Form.Select size="sm" onChange={handleChange}>
              <option>Placeholder Hospital 1</option>
              <option>Placeholder Hospital 2</option>
              <option>Placeholder Hospital 3</option>
              <option>Placeholder Hospital 4</option>
              <option>Placeholder Hospital 5</option>
              <option>Placeholder Hospital 6</option>
              <option>Placeholder Hospital 7</option>
              <option>Placeholder Hospital 8</option>
              <option>Placeholder Hospital 9</option>
              <option>Placeholder Hospital 10</option>
            </Form.Select>
          </Nav.Link>
          <Nav.Link>Account name</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
}

export default NavbarComponent;
