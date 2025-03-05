import React, { useEffect, useState } from "react";
import { db } from "../../../firebase";
import { collection, getDocs, query, orderBy, limit } from "firebase/firestore";
import "./PostList.css";
import BotonLike from "../boton-like/BotonLike";

/* lo iniciamos vacio, pq al principio no hay -- los cargamos con 
setPOST ---> useState para actualizar el "valor" o el "estado" en el 
que se encuentran estos */
const PostList = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    // Obtener los últimos 5 posts al cargar el componente
    const obtenerPosts = async () => {
      const querySnapshot = await getDocs(
        query(collection(db, "posts"), orderBy("fechaCreacion", "desc"), limit(4))
      );
      const postsArray = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setPosts(postsArray);
    };

    obtenerPosts();
  }, []);

  return (
    <div className="post-container">
  <div className="titulo-h2">
    <h2>Lista de Posts</h2>
  </div>

  <div className="post-wrapper">
    {posts.length === 0 ? (
      <p>No hay posts aún</p>
    ) : (
      posts.map((post) => (
        <div key={post.id} className="post-list">
          <h3>{post.titulo}</h3>
          <h4>{post.subtitulo}</h4>
          <p>{post.texto}</p>
          <small>
            {post.fechaCreacion
              ? new Date(post.fechaCreacion.seconds * 1000).toLocaleString()
              : "Fecha no disponible"}
          </small>
          <BotonLike />
        </div>
      ))
    )}
  </div>
</div>

  );
};

export default PostList;
