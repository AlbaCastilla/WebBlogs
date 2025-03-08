// import React, { useEffect, useState } from "react";
// import { db } from "../../../../firebase";
// import { collection, getDocs } from "firebase/firestore";
// import { useNavigate } from "react-router-dom";
// import "./PostViajes.css";
// import BotonLike from "../../boton-like/BotonLike";

// function PostViajes() {
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
//                     .filter((post) => post.seccion === "viajes"); // Filtrar por sección "viajes"

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
//         <div className="post-viajes-container">
//             {posts.length === 0 ? (
//                 <p>No hay posts de viajes aún</p>
//             ) : (
//                 posts.map((post) => (
//                     <div key={post.id} className="postViajes-list">
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

// export default PostViajes;
import React, { useEffect, useState } from "react";
import { db } from "../../../../firebase";
import { collection, getDocs, addDoc, query, where, deleteDoc, doc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { useAuth } from '../../../../context/AuthContext'; // Importa el hook useAuth
import "./PostViajes.css";
import BotonLike from "../../boton-like/BotonLike";

function PostViajes() {
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
                    .filter((post) => post.seccion === "viajes"); // Filtrar por sección "viajes"

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
                .filter((post) => post.seccion === "viajes");

            setPosts(postsArray); // Actualiza los posts con los nuevos datos
        } catch (error) {
            console.error("Error al manejar el like:", error);
        }
    };

    const handlePostClick = (id) => {
        navigate(`/post/${id}`); 
    };

    if (loading || authLoading) {
        return <p>Cargando...</p>; // Mostrar cargando mientras se esperan los datos
    }

    return (
        <div className="post-viajes-container">
            {posts.length === 0 ? (
                <p>No hay posts de viajes aún</p>
            ) : (
                posts.map((post) => (
                    <div key={post.id} className="postViajes-list">
                        <h3>{post.titulo}</h3>
                        <h4>{post.subtitulo}</h4>
                        <a onClick={() => handlePostClick(post.id)}>Ver más</a><br />
                        <small>{new Date(post.fechaCreacion?.seconds * 1000).toLocaleString()}</small>
                        <div>
                            {/* El botón de like se renderiza siempre, pero solo se ejecuta si el usuario está autenticado */}
                            <BotonLike postId={post.id} onLikeClick={handleLikeClick} />
                        </div>
                    </div>
                ))
            )}
        </div>
    );
}

export default PostViajes;
