import React from "react";
import { MDBFooter, MDBContainer, MDBCol, MDBRow } from "mdb-react-ui-kit";

const FooterComponent = () => {
  return (
    <MDBFooter bgColor="light" className="text-center text-lg-left ">
      <MDBContainer className="p-4">
        <MDBRow>
          <MDBCol lg="6" md="12" className="mb-4 mb-md-0">
            <h5 className="text-uppercase">Amazing product quality</h5>
            <p>
              High quality luxury face masks directly out of chinese factories
              and labor camps. Competitive and affordable prices for average
              western european countries. Adjusted for inflation,
            </p>
          </MDBCol>

          <MDBCol lg="6" md="12" className="mb-4 mb-md-0">
            <h5 className="text-uppercase">Best services in town</h5>

            <p>
              Our masks are <strong>always</strong> (meaning never) delivered on
              time with our high quality passenger trains. Prefilled with
              bacteria from our VERY happy train passengers.
            </p>
          </MDBCol>
        </MDBRow>
      </MDBContainer>

      <div
        className="text-center p-3"
        style={{ backgroundColor: "black" }}
      >
        &copy; {new Date().getFullYear()} Copyright:{" "}
        <a className="text-dark" href="https://www.cfrcalatori.ro/">
          Suprataxa CFR
        </a>
      </div>
    </MDBFooter>
  );
};
export default FooterComponent;
