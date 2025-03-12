// import React, { useState } from 'react'; //con esto manejamos el estado del contenido
// import { db } from "../../firebase"; //importamos Firestore desde firebase.js
// import { collection, addDoc, serverTimestamp }  from "firebase/firestore"; 
// import './Post.css';

// const Post = () => {
//   const [titulo, setTitulo] = useState('');
//   const [subtitulo, setSubtitulo]= useState('');
//   const [texto, setTexto] = useState(''); //comienza vacio - sin valor
//   /*aqui almacenamos el contenido de lo que el usuario escriba*/

//   const handleTitleInput = (e) => {
//     setTitulo(e.target.innerText)
//   }
//   const handleSubtitleInput = (e) => {
//     setSubtitulo(e.target.innerText)
//   }
//   const handleInput = (e) => {
//     setTexto(e.target.innerText);
//     //con esto hacemos q lo escrito se guarde en setTexto (estado)
//   };


//   const guardarPost = async () => {
//     if (!titulo.trim() || !texto.trim()) {
//       alert("El título y el contenido no pueden estar vacíos");
//       return;
//     }

//     try {

//       //con el await lo que hacemos es --> hasta q no se haya guardado no sigue con la siguiente accion
//       await addDoc(collection(db, "posts"), {
//         titulo,
//         subtitulo,
//         texto,
//         fechaCreacion: serverTimestamp() // Guardar la fecha de creación
//       });

//       alert("Post guardado en Firebase!");

//       //limpiamos los cambios -- seteandolos a 0
//       setTitulo("");
//       setSubtitulo("");
//       setTexto("");

//     } catch (error) {
//       console.error("Error al guardar el post: ", error);
//     }
//   };

//   return (
//     <div className="post">

//       <div 
//         className="titulo-editable"
//         contentEditable
//         onInput={handleTitleInput}
//         suppressContentEditableWarning={true}
//         data-placeholder="Título"
//         ></div>

//         <div 
//         className="subtitulo-editable"
//         contentEditable
//         onInput={handleSubtitleInput}
//         suppressContentEditableWarning={true}
//         data-placeholder="subtítulo"
//         ></div>

//       <div 
//         className="editable" 
//         contentEditable //area de texto editable
//         onInput={handleInput} //actualizamos estado
//         suppressContentEditableWarning={true}
//         data-placeholder="Escribe aquí..."
//       ></div>

//       <button type="submit" onClick={guardarPost}>Publicar</button>

//     </div>
//   );
// };

// export default Post;

// import React, { useState, useEffect } from 'react';
// import { db } from "../../../firebase";
// import { collection, addDoc, serverTimestamp, getDocs } from "firebase/firestore"; 
// import './Post.css';

// const Post = () => {
//   const [titulo, setTitulo] = useState('');
//   const [subtitulo, setSubtitulo] = useState('');
//   const [texto, setTexto] = useState('');
//   const [secciones, setSecciones] = useState([]);
//   const [seccionSeleccionada, setSeccionSeleccionada] = useState('');

//   useEffect(() => {
//     const obtenerSecciones = async () => {
//       try {
//         const querySnapshot = await getDocs(collection(db, "secciones"));
//         const listaSecciones = querySnapshot.docs.map(doc => ({
//           id: doc.id, 
//           nombre: doc.data().seccion // Asegura que usas el campo correcto
//         }));
//         setSecciones(listaSecciones);
//       } catch (error) {
//         console.error("Error al obtener las secciones: ", error);
//       }
//     };

//     obtenerSecciones();
//   }, []);

//   const handleTitleInput = (e) => setTitulo(e.target.innerText);
//   const handleSubtitleInput = (e) => setSubtitulo(e.target.innerText);
//   const handleInput = (e) => setTexto(e.target.innerText);

//   const guardarPost = async () => {
//     if (!titulo.trim() || !texto.trim() || !seccionSeleccionada) {
//       alert("El título, el contenido y la sección no pueden estar vacíos");
//       return;
//     }

//     try {
//       await addDoc(collection(db, "posts"), {
//         titulo,
//         subtitulo,
//         texto,
//         seccion: seccionSeleccionada,
//         fechaCreacion: serverTimestamp()
//       });

//       alert("Post guardado en Firebase!");
//       setTitulo("");
//       setSubtitulo("");
//       setTexto("");
//       setSeccionSeleccionada("");
//     } catch (error) {
//       console.error("Error al guardar el post: ", error);
//     }
//   };

//   return (
//     <div className="post">
//       <div 
//         className="titulo-editable"
//         contentEditable
//         onInput={handleTitleInput}
//         suppressContentEditableWarning={true}
//         data-placeholder="Título"
//       ></div>

//       <div 
//         className="subtitulo-editable"
//         contentEditable
//         onInput={handleSubtitleInput}
//         suppressContentEditableWarning={true}
//         data-placeholder="Subtítulo"
//       ></div>

//       <div 
//         className="editable" 
//         contentEditable
//         onInput={handleInput}
//         suppressContentEditableWarning={true}
//         data-placeholder="Escribe aquí..."
//       ></div>

//       <select 
//       className="select-seccion"
//         value={seccionSeleccionada} 
//         onChange={(e) => setSeccionSeleccionada(e.target.value)}
//       >
//         <option value="">Selecciona una sección</option>
//         {secciones.map(seccion => (
//           <option key={seccion.id} value={seccion.nombre}>{seccion.nombre}</option>
//         ))}
//       </select>

//       <button type="submit" onClick={guardarPost}>Publicar</button>
//     </div>
//   );
// };

// export default Post;

import React, { useState, useEffect } from 'react';
import { db } from "../../../firebase";
import { collection, addDoc, serverTimestamp, getDocs } from "firebase/firestore";
import { getAuth } from 'firebase/auth'; // Importar getAuth
import './Post.css';

const Post = () => {
  const [titulo, setTitulo] = useState('');
  const [subtitulo, setSubtitulo] = useState('');
  const [texto, setTexto] = useState('');
  const [secciones, setSecciones] = useState([]);
  const [seccionSeleccionada, setSeccionSeleccionada] = useState('');
  const [usuario, setUsuario] = useState(null); // Estado para el usuario logueado

  useEffect(() => {
    // Obtener las secciones desde Firebase Firestore
    const obtenerSecciones = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "secciones"));
        const listaSecciones = querySnapshot.docs.map(doc => ({
          id: doc.id, 
          nombre: doc.data().seccion // Asegura que usas el campo correcto
        }));
        setSecciones(listaSecciones);
      } catch (error) {
        console.error("Error al obtener las secciones: ", error);
      }
    };

    // Obtener el usuario logueado
    const auth = getAuth();
    const usuarioLogueado = auth.currentUser;
    if (usuarioLogueado) {
      setUsuario(usuarioLogueado); // Almacenar el usuario logueado
    }

    obtenerSecciones();
  }, []);

  const handleTitleInput = (e) => setTitulo(e.target.innerText);
  const handleSubtitleInput = (e) => setSubtitulo(e.target.innerText);
  const handleInput = (e) => setTexto(e.target.innerText);

  const guardarPost = async () => {
    if (!titulo.trim() || !texto.trim() || !seccionSeleccionada) {
      alert("El título, el contenido y la sección no pueden estar vacíos");
      return;
    }

    // Verificar que el usuario esté logueado antes de guardar el post
    if (!usuario) {
      alert("Debes iniciar sesión para publicar un post");
      return;
    }

    try {
      await addDoc(collection(db, "posts"), {
        titulo,
        subtitulo,
        texto,
        seccion: seccionSeleccionada,
        usuario: usuario.uid, // Agregar el ID del usuario logueado
        fechaCreacion: serverTimestamp()
      });

      alert("Post guardado en Firebase!");
      setTitulo("");
      setSubtitulo("");
      setTexto("");
      setSeccionSeleccionada("");
    } catch (error) {
      console.error("Error al guardar el post: ", error);
    }
  };

  return (
    <div className="post">
      <div 
        className="titulo-editable"
        contentEditable
        onInput={handleTitleInput}
        suppressContentEditableWarning={true}
        data-placeholder="Título"
      ></div>

      <div 
        className="subtitulo-editable"
        contentEditable
        onInput={handleSubtitleInput}
        suppressContentEditableWarning={true}
        data-placeholder="Subtítulo"
      ></div>

      <div 
        className="editable" 
        contentEditable
        onInput={handleInput}
        suppressContentEditableWarning={true}
        data-placeholder="Escribe aquí..."
      ></div>

      <select 
        className="select-seccion"
        value={seccionSeleccionada} 
        onChange={(e) => setSeccionSeleccionada(e.target.value)}
      >
        <option value="">Selecciona una sección</option>
        {secciones.map(seccion => (
          <option key={seccion.id} value={seccion.nombre}>{seccion.nombre}</option>
        ))}
      </select>

      <button className='boton-Publicar' type="submit" onClick={guardarPost}>Publicar</button>
    </div>
  );
};

export default Post;
