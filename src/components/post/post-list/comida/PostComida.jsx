// import React, { useEffect, useState } from "react";
// import { db } from "../../../../firebase";
// import { collection, getDocs } from "firebase/firestore";
// import { useNavigate } from "react-router-dom";
// import "./PostComida.css";
// import BotonLike from "../../boton-like/BotonLike";


// function PostComida() {
//     const [posts, setPosts] = useState([]);
//     const navigate = useNavigate(); 

//     useEffect(() => {
//         const obtenerPosts = async () => {
//             try {
//                 const querySnapshot = await getDocs(collection(db, "posts"));
//                 const postsArray = querySnapshot.docs
//                     .map((doc) => ({
//                         id: doc.id,
//                         ...doc.data(),
//                     }))
//                     .filter((post) => post.seccion === "comida"); // Filtrar por sección "viajes"

//                 setPosts(postsArray);
//             } catch (error) {
//                 console.error("Error obteniendo posts:", error);
//             }
//         };

//         obtenerPosts();
//     }, []);

//     const handlePostClick = (id) => {
//         navigate(`/post/${id}`); 
//     };


//     return (
//         <div className="post-comida-container">
//             {posts.length === 0 ? (
//                 <p>No hay posts de comida aún</p>
//             ) : (
//                 posts.map((post) => (
//                     <div key={post.id} className="postComida-list" >
//                         <h3>{post.titulo}</h3>
//                         <h4>{post.subtitulo}</h4>
//                         <a onClick={() => handlePostClick(post.id)}>Ver más</a><br />
//                         <small>{new Date(post.fechaCreacion?.seconds * 1000).toLocaleString()}</small>
//                         <BotonLike />
//                     </div>
//                 ))
//             )}
//         </div>
//     );
// }

// export default PostComida
// import React, { useEffect, useState } from "react";
// import { db } from "../../../../firebase";
// import { auth } from '../../../../environments/environments.firebase';
// import { collection, getDocs, addDoc } from "firebase/firestore";
// import { useNavigate } from "react-router-dom";
// import { onAuthStateChanged } from "firebase/auth"; // Para obtener el usuario autenticado
// import "./PostComida.css";
// import BotonLike from "../../boton-like/BotonLike";

// function PostComida() {
//   const [posts, setPosts] = useState([]);
//   const [user, setUser] = useState(null); // Para almacenar el usuario autenticado
//   const [loading, setLoading] = useState(true); // Para manejar el estado de carga
//   const navigate = useNavigate();

//   // Obtener los posts desde Firestore
//   useEffect(() => {
//     const obtenerPosts = async () => {
//       try {
//         const querySnapshot = await getDocs(collection(db, "posts"));
//         const postsArray = querySnapshot.docs
//           .map((doc) => ({
//             id: doc.id,
//             ...doc.data(),
//           }))
//           .filter((post) => post.seccion === "comida"); // Filtrar por sección "comida"

//         console.log("Posts cargados:", postsArray); 
//         setPosts(postsArray);
//       } catch (error) {
//         console.error("Error obteniendo posts:", error);
//       }
//       setLoading(false); // Después de cargar los posts, dejar de cargar
//     };

//     obtenerPosts();
//   }, []);

//   // Obtener el usuario autenticado
//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
//       console.log("Usuario autenticado:", currentUser);
//       setUser(currentUser); // Guarda el usuario en el estado
//     });

//     return () => unsubscribe(); // Limpieza del estado cuando el componente se desmonta
//   }, []);

//   // Manejar clic en el post
//   const handlePostClick = (id) => {
//     navigate(`/post/${id}`);
//   };

//   // Manejar el "like" y guardar el post en la colección "favoritos"
//   const handleLikeClick = async (postId) => {
//     if (!user) {
//       alert("Debes estar logueado para guardar en favoritos.");
//       navigate('/login'); // Redirigir a la página de login si no hay usuario
//       return;
//     }

//     console.log("Guardando en favoritos:", postId, user.uid);
//     try {
//       // Agregar a la colección favoritos
//       await addDoc(collection(db, "favoritos"), {
//         userId: user.uid, // ID del usuario autenticado
//         postId: postId, // ID del post al que le dio like
//       });
//       alert("Post agregado a favoritos.");
//     } catch (error) {
//       console.error("Error al agregar a favoritos:", error);
//     }
//   };

//   if (loading) {
//     return <p>Cargando...</p>;
//   }

//   return (
//     <div className="post-comida-container">
//       {user === null ? (
//         <div>
//           <p>Necesitas estar logueado para interactuar con los posts.</p>
//           <button onClick={() => navigate('/login')}>Iniciar sesión</button>
//           <button onClick={() => navigate('/registro')}>Registrarse</button>
//         </div>
//       ) : (
//         <>
//           {posts.length === 0 ? (
//             <p>No hay posts de comida aún</p>
//           ) : (
//             posts.map((post) => (
//               <div key={post.id} className="postComida-list">
//                 <h3>{post.titulo}</h3>
//                 <h4>{post.subtitulo}</h4>
//                 <a onClick={() => handlePostClick(post.id)}>Ver más</a><br />
//                 <small>{new Date(post.fechaCreacion?.seconds * 1000).toLocaleString()}</small>
//                 <BotonLike postId={post.id} onLikeClick={handleLikeClick} /> {/* Pasa el postId y la función */}
//               </div>
//             ))
//           )}
//         </>
//       )}
//     </div>
//   );
// }

// export default PostComida;
// import React, { useEffect, useState } from "react";
// import { db } from "../../../../firebase";
// import { collection, getDocs, addDoc } from "firebase/firestore";
// import { useNavigate } from "react-router-dom";
// import "./PostComida.css";
// import BotonLike from "../../boton-like/BotonLike";
// import { useAuth } from '../../../../context/AuthContext'; // Importa el hook useAuth

// function PostComida() {
//   const [posts, setPosts] = useState([]);
//   const { user, loading: authLoading } = useAuth(); // Usar el user desde el contexto de autenticación
//   const [loading, setLoading] = useState(true); // Para manejar el estado de carga de los posts
//   const navigate = useNavigate();

//   // Verificar si el usuario está logueado
//   useEffect(() => {
//     if (authLoading) {
//       return; // Espera hasta que el estado de autenticación esté listo
//     }

//     if (user) {
//       console.log("Usuario logueado:", user.uid); // Imprime el ID del usuario logueado
//     } else {
//       console.log("No hay usuario logueado.");
//     }
//   }, [user, authLoading]);

//   // Obtener los posts desde Firestore
//   useEffect(() => {
//     const obtenerPosts = async () => {
//       try {
//         const querySnapshot = await getDocs(collection(db, "posts"));
//         const postsArray = querySnapshot.docs
//           .map((doc) => ({
//             id: doc.id,
//             ...doc.data(),
//           }))
//           .filter((post) => post.seccion === "comida"); // Filtrar por sección "comida"

//         console.log("Posts cargados:", postsArray);
//         setPosts(postsArray);
//       } catch (error) {
//         console.error("Error obteniendo posts:", error);
//       }
//       setLoading(false); // Después de cargar los posts, dejar de cargar
//     };

//     obtenerPosts();
//   }, []);

//   // Manejar clic en el post
//   const handlePostClick = (id) => {
//     navigate(`/post/${id}`);
//   };

//   // Manejar el "like" y guardar el post en la colección "favoritos"
//   const handleLikeClick = async (postId) => {
//     if (!user) {
//       alert("Debes estar logueado para guardar en favoritos.");
//       navigate("/login"); // Redirigir a la página de login si no hay usuario
//       return;
//     }

//     // Si el usuario está autenticado, guarda el post en favoritos
//     console.log("Guardando en favoritos:", postId, user.uid);
//     try {
//       await addDoc(collection(db, "favoritos"), {
//         userId: user.uid, // ID del usuario
//         postId: postId, // ID del post
//       });
//       alert("Post agregado a favoritos.");
//     } catch (error) {
//       console.error("Error al agregar a favoritos:", error);
//     }
//   };

//   if (loading || authLoading) {
//     return <p>Cargando...</p>; // Mostrar cargando mientras se esperan los datos
//   }

//   return (
//     <div className="post-comida-container">
//       {posts.length === 0 ? (
//         <p>No hay posts de comida aún</p>
//       ) : (
//         posts.map((post) => (
//           <div key={post.id} className="postComida-list">
//             <h3>{post.titulo}</h3>
//             <h4>{post.subtitulo}</h4>
//             <a onClick={() => handlePostClick(post.id)}>Ver más</a><br />
//             <small>{new Date(post.fechaCreacion?.seconds * 1000).toLocaleString()}</small>
//             <div>
//               {/* El botón de like se renderiza siempre, pero solo se ejecuta si el usuario está autenticado */}
//               <BotonLike postId={post.id} onLikeClick={handleLikeClick} />
//             </div>
//           </div>
//         ))
//       )}
//     </div>
//   );
// }

// export default PostComida;


// import React, { useEffect, useState } from "react";
// import { db } from "../../../../firebase";
// import { collection, getDocs, addDoc } from "firebase/firestore";
// import { useNavigate } from "react-router-dom";
// import { useAuth } from '../../../../context/AuthContext'; // Importa el hook useAuth
// import "./PostComida.css";
// import BotonLike from "../../boton-like/BotonLike";

// function PostComida() {
//   const [posts, setPosts] = useState([]);
//   const { user, loading: authLoading } = useAuth(); // Usar el user desde el contexto de autenticación
//   const [loading, setLoading] = useState(true); // Para manejar el estado de carga de los posts
//   const navigate = useNavigate();

//   // Obtener los posts desde Firestore
//   useEffect(() => {
//     const obtenerPosts = async () => {
//       try {
//         const querySnapshot = await getDocs(collection(db, "posts"));
//         const postsArray = querySnapshot.docs
//           .map((doc) => ({
//             id: doc.id,
//             ...doc.data(),
//           }))
//           .filter((post) => post.seccion === "comida"); // Filtrar por sección "comida"

//         console.log("Posts cargados:", postsArray);
//         setPosts(postsArray);
//       } catch (error) {
//         console.error("Error obteniendo posts:", error);
//       }
//       setLoading(false); // Después de cargar los posts, dejar de cargar
//     };

//     obtenerPosts();
//   }, []);

//   // Manejar clic en el post
//   const handlePostClick = (id) => {
//     navigate(`/post/${id}`);
//   };

//   // Manejar el "like" y guardar el post en la colección "favoritos"
//   const handleLikeClick = async (postId) => {
//     if (!user) {
//       alert("Debes estar logueado para guardar en favoritos.");
//       navigate("/login"); // Redirigir a la página de login si no hay usuario
//       return;
//     }

//     // Si el usuario está autenticado, guarda el post en favoritos
//     console.log("Guardando en favoritos:", postId, user.uid);
//     try {
//       await addDoc(collection(db, "favoritos"), {
//         userId: user.uid, // ID del usuario
//         postId: postId, // ID del post
//       });
//       alert("Post agregado a favoritos.");

//       // Actualizar los posts después de guardar el like
//       // Si quieres recargar solo los posts, puedes llamarlo de nuevo aquí
//       const querySnapshot = await getDocs(collection(db, "posts"));
//       const postsArray = querySnapshot.docs
//         .map((doc) => ({
//           id: doc.id,
//           ...doc.data(),
//         }))
//         .filter((post) => post.seccion === "comida");

//       setPosts(postsArray); // Actualiza los posts con los nuevos datos
//     } catch (error) {
//       console.error("Error al agregar a favoritos:", error);
//     }
//   };

//   if (loading || authLoading) {
//     return <p>Cargando...</p>; // Mostrar cargando mientras se esperan los datos
//   }

//   return (
//     <div className="post-comida-container">
//       {posts.length === 0 ? (
//         <p>No hay posts de comida aún</p>
//       ) : (
//         posts.map((post) => (
//           <div key={post.id} className="postComida-list">
//             <h3>{post.titulo}</h3>
//             <h4>{post.subtitulo}</h4>
//             <a onClick={() => handlePostClick(post.id)}>Ver más</a><br />
//             <small>{new Date(post.fechaCreacion?.seconds * 1000).toLocaleString()}</small>
//             <div>
//               {/* El botón de like se renderiza siempre, pero solo se ejecuta si el usuario está autenticado */}
//               <BotonLike postId={post.id} onLikeClick={handleLikeClick} />
//             </div>
//           </div>
//         ))
//       )}
//     </div>
//   );
// }

// export default PostComida;
import React, { useEffect, useState } from "react";
import { db } from "../../../../firebase";
import { collection, getDocs, addDoc, query, where, deleteDoc, doc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { useAuth } from '../../../../context/AuthContext'; // Importa el hook useAuth
import "./PostComida.css";
import BotonLike from "../../boton-like/BotonLike";

function PostComida() {
  const [posts, setPosts] = useState([]);
  const { user, loading: authLoading } = useAuth(); // Usar el user desde el contexto de autenticación
  const [loading, setLoading] = useState(true); // Para manejar el estado de carga de los posts
  const navigate = useNavigate();

  // Obtener los posts desde Firestore
  useEffect(() => {
    const obtenerPosts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "posts"));
        const postsArray = querySnapshot.docs
          .map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }))
          .filter((post) => post.seccion === "comida"); // Filtrar por sección "comida"

        console.log("Posts cargados:", postsArray);
        setPosts(postsArray);
      } catch (error) {
        console.error("Error obteniendo posts:", error);
      }
      setLoading(false); // Después de cargar los posts, dejar de cargar
    };

    obtenerPosts();
  }, []);

  // Verificar si el post está en favoritos
  const isPostFavorito = async (postId) => {
    if (!user) return false; // Si no hay usuario, no puede tener favoritos

    const favoritosQuery = query(
      collection(db, "favoritos"),
      where("userId", "==", user.uid),
      where("postId", "==", postId)
    );

    const querySnapshot = await getDocs(favoritosQuery);
    return !querySnapshot.empty; // Si la consulta no está vacía, significa que el post está en favoritos
  };

  // Manejar el "like" y agregar o eliminar de favoritos
  const handleLikeClick = async (postId) => {
    if (!user) {
      alert("Debes estar logueado para guardar en favoritos.");
      navigate("/login"); // Redirigir a la página de login si no hay usuario
      return;
    }

    try {
      const postFavorito = await isPostFavorito(postId); // Verificar si el post ya está en favoritos

      if (postFavorito) {
        // Si el post ya está en favoritos, eliminarlo
        const favoritosQuery = query(
          collection(db, "favoritos"),
          where("userId", "==", user.uid),
          where("postId", "==", postId)
        );
        const querySnapshot = await getDocs(favoritosQuery);
        const docToDelete = querySnapshot.docs[0];

        await deleteDoc(doc(db, "favoritos", docToDelete.id));
        alert("Post eliminado de favoritos.");
      } else {
        // Si el post no está en favoritos, agregarlo
        await addDoc(collection(db, "favoritos"), {
          userId: user.uid, // ID del usuario
          postId: postId, // ID del post
        });
        alert("Post agregado a favoritos.");
      }

      // Recargar los posts para actualizar la interfaz
      const querySnapshot = await getDocs(collection(db, "posts"));
      const postsArray = querySnapshot.docs
        .map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
        .filter((post) => post.seccion === "comida");

      setPosts(postsArray); // Actualiza los posts con los nuevos datos
    } catch (error) {
      console.error("Error al manejar el like:", error);
    }
  };

  if (loading || authLoading) {
    return <p>Cargando...</p>; // Mostrar cargando mientras se esperan los datos
  }

  return (
    <div className="post-comida-container">
      {posts.length === 0 ? (
        <p>No hay posts de comida aún</p>
      ) : (
        posts.map((post) => (
          <div key={post.id} className="postComida-list">
            <h3>{post.titulo}</h3>
            <h4>{post.subtitulo}</h4>
            <a onClick={() => handlePostClick(post.id)}>Ver más</a><br />
            <small>{new Date(post.fechaCreacion?.seconds * 1000).toLocaleString()}</small>
            <div className="divBtnLike">
              {/* El botón de like se renderiza siempre, pero solo se ejecuta si el usuario está autenticado */}
              <BotonLike postId={post.id} onLikeClick={handleLikeClick} />
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default PostComida;
