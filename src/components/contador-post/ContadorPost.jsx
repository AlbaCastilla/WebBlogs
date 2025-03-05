import React, { useEffect, useState } from 'react';
import { db } from '../../firebase';
import { collection, onSnapshot } from 'firebase/firestore';

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

    const postsViajes = collection(db, "posts");

    onSnapshot(postsViajes, (snapshot) => {
      const filteredPostsComida = snapshot.docs.filter((doc) => doc.data().seccion === "comida");
      setTotalPostsComida(filteredPostsComida.length);
    });

  }, []);

  const [totalPostsDiml, setTotalPostsDiml] = useState(0);

  useEffect(() => {

    const postsViajes = collection(db, "posts");

    onSnapshot(postsViajes, (snapshot) => {
      const filteredPostsDiml = snapshot.docs.filter((doc) => doc.data().seccion === "diml");
      setTotalPostsDiml(filteredPostsDiml.length);
    });

  }, []);



  return (
    <div className="contador-posts">
        <h2>Contadores de los Posts</h2>
      <h3>Total de Posts de Viajes {totalPostsViajes}</h3>
      <h3>Total de Posts de Comida {totalPostsComida}</h3>
      <h3>Total de Posts de Day in my Life {totalPostsDiml}</h3>

    </div>
  );
}

export default ContadorPost;
