import React from "react";
import NavbarComponent from "../../components/NavbarComponent/NavbarComponent";
import FooterComponent from "../../components/FooterComponent/FooterComponent";
import "./MainPage.css";
import ProductCard from "../../components/ProductCard/ProductCard";
import Container from "react-bootstrap/esm/Container";

export default function MainPage() {
  return (
    <div style={{ height: "100vh" }}>
      <NavbarComponent />
      <Container fluid className="row me-1000px">
        <ProductCard
          text={"(Worn by Marcela)"}
          price={"1.000.000€"}
          description="Special & Limited edition version of the face mask with Marcela's bacteria and viruses on it. Truly special collector's item."
        />
        <ProductCard
          text={"(Too big? That's what she said)"}
          price={"10€"}
          description="Face mask.Two milimiters of cloth protecting you, that is a looooot, to much i'd say. Good for 2 seconds it's a lot isn't it?"
        />
      </Container>
      <FooterComponent id="footerComp" />
    </div>
  );
}
