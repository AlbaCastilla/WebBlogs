import React, { useState } from 'react';
import { auth } from '../../environments/environments.firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext'; // Importamos el contexto
import './LoginForm.css'

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth(); // Usamos la función login del contexto
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      login(user.accessToken); // Llamamos a login del contexto
      navigate('/'); // Redirigir al home
    } catch (err) {
      setError('Error al iniciar sesión: ' + err.message);
    }
  };

  return (
    <div className="contenedor-global">

      <div className="login-container">
        <h3>Iniciar Sesión</h3>
        {error && <p className="error">{error}</p>}
        <form className='formulario' onSubmit={handleLogin}>
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

          <button className='btn' type="submit">Iniciar Sesión</button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
