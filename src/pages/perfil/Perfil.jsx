import React from "react";
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';  // Importa el hook de autenticación
import "./Perfil.css";

function Perfil() {
  const { logout } = useAuth(); // Obtener la función de logout desde el contexto
  const navigate = useNavigate(); // Hook para redirigir al login

  const handleLogout = () => {
    logout(); // Llamar a la función de logout
    navigate("/login"); // Redirigir al login después de cerrar sesión
  };

  return (
    <div>
      <div className="titulo-perfil">
        <h2>Bienvenido a la Página de Otros Posts</h2>
      </div>
      <div className="descripcion-perfil">
        <p>
          Esta es la sección de posts de cualquier otra cosa que no sea comida,
          day in my life o viajes
        </p>
      </div>

      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default Perfil;
