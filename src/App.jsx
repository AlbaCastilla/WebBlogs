
// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Viajes from './pages/Viajes.jsx';
import Comida from './pages/Comida';
import DayInMyLife from './pages/DayInMyLife';
import Otros from './pages/Otros.jsx';

function App() {
  return (
    <Router>
      <Navbar /> {/* Aquí se usa el Navbar */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/viajes" element={<Viajes />} />
        <Route path="/comida" element={<Comida />} />
        <Route path="/day-in-my-life" element={<DayInMyLife />} />
        <Route path="/otros" element={<Otros />} />
      </Routes>
    </Router>
  );
}

export default App;
