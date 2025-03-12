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
import { useAuth } from '../../../../context/AuthContext';
import "./PostViajes.css";
import BotonLike from "../../boton-like/BotonLike";

function PostViajes() {
    const [posts, setPosts] = useState([]);
    const { user, loading: authLoading } = useAuth();
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate(); 

    useEffect(() => {
        const obtenerPosts = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, "posts"));
                const postsArray = querySnapshot.docs
                    .map((doc) => ({
                        id: doc.id,
                        ...doc.data(),
                    }))
                    .filter((post) => post.seccion === "viajes");
                console.log("Posts cargados:", postsArray);
                setPosts(postsArray);
            } catch (error) {
                console.error("Error obteniendo posts:", error);
            }
            setLoading(false); 
        };

        obtenerPosts();
    }, []);

    const isPostFavorito = async (postId) => {
        if (!user) return false; 

        const favoritosQuery = query(
            collection(db, "favoritos"),
            where("userId", "==", user.uid),
            where("postId", "==", postId)
        );

        const querySnapshot = await getDocs(favoritosQuery);
        return !querySnapshot.empty;
    };

    const handleLikeClick = async (postId) => {
        if (!user) {
            alert("Debes estar logueado para guardar en favoritos.");
            navigate("/login"); 
            return;
        }

        try {
            const postFavorito = await isPostFavorito(postId); 

            if (postFavorito) {
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
                await addDoc(collection(db, "favoritos"), {
                    userId: user.uid, 
                    postId: postId, 
                });
                alert("Post agregado a favoritos.");
            }

            const querySnapshot = await getDocs(collection(db, "posts"));
            const postsArray = querySnapshot.docs
                .map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }))
                .filter((post) => post.seccion === "viajes");

            setPosts(postsArray); 
        } catch (error) {
            console.error("Error al manejar el like:", error);
        }
    };

    const handlePostClick = (id) => {
        navigate(`/post/${id}`); 
    };

    if (loading || authLoading) {
        return <p>Cargando...</p>; 
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
                            <BotonLike postId={post.id} onLikeClick={handleLikeClick} />
                        </div>
                    </div>
                ))
            )}
        </div>
    );
}

export default PostViajes;
