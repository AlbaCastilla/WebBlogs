// import React, {useState} from 'react'
// import './BotonLike.css'

// function BotonLike() {

//     const [liked, setLiked] = useState(false);//para que empiece sin like
    
//     const handleLike = () => {
//         setLiked(!liked);
//     }

//   return (
//     <div>
//         <button
//             className = 'boton-like'
//             onClick={handleLike}
//         >
//             {liked ? '❤️' : '🩶'}
//         </button>
//     </div>
//   )
// }

// export default BotonLike

import React, { useState } from 'react';
import './BotonLike.css';

function BotonLike({ postId, onLikeClick }) {
  const [liked, setLiked] = useState(false); // Para manejar el estado del like
  
  const handleLike = () => {
    setLiked(!liked);
    onLikeClick(postId);  // Llamar a la función de guardar el post en favoritos
  };

  return (
    <div>
      <button
        className="boton-like"
        onClick={handleLike}
      >
        {liked ? '❤️' : '🩶'}
      </button>
    </div>
  );
}

export default BotonLike;
