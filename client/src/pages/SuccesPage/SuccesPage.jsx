import React, { useState, useLayoutEffect } from "react";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import NavbarComponent from "../../components/NavbarComponent/NavbarComponent";

export default function SuccesPage({ response }) {
  const handleClick = () => {
    fetch("http://localhost:8008/api/invoice").then((response) => {
      response.blob().then((blob) => {
        const fileURL = window.URL.createObjectURL(blob);
        let alink = document.createElement("a");
        alink.href = fileURL;
        alink.download = "invoice.pdf";
        alink.click();
      });
    });
  };

  const navigate = useNavigate("");
  const [name, setName] = useState("");
  const getCookie = async () => {
    try {
      const { data } = await axios.get("http://localhost:8008/api/login", {
        withCredentials: true,
      });
      setName(data.message);
    } catch (error) {
      navigate("/");
      console.log(error);
    }
  };
  useLayoutEffect(() => {
    getCookie();
  }, []);

  return (
    (name && (
      <div>
        <NavbarComponent name={name} />
        <h1 id="success">Your order was placed succesfully!</h1>
        <center>
          <Button onClick={handleClick} size="lg">
            Download Invoice
          </Button>
        </center>
        <br />
        <center>
          <Button onClick={() => navigate("/main")}>Back to dashboard</Button>
        </center>
      </div>
    )) ||
    navigate("/")
  );
}
