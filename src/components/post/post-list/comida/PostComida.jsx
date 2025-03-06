import React, { useEffect, useState } from "react";
import { db } from "../../../../firebase";
import { collection, getDocs } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import "./PostComida.css";
import BotonLike from "../../boton-like/BotonLike";

function PostComida() {
    const [posts, setPosts] = useState([]);
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
                    .filter((post) => post.seccion === "comida"); // Filtrar por sección "viajes"

                setPosts(postsArray);
            } catch (error) {
                console.error("Error obteniendo posts:", error);
            }
        };

        obtenerPosts();
    }, []);

    const handlePostClick = (id) => {
        navigate(`/post/${id}`); 
    };


    return (
        <div className="post-comida-container">
            {posts.length === 0 ? (
                <p>No hay posts de comida aún</p>
            ) : (
                posts.map((post) => (
                    <div key={post.id} className="postComida-list" onClick={() => handlePostClick(post.id)}>
                        <h3>{post.titulo}</h3>
                        <h4>{post.subtitulo}</h4>
                        <p>{post.texto}</p>
                        <small>{new Date(post.fechaCreacion?.seconds * 1000).toLocaleString()}</small>
                        <BotonLike />
                    </div>
                ))
            )}
        </div>
    );
}

export default PostComida