import PostsList from "../../components/post/post-list/PostList";
import './Home.css';
import imagenFondo from "../../img/imagenFondo3.jpg";
import imagenFondo2 from "../../img/imagenFondo2.avif";
import ContadorPost from "../../components/contador-post/ContadorPost";


const Home = () => {
  return (
    <div className="home-container">

      <div className="hero-section">
        <img src={imagenFondo} alt="Fondo" className="hero-image" />
        <div className="hero-content">
          <h1 className="page-title">Blog de Blogs</h1>
          <p className="page-subtitle">Descubre y comparte contenido único</p>
        </div>
      </div>

      <div className="contenedor-mediano">
        <div className="descripcion-contenedor">
          <img src={imagenFondo2} alt="Descripción" className="descripcion-imagen" />
          <div className="descripcion-titulo">
            <h2>¿De qué trata esta página?</h2>
            <p>Un espacio donde escritores comparten sus historias, descubren nuevas perspectivas y se conectan con otros apasionados por la escritura.Explora, escribe y comparte tu voz en una comunidad hecha para los amantes de las palabras.</p>
          </div>
        </div>

        <div className="contadores-contenedor">
          <div className="contadores">
            <div className="contador-post">
              <ContadorPost />
            </div>
          </div>
        </div>
      </div>

      <hr/>

      <div className="contenedor-Post">
        <PostsList />
      </div>




    </div>
  );
};

export default Home;
