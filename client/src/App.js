import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from './pages/HomePage/HomePage'
import LoginPage from './pages/LoginPage/LoginPage';
import RegisterPage from './pages/RegisterPage/RegisterPage';
import OrderPage from './pages/OrderPage/OrderPage';
import MainPage from './pages/MainPage/MainPage'

const App = () => {
  const [quantity,setQuantity]=useState(0)
  return (
    <Router>
      <Routes>
        <Route path="*" element={<div>Not Found</div>} />
        <Route path="/" element={<HomePage/>}/>
        <Route path="/register" element={<RegisterPage/>}/>
        <Route path="/login" element={<LoginPage/>}/>
        <Route path="/order" element={<OrderPage quantity={quantity}/>}/>
        <Route path="/main" element={<MainPage setQuantity={setQuantity}/>}/>
      </Routes>
    </Router>
  );
};

export default App;
