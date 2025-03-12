import React, { useState } from 'react'; 
import { db } from "../../firebase"; 
import { collection, addDoc, serverTimestamp } from "firebase/firestore"; 
import { useAuth } from '../../context/AuthContext'; 
import { useNavigate } from 'react-router-dom'; 
import './Post.css';

const Post = () => {
  const { isAuthenticated } = useAuth(); 
  const [titulo, setTitulo] = useState('');
  const [subtitulo, setSubtitulo] = useState('');
  const [texto, setTexto] = useState(''); 
  const navigate = useNavigate(); 

  if (!isAuthenticated) {
    navigate('/login');
    return null; 
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
      await addDoc(collection(db, "posts"), {
        titulo,
        subtitulo,
        texto,
        fechaCreacion: serverTimestamp() 
      });

      alert("Post guardado en Firebase!");

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
