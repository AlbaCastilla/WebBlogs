import React, { useEffect, useState } from "react";
import { db } from "../../../firebase";
import { collection, getDocs, query, orderBy, limit } from "firebase/firestore";
import { useNavigate } from 'react-router-dom';
import "./PostList.css";

/* Lo iniciamos vacío, ya que al principio no hay posts. Los cargamos con 
setPosts --> useState para actualizar el estado en el que se encuentran estos */
const PostList = () => {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Obtener los últimos 4 posts al cargar el componente
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

  const handlePostClick = (id) => {
    navigate(`/post/${id}`);
  };

  return (
    <div className="post-container">
      <div className="titulo-h2">
        <h2>Post más vistos</h2>
      </div>

      <div className="post-wrapper">
        {posts.length === 0 ? (
          <p>No hay posts aún</p>
        ) : (
          posts.map((post) => (
            <div key={post.id} className="post-list" onClick={() => handlePostClick(post.id)}>
              <h3>{post.titulo}</h3>
              <h4>{post.subtitulo}</h4>

              <small>
                {post.fechaCreacion
                  ? new Date(post.fechaCreacion.seconds * 1000).toLocaleString()
                  : "Fecha no disponible"}
              </small>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default PostList;
