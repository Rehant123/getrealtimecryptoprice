import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './Components/Header';
import Home from './Pages/Home';
import CoinPage from './Pages/CoinPage';
import "./App.css"
import CryptoContext   from './CryptoContext';
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
          <Route path="/home" element={<Home />} />
          <Route path="/coins/:id" element={<CoinPage />} />
        </Routes>
        </CryptoContext>
      </BrowserRouter>
    </div>
  );
};

export default App;
