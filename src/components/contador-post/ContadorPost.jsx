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

  return (
    <div className="contador-posts">
      <h2>Total de Posts de Viajes {totalPostsViajes}</h2>
    </div>
  );
}

export default ContadorPost;
