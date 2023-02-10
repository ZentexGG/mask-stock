import { useState, useEffect, useId, useRef } from "react";
import { useNavigate } from "react-router-dom";

import "./RegisterFormComponent.css";

import Chip from "@mui/material/Chip";
import DeleteIcon from "@mui/icons-material/Delete";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

function RegisterFormComponent() {
    const [validated, setValid] = useState(false);
    const navigate = useNavigate("/login");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [checkedHospitals, setCheckedHospitals] = useState([]);
    const [uncheckedHospitals, setUncheckedHospitals] = useState([]);
    const [hospital, setHospital] = useState("");
    const [hospitals, setHospitals] = useState([]);

    const userRef = useRef(null);
    const mailRef = useRef(null);
    const passRef = useRef(null);
    const id = useId();

    const putRequest = async () => {
        const response = await fetch("http://localhost:8008/api/register", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                username: userRef.current.value,
                hospital: checkedHospitals,
            }),
        });
        const data1 = await response.json();
        console.log(data1);
    };

    const postRequest = async () => {
        const response2 = await fetch("http://localhost:8008/api/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                username: userRef.current.value,
                email: mailRef.current.value,
                password: passRef.current.value,
            }),
        });
        const data2 = await response2.json();
        console.log(data2);
        console.log(data2);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = e.currentTarget;
        if (form.checkValidity() === false) {
            setValid(true);
            return;
        } else {
            setValid(true);
            await postRequest();
            await putRequest();
        }
        navigate("/login");
    };

    const getHospitals = async () => {
        const response = await fetch("http://127.0.0.1:8008/api/hospitals");
        const data = await response.json();
        setHospitals(data);
        setUncheckedHospitals(data);
    };

    useEffect(() => {
        getHospitals();
    }, []);

    const handleDelete = (e) => {
        setCheckedHospitals(
            checkedHospitals.filter((element) => element !== e)
        );

        let unchecked = hospitals.filter(({ name }) => name === e);
        setUncheckedHospitals([...uncheckedHospitals, unchecked[0]]);
    };

    const handleCheck = (e) => {
        setHospital(e.target.value);
    };

    useEffect(() => {
        if (hospital) {
            setCheckedHospitals([...checkedHospitals, hospital]);
            setUncheckedHospitals(
                uncheckedHospitals.filter(({ name }) => name !== hospital)
            );
        }
    }, [hospital]);

    return (
        <div
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }}>
            <Form
                noValidate
                id="box"
                validated={validated}
                onSubmit={handleSubmit}
                style={{
                    textAlign: "center",
                    width: "90%",
                    padding: "2rem 1rem 1rem 1rem",
                }}>
                <h1 className="mb-5 card-title">Register</h1>
                <Form.Group className="mb-3">
                    <Form.Floating className="mb-5">
                        <Form.Control
                            id={`${id}-user`}
                            type="username"
                            maxLength={30}
                            ref={userRef}
                        />
                        <label
                            htmlFor={`${id}-user`}
                            style={{ paddingTop: "10px" }}>
                            Username
                        </label>
                    </Form.Floating>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Floating className="mb-5">
                        <Form.Control
                            id={`${id}-email`}
                            type="email"
                            ref={mailRef}
                        />
                        <label
                            htmlFor={`${id}-email`}
                            style={{ paddingTop: "10px" }}>
                            Email address
                        </label>
                    </Form.Floating>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Floating className="mb-5">
                        <Form.Control
                            id={`${id}-pass`}
                            type="password"
                            minLength={1}
                            ref={passRef}
                        />
                        <label
                            htmlFor={`${id}-pass`}
                            style={{ paddingTop: "10px" }}>
                            Password
                        </label>
                    </Form.Floating>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Container>
                        {checkedHospitals?.map((e, i) => (
                            <Chip
                                key={i}
                                label={e}
                                onDelete={handleDelete}
                                deleteIcon={<DeleteIcon />}
                                variant="outlined"
                            />
                        ))}
                    </Container>
                    <Form.Select
                        size="sm"
                        label="Choose a hospital"
                        required
                        defaultValue="Choose a hospital"
                        onChange={handleCheck}
                        id="select"
                        className="mb-4">
                        <option value="">Select the hospitals</option>
                        {uncheckedHospitals.map(({ name }, i) => (
                            <option key={i} value={name}>
                                {name}
                            </option>
                        ))}
                    </Form.Select>
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </div>
    );
}

export default RegisterFormComponent;
