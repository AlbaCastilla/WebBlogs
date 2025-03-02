import React, {useState} from 'react'
import './BotonLike.css'

function BotonLike() {

    const [liked, setLiked] = useState(false);//para que empiece sin like
    
    const handleLike = () => {
        setLiked(!liked);
    }

  return (
    <div>
        <button
            className = 'boton-like'
            onClick={handleLike}
        >
            {liked ? '❤️' : '🩶'}
        </button>
    </div>
  )
}

export default BotonLike