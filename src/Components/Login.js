import React, { useState } from "react";
import { useStateValue } from '../Context/StateProvider';
import { actionTypes } from '../Context/reducer';
import "./Signup.css";

function Login() {
  const  [, dispatch ] = useStateValue();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    fetch('https://dummyjson.com/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: email,
        password: password
      })
    })
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error('Login failed.');
    })
    .then(data => {
      localStorage.setItem('user', JSON.stringify(data));
      dispatch({
        type: actionTypes.SET_USER,
        user: data, // Assuming the API response contains user data
      });
      console.log("Login successful!");
    })
    .catch(error => {
      console.error('Error:', error);
    });
  };

  return (
    <div className="form-container">
      <div className="form-box">
        <h2>Log In</h2>

        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          className="input-field"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          className="input-field"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        
        <div className="popup-btn">
          <button className="submit-btn" onClick={handleLogin}>
            Sign In
          </button>
        </div>
       
      </div>
    </div>
  );
}

export default Login;
