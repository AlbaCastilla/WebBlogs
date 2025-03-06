
import React from 'react';
import PostComida from '../../components/post/post-list/comida/PostComida';
import './Comida.css'

const Comida = () => {
  return (
    <div className='fondo-comida'>
      <div className='fondo-blanco'>
        <div className="titulo-comida">
          <h2>Bienvenido a la Página de Comida</h2>
        </div>
        <div className="descripcion-comida">
          <p>Esta es la sección de posts de blogs de comida</p>
        </div>
        <PostComida/>
        </div>
    </div>
  );
};

export default Comida;
