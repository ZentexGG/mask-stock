import { Route, Routes, Router } from "react-router-dom";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import MainPage from "./pages/MainPage/MainPage";
import Order from "./pages/Order/Order";
function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/MainPage" element={<MainPage />} />
      <Route path="/Order" element={<Order />} />
    </Routes>
  )
}

export default App;
