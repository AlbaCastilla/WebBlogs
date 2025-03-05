
//
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/navbar/Navbar.jsx';
import Home from './pages/home/Home.jsx';
import Blogs from './pages/blog/Blogs.jsx';
import Viajes from './pages/viajes/Viajes.jsx';
import Comida from './pages/comida/Comida.jsx';
import Registro from './pages/registro/Registro.jsx';
import Login from './pages/login/Login.jsx';
import DayInMyLife from './pages/dayinmylife/DayInMyLife.jsx';
import Otros from './pages/otros/Otros.jsx';
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
          <Route path="/registro" element={<Registro />} />
          <Route path="/login" element={<Login />} />
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