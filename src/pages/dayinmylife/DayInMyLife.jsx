import React from 'react';
import PostDiml from '../../components/post/post-list/diml/PostDiml';
import './DayInMyLife.css'

const DayInMyLife = () => {
  return (
    <div>
      <div className="titulo-diml">
        <h2>Bienvenido a la Página de Day in my Life</h2>
      </div>
      <div className="descripcion-diml">
        <p>Esta es la sección de posts de Day in my life</p>
      </div>
      <PostDiml/>
    </div>
  );
};

export default DayInMyLife;
