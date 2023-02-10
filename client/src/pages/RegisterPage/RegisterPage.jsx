import { useLayoutEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { get } from "axios";

import NavbarComponent from "../../components/NavbarComponent/NavbarComponent";
import RegisterFormComponent from "../../components/RegisterFormComponent/RegisterFormComponent";

const RegisterPage = () => {
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
        console.log(name);
    }, []);

    return !name ? (
        <>
            <NavbarComponent />
            <RegisterFormComponent />
        </>
    ) : (
        navigate("/main")
    );
};

export default RegisterPage;
