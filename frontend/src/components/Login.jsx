import { useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { authState } from '../atoms'; // Adjust the import path as necessary
import './Login.css'; // Create a CSS file for styling
import { useRecoilState } from 'recoil';
import {unameState} from '../atoms'
export function Login() {
  const [uname, setUsername] = useRecoilState(unameState);
  const [password, setPassword] = useState('');
  const setAuth = useSetRecoilState(authState);

  const handleLogin = async (e) => {
    e.preventDefault();

    const res = await fetch("http://localhost:3000/login", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ uname, password }),
    });
    if (res.ok) {
      const json = await res.json();
      setAuth({
        isAuthenticated: true,
      }
);
    } else {
      alert(uname +" "+ password+" failed ");
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Username"
          value={uname}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}
