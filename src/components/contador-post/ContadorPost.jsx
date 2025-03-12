import React, { useEffect, useState } from 'react';
import { db } from '../../firebase';
import { collection, onSnapshot } from 'firebase/firestore';
import './ContadorPost.css'

function ContadorPost() {
  const [totalPostsViajes, setTotalPostsViajes] = useState(0);

  useEffect(() => {

    const postsViajes = collection(db, "posts");

    onSnapshot(postsViajes, (snapshot) => {
      const filteredPosts = snapshot.docs.filter((doc) => doc.data().seccion === "viajes");
      setTotalPostsViajes(filteredPosts.length);
    });

  }, []);

  const [totalPostsComida, setTotalPostsComida] = useState(0);

  useEffect(() => {

    const postsComida = collection(db, "posts");

    onSnapshot(postsComida, (snapshot) => {
      const filteredPostsComida = snapshot.docs.filter((doc) => doc.data().seccion === "comida");
      setTotalPostsComida(filteredPostsComida.length);
    });

  }, []);

  const [totalPostsDiml, setTotalPostsDiml] = useState(0);

  useEffect(() => {

    const postsDiml = collection(db, "posts");

    onSnapshot(postsDiml, (snapshot) => {
      const filteredPostsDiml = snapshot.docs.filter((doc) => doc.data().seccion === "diml");
      setTotalPostsDiml(filteredPostsDiml.length);
    });

  }, []);

  const [totalPostsOtro, setTotalPostsOtro] = useState(0);

  useEffect(() => {

    const postsOtro = collection(db, "posts");

    onSnapshot(postsOtro, (snapshot) => {
      const filteredPostsOtro = snapshot.docs.filter((doc) => doc.data().seccion === "otro");
      setTotalPostsOtro(filteredPostsOtro.length);
    });

  }, []);



  return (
    <div className="contador-posts">
      <h2>Contadores de los Posts</h2>
      <div className="contador-grid">
        <div className="tarjeta-contador">Total de Posts de Viajes: {totalPostsViajes}</div>
        <div className="tarjeta-contador">Total de Posts Comida: {totalPostsComida}</div>
        <div className="tarjeta-contador">Total de Posts de Diml: {totalPostsDiml}</div>
        <div className="tarjeta-contador">Total de Posts de Otro: {totalPostsOtro}</div>
      </div>
    </div>
  );
}

export default ContadorPost;
