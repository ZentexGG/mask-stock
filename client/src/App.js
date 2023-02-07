import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from './pages/HomePage/HomePage'
import RegisterPage from './pages/RegisterPage/RegisterPage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="*" element={<div>Not Found</div>} />
        <Route path="/" element={<HomePage/>}/>
        <Route path="/register" element={<RegisterPage/>}/>
      </Routes>
    </Router>
  );
};

export default App;
