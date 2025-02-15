import { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; 

const Navbar = () => {
  {/*Estado para controlar si el menú está abierto o cerrado*/}
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  {/* Función para alternar el estado del menú*/}
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="navbar">
      <h1 className="logo">Blog de blogs</h1>
      {/* menu-icon = Icono de menú hamburguesa n pantallas pequeñas */}
      <div className="menu-icon" onClick={toggleMenu}>
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
      </div>

      {/* Menu de nav */}
      <div className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
        <ul>
          {/*<Link> <Link/> actua como un <a><a/>*/}
          <li><Link to="/">Home</Link></li>
          <li><Link to="/viajes">Viajes</Link></li>
          <li><Link to="/comida">Comida</Link></li>
          <li><Link to="/day-in-my-life">Day in my life</Link></li>
          <li><Link to="/otros">Otros</Link></li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
