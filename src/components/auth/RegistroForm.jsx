import React, { useState } from 'react';
import axios from 'axios';

const RegistroForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = { username, password };

    try {
      const response = await axios.post(
        'http://localhost:9000/api/registro', 
        user,
        {
          headers: {
            'Content-Type': 'application/json', 
            'Accept': 'application/json'
          },
          withCredentials: true // ✅ Important for CORS!
        }
      );

      console.log(response.data);
    } catch (error) {
      console.error('There was an error!', error);
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
      <button type="submit">Register</button>
    </form>
  );
};

export default RegistroForm;
