// import React, { useState } from 'react';
// import axios from 'axios';

// const RegistroForm = () => {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const user = { username, password };

//     try {
//       const response = await axios.post(
//         'http://localhost:9000/api/registro', 
//         user,
//         {
//           headers: {
//             'Content-Type': 'application/json', 
//             'Accept': 'application/json'
//           },
//           withCredentials: true // ✅ Important for CORS!
//         }
//       );

//       console.log(response.data);
//     } catch (error) {
//       console.error('There was an error!', error);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <div>
//         <label>Username:</label>
//         <input type="text" value={username} onChange={e => setUsername(e.target.value)} required />
//       </div>
//       <div>
//         <label>Password:</label>
//         <input type="password" value={password} onChange={e => setPassword(e.target.value)} required />
//       </div>
//       <button type="submit">Register</button>
//     </form>
//   );
// };

// export default RegistroForm;

import React, { useState } from 'react';
import { auth } from '../../environments/environments.firebase.ts';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import './RegistroForm.css';

const RegistroForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleRegistro = async (e) => {
    e.preventDefault();
    setError('');

    if (password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres');
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      alert('¡Registro exitoso! Ahora puedes iniciar sesión.');
      setEmail('');
      setPassword('');
    } catch (err) {
      setError('Error al registrar: ' + err.message);
    }
  };

  return (
    <div className="contenedor-global">

      <div className="registro-container">
        <h3>Crear Cuenta</h3>
        {error && <p className="error">{error}</p>}
        <form className='formulario' onSubmit={handleRegistro}>
          <div className="inputs">
            <input
            className='input-email'
              type="email"
              placeholder="Correo electrónico"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
            className='input-pass'
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button className='btn-registro' type="submit">Registrarse</button>
        </form>
      </div>
    </div>
  );
};

export default RegistroForm;
