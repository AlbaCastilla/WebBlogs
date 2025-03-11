// import LoginForm from '../components/auth/LoginForm.jsx';

// const Login = () => {
//     return (
//       <div>
//         <h2 className='h2'>¡Inicia Sesión!</h2>
//         <p className='p'>Accede a tu cuenta para continuar</p>
//         <div className="login-div" ><LoginForm/></div>
//         <div className="registro-div"></div>
//         <p>¿No tienes cuenta?<span>Registrate</span></p>
//       </div>
//     );
// };
  
// export default Login;
// import React, { useState } from 'react';
// import LoginForm from '../components/auth/LoginForm.jsx';
// import RegistroForm from '../components/auth/RegistroForm.jsx'; // Asegúrate de tener el formulario de registro

// const Login = () => {
//   const [isLogin, setIsLogin] = useState(true); // Estado para controlar si se muestra el login o el registro

//   const toggleForm = () => {
//     setIsLogin(!isLogin); // Cambiar entre login y registro
//   };

//   return (
//     <div>
//       <h2 className='h2'>¡Inicia Sesión!</h2>
//       <p className='p'>Accede a tu cuenta para continuar</p>
      
//       {/* Mostrar el formulario de login o registro según el estado */}
//       <div className={`form-div ${isLogin ? 'show-login' : 'show-register'}`}>
//         {isLogin ? <LoginForm /> : <RegistroForm />}
//       </div>

//       <div className="registro-div">
//         <p>¿No tienes cuenta? <span onClick={toggleForm}>¡Regístrate!</span></p>
//       </div>
//     </div>
//   );
// };
  
// // export default Login;
// import React, { useState } from 'react';
// import LoginForm from '../components/auth/LoginForm.jsx';
// import RegistroForm from '../components/auth/RegistroForm.jsx'; // Asegúrate de tener el formulario de registro
// import './Login.css'; // Importa el archivo CSS aquí

// const Login = () => {
//   const [isLogin, setIsLogin] = useState(true); // Estado para controlar si se muestra el login o el registro

//   const toggleForm = () => {
//     setIsLogin(!isLogin); // Cambiar entre login y registro
//   };

//   return (
//     <div>
//       <h2 className='h2'>¡Inicia Sesión!</h2>
//       <p className='p'>Accede a tu cuenta para continuar</p>
      
//       {/* Mostrar el formulario de login o registro según el estado */}
//       <div className={`form-div ${isLogin ? 'show-login' : 'show-register'}`}>
//         {isLogin ? <LoginForm /> : <RegistroForm />}
//       </div>

//       <div className="registro-div">
//         <p>¿No tienes cuenta? <span onClick={toggleForm}>¡Regístrate!</span></p>
//       </div>
//     </div>
//   );
// };
  
// export default Login;
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginForm from '../../components/auth/LoginForm.jsx';
import RegistroForm from '../../components/auth/RegistroForm.jsx';
import './Login.css';

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('authToken')) {
      navigate('/'); // Redirigir si ya está autenticado
    }
  }, [navigate]);

  // Función que se ejecutará cuando el usuario inicie sesión
  const handleAuthChange = () => {
    window.dispatchEvent(new Event("storage")); // Notifica a otros componentes que el estado cambió
    navigate('/'); // Redirigir al home
  };

return (
    <div>
      <h2 className='h2'>{isLogin ? '¡Inicia Sesión!' : '¡Crea una Cuenta!'}</h2>
      <p className='p'>{isLogin ? 'Accede a tu cuenta para continuar' : 'Llena los datos para registrarte'}</p>
      
      <div className={`form-div ${isLogin ? 'show-login' : 'show-register'}`}>
        {isLogin ? <LoginForm onLogin={handleAuthChange} /> : <RegistroForm />}
      </div>

      <div className="registro-div">
        <p className='link-registro-login'>
          {isLogin ? '¿No tienes cuenta? ' : '¿Ya tienes cuenta? '}
          <span onClick={() => setIsLogin(!isLogin)}>
            {isLogin ? '¡Regístrate!' : '¡Inicia sesión!'}
          </span>
        </p>
      </div>
    </div>
  );
}; 



export default Login;
