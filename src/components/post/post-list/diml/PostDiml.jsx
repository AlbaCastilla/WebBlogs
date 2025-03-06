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
        <div className="post-diml-container">
            {posts.length === 0 ? (
                <p>No hay posts de day in my life aún</p>
            ) : (
                posts.map((post) => (
                    <div key={post.id} className="postDiml-list">
                        <h3>{post.titulo}</h3>
                        <h4>{post.subtitulo}</h4>
                        <a onClick={() => handlePostClick(post.id)}>Ver más</a><br />
                        <small>{new Date(post.fechaCreacion?.seconds * 1000).toLocaleString()}</small>
                        <BotonLike />
                    </div>
                ))
            )}
        </div>
    );
}

export default Diml