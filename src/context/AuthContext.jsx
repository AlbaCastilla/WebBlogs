// import { createContext, useContext, useState, useEffect } from 'react';

// // Creamos el contexto que va a manejar el estado de autenticación
// const AuthContext = createContext();

// // AuthProvider: Componente que envuelve a toda la aplicación para compartir el estado de autenticación
// export const AuthProvider = ({ children }) => {
//   // El estado 'isAuthenticated' se usará para almacenar si el usuario está autenticado o no
//   const [isAuthenticated, setIsAuthenticated] = useState(false);

//   // useEffect se ejecuta cuando el componente se monta (como un componentDidMount)
//   // Aquí comprobamos si hay un token de autenticación en el almacenamiento local
//   useEffect(() => {
//     const userLoggedIn = localStorage.getItem('authToken'); // Obtenemos el token de localStorage
//     setIsAuthenticated(!!userLoggedIn); // Si existe el token, el usuario está autenticado (true), si no (false)
//   }, []);

//   // Función para iniciar sesión: guarda el token en el almacenamiento local y actualiza el estado
//   const login = (token) => {
//     localStorage.setItem('authToken', token); // Guardamos el token de autenticación en localStorage
//     setIsAuthenticated(true); // Marcamos al usuario como autenticado
//   };

//   // Función para cerrar sesión: elimina el token del almacenamiento local y actualiza el estado
//   const logout = () => {
//     console.log('Cerrando sesión...');
//     console.log('ID del usuario autenticado:', userId); 
//   localStorage.removeItem('authToken'); // Elimina el token del almacenamiento local
//   setIsAuthenticated(false); // Cambia el estado de autenticación a false
//   console.log('Sesión cerrada:', isAuthenticated);
//   console.log('ID del usuario autenticado:', userId); 
//   };

//   // AuthContext.Provider es un componente que proporcionará el estado y funciones a todos los componentes hijos
//   // Aquí pasamos el valor (estado y funciones) a los componentes hijos para que puedan acceder a ellos
//   return (
//     <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
//       {children} {/* Renderiza los hijos del componente, es decir, toda la app */}
//     </AuthContext.Provider>
//   );
// };

// // useAuth: hook personalizado que facilita el acceso al contexto de autenticación en cualquier componente
// export const useAuth = () => {
//   return useContext(AuthContext); // Utiliza el contexto AuthContext para obtener el estado y funciones
// };



import { createContext, useContext, useState, useEffect } from 'react';
import { signOut, onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase'; // Asegúrate de que esta importación esté bien

// Creamos el contexto que va a manejar el estado de autenticación
const AuthContext = createContext();

// AuthProvider: Componente que envuelve a toda la aplicación para compartir el estado de autenticación
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null); // Almacenamos el usuario autenticado

  // useEffect se ejecuta cuando el componente se monta (como un componentDidMount)
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // Si hay un usuario logueado, lo establecemos en el estado
        setIsAuthenticated(true);
        setUser(user); // Aquí se obtiene el usuario logueado
      } else {
        // Si no hay usuario logueado, configuramos los estados como no autenticados
        setIsAuthenticated(false);
        setUser(null);
      }
    });

    // Cleanup: Devolvemos una función para cancelar la suscripción cuando el componente se desmonte
    return () => unsubscribe();
  }, []); // Este useEffect solo se ejecuta una vez, al montar el componente

  // Función para iniciar sesión
  const login = (token, user) => {
    localStorage.setItem('authToken', token); // Guardamos el token de autenticación
    setIsAuthenticated(true);
    setUser(user); // Guardamos el usuario
  };

  // Función para cerrar sesión
  const logout = async () => {
    try {
      console.log("Cerrando sesión...");
      if (user) {
        console.log("ID del usuario autenticado:", user.uid); // ID del usuario
      }

      // Cierra la sesión de Firebase
      await signOut(auth); // Cerrar sesión de Firebase Authentication

      // Eliminar el token del almacenamiento local
      localStorage.removeItem("authToken");

      // Actualizar los estados de React
      setIsAuthenticated(false); // Cambiar el estado de autenticación a false
      setUser(null); // Limpiar el usuario del estado

      console.log("Sesión cerrada");
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  // AuthContext.Provider es un componente que proporcionará el estado y funciones a todos los componentes hijos
  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children} {/* Renderiza los hijos del componente */}
    </AuthContext.Provider>
  );
};

// useAuth: hook personalizado que facilita el acceso al contexto de autenticación en cualquier componente
export const useAuth = () => {
  return useContext(AuthContext); // Utiliza el contexto AuthContext para obtener el estado y funciones
};

