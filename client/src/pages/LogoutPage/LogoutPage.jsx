import { get } from "axios";
import { useNavigate } from "react-router-dom";

export default function LogoutPage() {
    const navigate = useNavigate();

    const logout = async () => {
        await get("http://localhost:8008/api/logout", {
            withCredentials: true,
        });
        navigate("/");
    };
    logout();

    return (
        <div>
            <h1 id="Logout">Logging out...</h1>
        </div>
    );
}
