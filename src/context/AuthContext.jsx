import { createContext, useContext, useState, useEffect } from 'react';

// Creamos el contexto que va a manejar el estado de autenticación
const AuthContext = createContext();

// AuthProvider: Componente que envuelve a toda la aplicación para compartir el estado de autenticación
export const AuthProvider = ({ children }) => {
  // El estado 'isAuthenticated' se usará para almacenar si el usuario está autenticado o no
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // useEffect se ejecuta cuando el componente se monta (como un componentDidMount)
  // Aquí comprobamos si hay un token de autenticación en el almacenamiento local
  useEffect(() => {
    const userLoggedIn = localStorage.getItem('authToken'); // Obtenemos el token de localStorage
    setIsAuthenticated(!!userLoggedIn); // Si existe el token, el usuario está autenticado (true), si no (false)
  }, []);

  // Función para iniciar sesión: guarda el token en el almacenamiento local y actualiza el estado
  const login = (token) => {
    localStorage.setItem('authToken', token); // Guardamos el token de autenticación en localStorage
    setIsAuthenticated(true); // Marcamos al usuario como autenticado
  };

  // Función para cerrar sesión: elimina el token del almacenamiento local y actualiza el estado
  const logout = () => {
    localStorage.removeItem('authToken'); // Eliminamos el token de localStorage
    setIsAuthenticated(false); // Marcamos al usuario como no autenticado
  };

  // AuthContext.Provider es un componente que proporcionará el estado y funciones a todos los componentes hijos
  // Aquí pasamos el valor (estado y funciones) a los componentes hijos para que puedan acceder a ellos
  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children} {/* Renderiza los hijos del componente, es decir, toda la app */}
    </AuthContext.Provider>
  );
};

// useAuth: hook personalizado que facilita el acceso al contexto de autenticación en cualquier componente
export const useAuth = () => {
  return useContext(AuthContext); // Utiliza el contexto AuthContext para obtener el estado y funciones
};
