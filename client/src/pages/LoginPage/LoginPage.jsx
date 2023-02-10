import { useState, useLayoutEffect } from "react";
import { get } from "axios";
import { useNavigate } from "react-router-dom";

import LoginFormComponent from "../../components/LoginFormComponent/LoginFormComponent";
import NavbarComponent from "../../components/NavbarComponent/NavbarComponent";

const LoginPage = () => {
    const [name, setName] = useState("");
    const navigate = useNavigate();

    const getCookie = async () => {
        try {
            const { data } = await get("http://localhost:8008/api/login", {
                withCredentials: true,
            });
            setName(data.message);
        } catch (error) {
            console.log(error);
        }
    };

    useLayoutEffect(() => {
        getCookie();
    }, []);

    return (
        (name && navigate("/main")) || (
            <>
                <NavbarComponent name={name} />
                <LoginFormComponent />
            </>
        )
    );
};

export default LoginPage;
