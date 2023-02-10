import { useState, useRef, useId } from "react";
import { get, post } from "axios";
import { useNavigate } from "react-router-dom";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import "./LoginFormComponent.css";

function LoginFormComponent() {
    const userInput = useRef();
    const passInput = useRef();
    const navigate = useNavigate();
    const [validated, setValid] = useState(false);

    const id = useId();

    const getCookie = async () => {
        try {
            const { data } = await get("http://localhost:8008/api/login", {
                withCredentials: true,
            });
            console.log(data);
        } catch (error) {
            console.log(error);
        }
    };

    const storeCookie = async () => {
        try {
            const { data } = await post(
                "http://localhost:8008/api/login",
                {
                    username: userInput.current.value,
                    password: passInput.current.value,
                },
                { withCredentials: true }
            );
            console.log(data);
        } catch (error) {
            console.log(error);
        }
    };

    const handleSubmit = async (e) => {
        const form = e.currentTarget;
        e.preventDefault();

        if (form.checkValidity() === false) {
            e.preventDefault();
            e.stopPropagation();
            setValid(true);
            return;
        } else {
            setValid(true);
            await storeCookie();
            await getCookie();
            navigate("/main");
        }
    };

    return (
        <div
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
            }}>
            <Form
                noValidate
                id="box"
                validated={validated}
                onSubmit={handleSubmit}
                style={{ textAlign: "center", padding: "2rem 1rem 1rem 1rem" }}>
                <h1 className="mb-5 card-title">Login</h1>
                <Form.Group className="mb-3">
                    <Form.Floating className="mb-5">
                        <Form.Control
                            ref={userInput}
                            id={`${id}-user`}
                            type="username"
                            required
                        />
                        <label
                            id="float"
                            htmlFor={`${id}-user`}
                            style={{ paddingTop: "10px" }}>
                            Username
                        </label>
                    </Form.Floating>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Floating className="mb-5">
                        <Form.Control
                            ref={passInput}
                            id={`${id}-pass`}
                            type="password"
                            required
                        />
                        <label
                            id="float"
                            htmlFor={`${id}-pass`}
                            style={{ paddingTop: "10px" }}>
                            Password
                        </label>
                    </Form.Floating>
                </Form.Group>

                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </div>
    );
}

export default LoginFormComponent;
