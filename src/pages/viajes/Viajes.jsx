import React from 'react';
import PostViajes from '../../components/post/post-list/viajes/PostViajes'
import './Viajes.css'

const Viajes = () => {
  return (
    <div>
      <div className="titulo-viajes">
        <h2>Bienvenido a la Página de Viajes</h2>
      </div>
      <div className="descripcion-viajes">
        <p>Esta es la sección de posts de viajes</p>
      </div>
      <PostViajes/>
    </div>
  );
};

export default Viajes;
