import React, { useState } from 'react';
import axios from 'axios';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const credentials = { username, password };

    try {
      const response = await axios.post(
        'http://localhost:9000/api/login', 
        credentials,
        {
          headers: {
            'Content-Type': 'application/json', 
            'Accept': 'application/json'
          },
          withCredentials: true // ✅ Necesario para CORS y autenticación
        }
      );

      console.log('Login exitoso:', response.data);
      // Aquí puedes guardar el token en el estado global o en localStorage
    } catch (error) {
      console.error('Error en el login:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Username:</label>
        <input type="text" value={username} onChange={e => setUsername(e.target.value)} required />
      </div>
      <div>
        <label>Password:</label>
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} required />
      </div>
      <button type="submit">Login</button>
    </form>
  );
};

export default LoginForm;
