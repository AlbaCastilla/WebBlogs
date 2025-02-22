import LoginForm from '../components/auth/LoginForm.jsx';

const Login = () => {
    return (
      <div>
        <h2 className='h2'>¡Inicia Sesión!</h2>
        <p className='p'>Accede a tu cuenta para continuar</p>
      
        <LoginForm />
      </div>
    );
};
  
export default Login;
