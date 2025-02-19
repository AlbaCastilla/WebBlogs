
//
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/navbar/Navbar.jsx';
import Home from './pages/Home';
import Blogs from './pages/Blogs';
import Viajes from './pages/Viajes.jsx';
import Comida from './pages/Comida';
import DayInMyLife from './pages/DayInMyLife';
import Otros from './pages/Otros.jsx';
import Footer from './components/footer/Footer.jsx';


import './App.css';

function App() {
  return (
    <div>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/crear-blogs" element={<Blogs />} />
          <Route path="/viajes" element={<Viajes />} />
          <Route path="/comida" element={<Comida />} />
          <Route path="/day-in-my-life" element={<DayInMyLife />} />
          <Route path="/otros" element={<Otros />} />
        </Routes>
      </Router>
      <Footer /> 
      {/* he sacado el footer del router pq no se 
      como hacer que se ajuste al ancho de la pantalla 
      pero antes estaba dentrp */}
    </div>
  );
}

export default App;