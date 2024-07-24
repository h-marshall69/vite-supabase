import { useState, useEffect } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';

// Importar usuarios desde el archivo JSON
import usersData from './users.json';

export default function App() {
  const [count, setCount] = useState(0);
  const [user, setUser] = useState(null); // Estado para el usuario
  const [message, setMessage] = useState(''); // Estado para el mensaje

  // Estados para el login
  const [loginEmail, setLoginEmail] = useState(''); 
  const [loginPassword, setLoginPassword] = useState(''); 

  // Estados para el registro
  const [signUpEmail, setSignUpEmail] = useState(''); 
  const [signUpPassword, setSignUpPassword] = useState(''); 
  const [username, setUsername] = useState(''); 

  const [users, setUsers] = useState([]); // Estado para los datos de usuarios

  useEffect(() => {
    // Cargar usuarios desde el archivo JSON al iniciar la aplicación
    setUsers(usersData);
  }, []);

  const login = () => {
    const user = users.find(u => u.email === loginEmail && u.password === loginPassword);
    if (user) {
      setMessage('Logueado en la base de datos');
      setUser(user);
    } else {
      setMessage('Email o contraseña incorrectos');
    }
  };

  const signUp = () => {
    if (users.find(u => u.email === signUpEmail)) {
      setMessage('El email ya está registrado');
      return;
    }

    const newUser = {
      id: users.length + 1,
      username,
      email: signUpEmail,
      password: signUpPassword
    };

    const updatedUsers = [...users, newUser];
    setUsers(updatedUsers);
    setMessage('Usuario creado en la base de datos');
  };

  const fetchUsers = () => {
    setMessage('');
  };

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount(count + 1)}>
          count is {count}
        </button>
        
        <div>
          <h2>Login</h2>
          <input
            type="email"
            placeholder="Email"
            value={loginEmail}
            onChange={(e) => setLoginEmail(e.target.value)}
          />
          <br/>
          <input
            type="password"
            placeholder="Password"
            value={loginPassword}
            onChange={(e) => setLoginPassword(e.target.value)}
          />
          <br/>
          <button onClick={login}>Login</button>
        </div>
        
        <div>
          <h2>Sign Up</h2>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          /><br/>
          <input
            type="email"
            placeholder="Email"
            value={signUpEmail}
            onChange={(e) => setSignUpEmail(e.target.value)}
          /><br/>
          <input
            type="password"
            placeholder="Password"
            value={signUpPassword}
            onChange={(e) => setSignUpPassword(e.target.value)}
          /><br/>
          <button onClick={signUp}>Sign Up</button>
        </div>
        
        <div>
          <h2>Users</h2>
          <button onClick={fetchUsers}>Fetch Users</button>
          {users.length > 0 && (
            <ul>
              {users.map(user => (
                <li key={user.id}>{user.username} - {user.email}</li>
              ))}
            </ul>
          )}
        </div>
        
        {message && <p>{message}</p>}
      </div>
    </>
  );
}
