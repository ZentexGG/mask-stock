import React from "react";
import { MDBFooter, MDBContainer, MDBCol, MDBRow } from "mdb-react-ui-kit";

export default function FooterComponent() {
  return (
    <MDBFooter
      bgColor="light"
      className="text-center text-lg-left"
      style={{ position: "fixed", left: "0", bottom: "0", right: "0" }}
    >
      <MDBContainer className="p-4">
        <MDBRow>
          <MDBCol lg="6" md="12" className="mb-4 mb-md-0">
            <h5 className="text-uppercase">FOR TESTING PURPOSES</h5>

            <p>
              This site is not finished because we were lazy and did not manage
              to finish last week's SI's
            </p>
          </MDBCol>

          <MDBCol lg="6" md="12" className="mb-4 mb-md-0">
            <h5 className="text-uppercase">FRONTEND TEST</h5>

            <p>
              Also, we didn't actually manage to finish the site because there
              is not backend on our site and the one we wrote is good for
              nothing
            </p>
          </MDBCol>
        </MDBRow>
      </MDBContainer>

      <div
        className="text-center p-3"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}
      >
        &copy; {new Date().getFullYear()} Copyright:{" "}
        <a
          className="text-dark"
          href="https://www.sacredtreasure.org/cv%20rom/CV.pdf"
        >
          Marcela Ghiulbenghian
        </a>
      </div>
    </MDBFooter>
  );
}
