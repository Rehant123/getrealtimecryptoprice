import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './Components/Header';
import Home from './Pages/Home';
import CoinPage from './Pages/CoinPage';
import "./App.css"
import CryptoContext   from './CryptoContext';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const App = () => {
  const containerStyle = {
    backgroundColor: '#000000',
    minHeight: '100vh',
    color:"white"
  };

  return (
    <div style={containerStyle}>
      <BrowserRouter>
      <CryptoContext>
        <Header />
        <Routes>
          {/* Use 'element' instead of 'component' */}
          <Route path="/" element={<Home />} />
          <Route path="/coins/:id" element={<CoinPage />} />
        </Routes>
        <ToastContainer position="bottom-center" />
        </CryptoContext>
      </BrowserRouter>
    </div>
  );
};

export default App;
