
import React from 'react';
import PostOtro from '../../components/post/post-list/otro/PostOtro';
import './Otros.css'

const Otros = () => {
  return (
    <div>
      <div className="titulo-otros">
        <h2>Bienvenido a la Página de Otros Posts</h2>
      </div>
      <div className="descripcion-otros">
        <p>Esta es la sección de posts de cualquier otra cosa que no sea comida, day in my life o viajes</p>
      </div>
      <PostOtro/>
    </div>
  );
};

export default Otros;
