import { useState, useLayoutEffect } from "react";
import { useNavigate } from "react-router-dom";
import { get } from "axios";

import NavbarComponent from "../../components/NavbarComponent/NavbarComponent";
import CardComponent from "../../components/CardComponent/CardComponent";
import OrderFormComponent from "../../components/OrderFormComponent/OrderFormComponent";

export default function MainPage() {
    const [name, setName] = useState("");
    const [cardVisible, setCardVisible] = useState(true);
    const [orderForm, setOrderForm] = useState(false);
    const [quantity, setQuantity] = useState(0);

    const handleClick = (e, maskQuantity) => {
        setQuantity(maskQuantity);
        if (quantity <= 0) {
            return;
        }
        setCardVisible(false);
        setOrderForm(true);
    };
    const navigate = useNavigate("");

    const getCookie = async () => {
        try {
            const { data } = await get("http://localhost:8008/api/login", {
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

    return name ? (
        <>
            <NavbarComponent name={name} />
            {cardVisible && <CardComponent order={handleClick} />}
            {orderForm && (
                <OrderFormComponent quantity={quantity} name={name} />
            )}
        </>
    ) : (
        navigate("/")
    );
}
