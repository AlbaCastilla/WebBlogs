import React, { useEffect, useState } from "react";
import { db } from "../../../firebase";
import { collection, getDocs } from "firebase/firestore";
import './PostList.css'
import BotonLike from "../boton-like/BotonLike";

/* lo iniciamos vacio, pq al principio no hay -- los cargamos con 
setPOST ---> useState para actualizar el "valor" o el "estado" en el 
que se encuentran estos */
const PostList = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => { //para oobtener los posts al INICIO -- cuando el componente se carge POR PRIMERA VEZ
        const obtenerPosts = async () => {
            //convertimos los datos en un array
            const querySnapshot = await getDocs(collection(db, "posts"));
            const postsArray = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data()
            }));
            setPosts(postsArray);
        };

        obtenerPosts();
    }, []);

    return (
        <div>
            <h2>Lista de Posts</h2>
            
            {posts.length === 0 ? (<p>No hay posts aún</p>) : (
                posts.map((post) => (
                    <div key={post.id} className="post-list">
                        <h3>{post.titulo}</h3>
                        <h4>{post.subtitulo}</h4>
                        <p>{post.texto}</p>
                        {/* transformar la fecha en texto legible */}
                        <small>{new Date(post.fechaCreacion?.seconds * 1000).toLocaleString()}</small>
                        <BotonLike />
                    </div>
                ))
            )}
        </div>
    );
};

export default PostList;
