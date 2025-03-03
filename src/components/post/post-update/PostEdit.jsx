import React from 'react'
import './PostEdit.css'
import { doc, getDoc, updateDoc } from 'firebase/firestore'
import { db } from '../../firebaseConfig'


const PostEdit = ({ postd, onClose }) => {

    const [titulo, setTitulo] = useState("");
    const [subtitulo, setSubtitulo] = useState("");
    const [texto, setTexto] = useState("");
    const [error, setError] = useState(null);
  
    //cargsmos los datos del post cuando el componente se monta
    useEffect(() => {
      const fetchPost = async () => {
        try {
          const postRef = doc(db, "post", postId);
          const postSnap = await getDoc(postRef);
  
          if (postSnap.exists()) {
            const postData = postSnap.data();
            setTitle(postData.title);
            setContent(postData.content);
          } else {
            console.log("No existe el post");
          }
        } catch (err) {
          console.error("Error al obtener el post:", err);
        }
      };
  
      if (postId) {
        fetchPost();
      }
    }, [postId]);
}





//to-do
function PostEdit() {
  return (
    <div>PostEdit</div>
  )
}

export default PostEdit;