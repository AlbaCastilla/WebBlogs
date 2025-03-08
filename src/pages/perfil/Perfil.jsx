import React, { useEffect, useState } from "react";
import { db } from "../../firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useAuth } from '../../context/AuthContext'; // Importar el hook de autenticación
import { useNavigate } from 'react-router-dom';
import "./Perfil.css";

function Perfil() {
  const { user, logout } = useAuth(); // Obtener la información del usuario y la función logout
  const [favoritos, setFavoritos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      console.log("User ID:", user.uid); // Imprimir el userId en consola
    }

    const obtenerFavoritos = async () => {
      if (!user) return; // Si no hay usuario autenticado, no hacer nada

      try {
        // Obtener todos los favoritos del usuario autenticado
        const favoritosQuery = query(
          collection(db, "favoritos"),
          where("userId", "==", user.uid)
        );
        const favoritosSnapshot = await getDocs(favoritosQuery);

        const favoritosArray = await Promise.all(
          favoritosSnapshot.docs.map(async (doc) => {
            const postId = doc.data().postId;

            // Ahora que tenemos el postId, obtenemos el post correspondiente directamente
            const postDoc = await getDocs(
              query(collection(db, "posts"), where("__name__", "==", postId))
            );
            return postDoc.docs.map((post) => ({
              id: post.id, // Este es el id del documento de 'posts'
              ...post.data(),
            }));
          })
        );

        // Aplanamos el array de favoritos (porque usamos Promise.all)
        setFavoritos(favoritosArray.flat());
      } catch (error) {
        console.error("Error al obtener los favoritos:", error);
      }
    };

    obtenerFavoritos();
  }, [user]);

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

      {/* Mostrar los favoritos del usuario en formato de tarjetas */}
      <div className="favoritos-container">
        <h3>Mis Favoritos</h3>
        {favoritos.length === 0 ? (
          <p>No tienes posts favoritos</p>
        ) : (
          <div className="favoritos-grid">
            {favoritos.map((post) => (
              <div key={post.id} className="favorito-post tarjeta">
                <h4>{post.titulo}</h4>
                <p>{post.subtitulo}</p>
                <small>
                  {new Date(post.fechaCreacion?.seconds * 1000).toLocaleString()}
                </small>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Botón de Logout */}
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default Perfil;
