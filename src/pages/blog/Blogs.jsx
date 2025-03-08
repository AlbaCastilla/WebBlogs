import PostForm from '../../components/post/create/PostForm.jsx';
import "./BlogsCrear.css"

const Blogs = () => {
    return (
      <div>
        <h2 className='h2'>Crea un Post de Blog!</h2>
        <p className='p'>Escribe tu propio blog para publicar en la plataforma</p>
      
        <PostForm />
      </div>
    );
  };
  
  export default Blogs;