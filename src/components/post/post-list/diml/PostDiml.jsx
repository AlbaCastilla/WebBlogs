import React, { useEffect, useState } from "react";
import { db } from "../../../../firebase";
import { collection, getDocs } from "firebase/firestore";
import "./PostDiml.css";
import BotonLike from "../../boton-like/BotonLike";

function Diml() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const obtenerPosts = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, "posts"));
                const postsArray = querySnapshot.docs
                    .map((doc) => ({
                        id: doc.id,
                        ...doc.data(),
                    }))
                    .filter((post) => post.seccion === "diml"); 

                setPosts(postsArray);
            } catch (error) {
                console.error("Error obteniendo posts:", error);
            }
        };

        obtenerPosts();
    }, []);

    return (
        <div className="post-viajes-container">
            <h2>Posts de Day in my life</h2>
            {posts.length === 0 ? (
                <p>No hay posts de viajes aún</p>
            ) : (
                posts.map((post) => (
                    <div key={post.id} className="post-list">
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

export default Diml