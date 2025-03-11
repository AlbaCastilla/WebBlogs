import React, { useState } from 'react'; 
import { db } from "../../firebase"; //importamos Firestore desde firebase.js
import { collection, addDoc, serverTimestamp } from "firebase/firestore"; 
import { useAuth } from '../../context/AuthContext'; // Importamos el hook de autenticación
import { useNavigate } from 'react-router-dom'; // Importamos useNavigate
import './Post.css';

const Post = () => {
  const { isAuthenticated } = useAuth(); // Usamos el hook de autenticación para saber si el usuario está logueado
  const [titulo, setTitulo] = useState('');
  const [subtitulo, setSubtitulo] = useState('');
  const [texto, setTexto] = useState(''); //comienza vacio - sin valor
  const navigate = useNavigate(); // Navegación

  if (!isAuthenticated) {
    // Si no está autenticado, redirigimos a la página de login
    navigate('/login');
    return null; // No renderizamos nada mientras redirige
  }

  const handleTitleInput = (e) => {
    setTitulo(e.target.innerText)
  }

  const handleSubtitleInput = (e) => {
    setSubtitulo(e.target.innerText)
  }

  const handleInput = (e) => {
    setTexto(e.target.innerText); 
  };

  const guardarPost = async () => {
    if (!titulo.trim() || !texto.trim()) {
      alert("El título y el contenido no pueden estar vacíos");
      return;
    }

    try {
      // Guardamos el post en Firebase
      await addDoc(collection(db, "posts"), {
        titulo,
        subtitulo,
        texto,
        fechaCreacion: serverTimestamp() // Guardar la fecha de creación
      });

      alert("Post guardado en Firebase!");

      // Limpiamos los campos después de guardar
      setTitulo("");
      setSubtitulo("");
      setTexto("");

    } catch (error) {
      console.error("Error al guardar el post: ", error);
    }
  };

  return (
    <div className="post">
      <div 
        className="titulo-editable"
        contentEditable
        onInput={handleTitleInput}
        suppressContentEditableWarning={true}
        data-placeholder="Título"
      ></div>

      <div 
        className="subtitulo-editable"
        contentEditable
        onInput={handleSubtitleInput}
        suppressContentEditableWarning={true}
        data-placeholder="subtítulo"
      ></div>

      <div 
        className="editable" 
        contentEditable
        onInput={handleInput} 
        suppressContentEditableWarning={true}
        data-placeholder="Escribe aquí..."
      ></div>

      <button type="submit" onClick={guardarPost}>Publicar</button>
    </div>
  );
};

export default Post;
