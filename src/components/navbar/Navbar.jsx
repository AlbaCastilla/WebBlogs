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


 import { useState } from 'react';
 import { Link } from 'react-router-dom';
 import './Navbar.css';

 const Navbar = () => {
   const [isMenuOpen, setIsMenuOpen] = useState(false);

   const toggleMenu = () => {
     setIsMenuOpen(!isMenuOpen);
   };

   return (
     <nav>
       <div className="logo">
         <img src="/assets/Logo64x64.png" alt="logo" />
         <h1>Blog de blogs</h1>
       </div>
       <ul className={isMenuOpen ? 'active' : ''}>
         <li><Link to="/">Home</Link></li>
         <li><Link to="/crear-blogs">Blogs</Link></li>
         <li><Link to="/viajes">Viajes</Link></li>
         <li><Link to="/comida">Comida</Link></li>
         <li><Link to="/day-in-my-life">Day in my life</Link></li>
         <li><Link to="/otros">Otros</Link></li>
         <li><Link to="/login">Login</Link></li>
       </ul>
       <div className={`hamburger ${isMenuOpen ? 'hamburger-active' : ''}`} onClick={toggleMenu}>
         <span className="line"></span>
         <span className="line"></span>
         <span className="line"></span>
       </div>
       <div className={`menubar ${isMenuOpen ? 'active' : ''}`}>
         <ul>
           <li><Link to="/">Home</Link></li>
           <li><Link to="/crear-blogs">Blogs</Link></li>
           <li><Link to="/viajes">Viajes</Link></li>
           <li><Link to="/comida">Comida</Link></li>
           <li><Link to="/day-in-my-life">Day in my life</Link></li>
           <li><Link to="/otros">Otros</Link></li>
           <li><Link to="/registro">Registro</Link></li>
           <li><Link to="/login">Login</Link></li>
         </ul>
       </div>
     </nav>
   );
 };

 export default Navbar;




