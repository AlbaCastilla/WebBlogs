import React, { useState } from 'react'; //con esto manejamos el estado del contenido
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
        onInput={handleTitleInput}
        suppressContentEditableWarning={true}
        data-placeholder="Título"
        ></div>
      <div 
        className="editable" 
        contentEditable //area de texto editable
        onInput={handleInput} //actualizamos estado
        suppressContentEditableWarning={true}
        data-placeholder="Escribe aquí..."
      ></div>

      <button type="submit">Publicar</button>

    </div>
  );
};

export default Post;