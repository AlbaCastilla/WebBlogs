import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../../../firebase";
import { doc, getDoc } from "firebase/firestore";
import "./AgrandarPost.css";

function AgrandarPost() {
    const { id } = useParams(); // Obtiene el id de la URL
    const [post, setPost] = useState(null);

    useEffect(() => {
        const obtenerPost = async () => {
            try {
                const docRef = doc(db, "posts", id);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    setPost({ id: docSnap.id, ...docSnap.data() });
                } else {
                    console.log("No se encontró el post");
                }
            } catch (error) {
                console.error("Error obteniendo el post:", error);
            }
        };

        obtenerPost();
    }, [id]);

    if (!post) {
        return <p>Cargando post...</p>;
    }

    return (
        <div className="agrandar-post-container">
            <h2>{post.titulo}</h2>
            <h4>{post.subtitulo}</h4>
            <p>{post.texto}</p>
            <small>{new Date(post.fechaCreacion?.seconds * 1000).toLocaleString()}</small>
        </div>
    );
}

export default AgrandarPost;
