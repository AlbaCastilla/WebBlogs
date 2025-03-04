import PostForm from '../components/post/create/PostForm.jsx';

const Blogs = () => {
    return (
      <div>
        <h2 className='h2'>Crea un Blog!</h2>
        <p className='p'>seccion para crear tus blogs</p>
      
        <PostForm />
      </div>
    );
  };
  
  export default Blogs;