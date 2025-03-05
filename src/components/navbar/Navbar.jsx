// import { useState } from 'react';
// import { Link } from 'react-router-dom';
// import './Navbar.css'; 

// const Navbar = () => {
//   {/* Estado para controlar si el menú está abierto o cerrado */}
//   const [isMenuOpen, setIsMenuOpen] = useState(false);

//   {/* Función para alternar el estado del menú */}
//   const toggleMenu = () => {
//     setIsMenuOpen(!isMenuOpen);
//   };

//   return (
//     <nav className="navbar">
//       <h1 className="logo">Blog de blogs</h1>
//       {/* menu-icon = Icono de menú hamburguesa en pantallas pequeñas */}
//       <div className="menu-icon" onClick={toggleMenu}>
//         <div className="bar"></div>
//         <div className="bar"></div>
//         <div className="bar"></div>
//       </div>

//       {/* Menú de navegación */}
//       <div className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
//         <ul>
//           {/* <Link> actúa como un <a> */}
//           <li><Link to="/">Home</Link></li>
//           <li><Link to="/crear-blogs">Blogs</Link></li>
//           <li><Link to="/viajes">Viajes</Link></li>
//           <li><Link to="/comida">Comida</Link></li>
//           <li><Link to="/day-in-my-life">Day in my life</Link></li>
//           <li><Link to="/otros">Otros</Link></li>
//           <li><Link to="/registro">Registro</Link></li> 
//           <li><Link to="/login">Login</Link></li> 
//         </ul>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;


import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext'; 
import './Navbar.css';

const Navbar = () => {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login'); // Redirigir al login después de cerrar sesión
  };

  return (
    <nav>
      <div className="logo">
        <img src="/assets/Logo64x64.png" alt="logo" />
        <h1>Blog de blogs</h1>
      </div>
      <ul>
        <li><Link to="/">Home</Link></li>

        {/* Mostrar "Blogs" solo si el usuario está autenticado */}
        {isAuthenticated && <li><Link to="/crear-blogs">Blogs</Link></li>}

        <li><Link to="/viajes">Viajes</Link></li>
        <li><Link to="/comida">Comida</Link></li>
        <li><Link to="/day-in-my-life">Day in my life</Link></li>
        <li><Link to="/otros">Otros</Link></li>

        {isAuthenticated ? (
          <li onClick={handleLogout} style={{ cursor: 'pointer' }}>Logout</li>
        ) : (
          <li><Link to="/login">Login</Link></li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
