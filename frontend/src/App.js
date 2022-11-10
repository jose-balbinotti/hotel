import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { FazerReserva, Home, Navbar, Quarto, Reserva } from './components';

function App() {
  return (
    <Router>
      <Navbar />

      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/quartos" element={<Quarto />} />
        <Route exact path="/reservas" element={<Reserva />} />
        <Route exact path="/fazer-reserva" element={<FazerReserva />} />
      </Routes>
      
    </Router>
  );
}

export default App;
