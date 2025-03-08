// import React, { useEffect, useState } from "react";
// import { db } from "../../firebase";
// import { collection, getDocs, query, where } from "firebase/firestore";
// import { useAuth } from '../../context/AuthContext'; 
// import { useNavigate } from 'react-router-dom';
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
// import "./Perfil.css";

// function Perfil() {
//   const { user, logout } = useAuth();
//   const [favoritos, setFavoritos] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (user) {
//       console.log("User ID:", user.uid);
//     }

//     const obtenerFavoritos = async () => {
//       if (!user) return;

//       try {
//         const favoritosQuery = query(
//           collection(db, "favoritos"),
//           where("userId", "==", user.uid)
//         );
//         const favoritosSnapshot = await getDocs(favoritosQuery);

//         const favoritosArray = await Promise.all(
//           favoritosSnapshot.docs.map(async (doc) => {
//             const postId = doc.data().postId;

//             const postDoc = await getDocs(
//               query(collection(db, "posts"), where("__name__", "==", postId))
//             );
//             return postDoc.docs.map((post) => ({
//               id: post.id,
//               ...post.data(),
//             }));
//           })
//         );

//         setFavoritos(favoritosArray.flat());
//       } catch (error) {
//         console.error("Error al obtener los favoritos:", error);
//       }
//     };

//     obtenerFavoritos();
//   }, [user]);

//   const handleLogout = () => {
//     logout();
//     navigate("/login");
//   };

//   return (
//     <div>
//       <div className="titulo-perfil">
//         <FontAwesomeIcon icon={faUserCircle} className="perfil-icono" />
//         <h4>Perfil</h4>
//       </div>
//       <div className="descripcion-perfil"></div>

//       <div className="favoritos-container">
//         <h4>Mis Favoritos</h4>
//         {favoritos.length === 0 ? (
//           <p>No tienes posts favoritos</p>
//         ) : (
//           <div className="favoritos-grid">
//             {favoritos.map((post) => (
//               <div key={post.id} className="favorito-post tarjeta">
//                 <h4>{post.titulo}</h4>
//                 <p>{post.subtitulo}</p>
//                 <small>
//                   {new Date(post.fechaCreacion?.seconds * 1000).toLocaleString()}
//                 </small>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>

//       <button onClick={handleLogout}>Logout</button>
//     </div>
//   );
// }

// export default Perfil;


import React, { useEffect, useState } from "react";
import { db } from "../../firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useAuth } from '../../context/AuthContext'; 
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import "./Perfil.css";

function Perfil() {
  const { user, logout } = useAuth();
  const [favoritos, setFavoritos] = useState([]);
  const [postsUsuario, setPostsUsuario] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      console.log("User ID:", user.uid);
    }

    // Obtener favoritos
    const obtenerFavoritos = async () => {
      if (!user) return;

      try {
        const favoritosQuery = query(
          collection(db, "favoritos"),
          where("userId", "==", user.uid)
        );
        const favoritosSnapshot = await getDocs(favoritosQuery);

        const favoritosArray = await Promise.all(
          favoritosSnapshot.docs.map(async (doc) => {
            const postId = doc.data().postId;

            const postDoc = await getDocs(
              query(collection(db, "posts"), where("__name__", "==", postId))
            );
            return postDoc.docs.map((post) => ({
              id: post.id,
              ...post.data(),
            }));
          })
        );

        setFavoritos(favoritosArray.flat());
      } catch (error) {
        console.error("Error al obtener los favoritos:", error);
      }
    };

    // Obtener posts publicados por el usuario
    const obtenerPostsUsuario = async () => {
      if (!user) return;

      try {
        const postsQuery = query(
          collection(db, "posts"),
          where("usuario", "==", user.uid)
        );
        const postsSnapshot = await getDocs(postsQuery);
        const postsArray = postsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setPostsUsuario(postsArray);
      } catch (error) {
        console.error("Error al obtener los posts del usuario:", error);
      }
    };

    obtenerFavoritos();
    obtenerPostsUsuario();
  }, [user]);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div>
      <div className="titulo-perfil">
        <FontAwesomeIcon icon={faUserCircle} className="perfil-icono" />
        <h4>Perfil</h4>
      </div>
      <div className="descripcion-perfil"></div>

      <div className="favoritos-container">
        <h4>Mis Favoritos</h4>
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

<div className="posts-publicados-div-grande">
      <h4>Mis Posts Publicados</h4>
      <div className="posts-publicados-container">
        
        {postsUsuario.length === 0 ? (
          <p>No has publicado ningún post</p>
        ) : (
          <div className="posts-publicados-grid">
            {postsUsuario.map((post) => (
              <div key={post.id} className="post-publicado tarjeta">
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
</div>

      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default Perfil;
