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
  const [liked, setLiked] = useState(false); 
  const handleLike = () => {
    setLiked(!liked);
    onLikeClick(postId);  
  };

  return (
    <div className='div-btnLike'>
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
