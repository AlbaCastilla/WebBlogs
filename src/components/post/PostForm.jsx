import React, { useState } from 'react'; //con esto manejamos el estado del contenido
import { db } from "../../firebase"; //importamos Firestore desde firebase.js
import { collection, addDoc, serverTimestamp }  from "firebase/firestore"; 
import './Post.css';

const Post = () => {
  const [titulo, setTitulo] = useState('');
  const [subtitulo, setSubtitulo]= useState('');
  const [texto, setTexto] = useState(''); //comienza vacio - sin valor
  /*aqui almacenamos el contenido de lo que el usuario escriba*/

  const handleTitleInput = (e) => {
    setTitulo(e.target.innerText)
  }
  const handleSubtitleInput = (e) => {
    setSubtitulo(e.target.innerText)
  }
  const handleInput = (e) => {
    setTexto(e.target.innerText);
    //con esto hacemos q lo escrito se guarde en setTexto (estado)
  };


  const guardarPost = async () => {
    if (!titulo.trim() || !texto.trim()) {
      alert("El título y el contenido no pueden estar vacíos");
      return;
    }

    try {

      //con el await lo que hacemos es --> hasta q no se haya guardado no sigue con la siguiente accion
      await addDoc(collection(db, "posts"), {
        titulo,
        subtitulo,
        texto,
        fechaCreacion: serverTimestamp() // Guardar la fecha de creación
      });

      alert("Post guardado en Firebase!");

      //limpiamos los cambios -- seteandolos a 0
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
        contentEditable //area de texto editable
        onInput={handleInput} //actualizamos estado
        suppressContentEditableWarning={true}
        data-placeholder="Escribe aquí..."
      ></div>

      <button type="submit" onClick={guardarPost}>Publicar</button>

    </div>
  );
};

export default Post;