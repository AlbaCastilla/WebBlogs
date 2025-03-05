import PostsList from "../../components/post/post-list/PostList";
//import './pages.css';

const Home = () => {
  return (
    <div className='divPrincipal'>
      <h2 className='h2'>Bienvenido a la Página de Inicio</h2>
      <p className='p'>Esta es la sección principal Home</p>
    
      <PostsList />
    </div>
  );
};

export default Home;
