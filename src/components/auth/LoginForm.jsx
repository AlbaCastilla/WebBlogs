// import React, { useState } from 'react';
// import axios from 'axios';

// const LoginForm = () => {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const credentials = { username, password };

//     try {
//       const response = await axios.post(
//         'http://localhost:9000/api/login', 
//         credentials,
//         {
//           headers: {
//             'Content-Type': 'application/json', 
//             'Accept': 'application/json'
//           },
//           withCredentials: true // ✅ Necesario para CORS y autenticación
//         }
//       );

//       console.log('Login exitoso:', response.data);
//       // Aquí puedes guardar el token en el estado global o en localStorage
//     } catch (error) {
//       console.error('Error en el login:', error);
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
//       <button type="submit">Login</button>
//     </form>
//   );
// };

// export default LoginForm;

import React, { useState } from 'react';
import { auth } from '../../environments/environments.firebase'; 
import { signInWithEmailAndPassword  } from 'firebase/auth';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert('¡Inicio de sesión exitoso!');
      setEmail('');
      setPassword('');
    } catch (err) {
      setError('Error al iniciar sesión: ' + err.message);
    }
  };

  return (
    <div className="login-container">
      <h3>Iniciar Sesión</h3>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Iniciar Sesión</button>
      </form>
    </div>
  );
};

export default LoginForm;
