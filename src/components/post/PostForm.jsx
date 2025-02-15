import React, { useState } from 'react';
import './Post.css';

const Post = () => {
  const [titulo, setTitulo] = useState('');
  const [subtitulo, setSubtitulo] = useState('');
  const [texto, setTexto] = useState('');

  // Función para manejar el cambio de tamaño automático de los textarea
  const handleAutoResize = (e) => {
    e.target.style.height = 'auto'; // Restablecer la altura
    e.target.style.height = `${e.target.scrollHeight}px`; // Ajustar altura al contenido
  };

  // Función para manejar el envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();

    const postData = {
      titulo,
      subtitulo,
      texto,
      fechaHora: new Date().toLocaleString(),
    };

    // Lógica para guardar los datos (aquí solo los mostramos)
    console.log('Datos enviados:', postData);
  };

  return (
    <div className="post">
      <h2>Crear un Post</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="titulo">Título:</label>
          <input
            type="text"
            id="titulo"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="subtitulo">Subtítulo:</label>
          <input
            type="text"
            id="subtitulo"
            value={subtitulo}
            onChange={(e) => setSubtitulo(e.target.value)}
            onInput={handleAutoResize}  // Ajustar tamaño automáticamente
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="texto">Texto:</label>
          <textarea
            id="texto"
            value={texto}
            onChange={(e) => setTexto(e.target.value)}
            onInput={handleAutoResize}  // Ajustar tamaño automáticamente
            required
          ></textarea>
        </div>

        <button type="submit">Publicar</button>
      </form>
    </div>
  );
};

{/*ACORDARSE DE AL HACER LA LÓGICA DE METER USUARIO, DATE-TIME Y SECCION */}

export default Post;
