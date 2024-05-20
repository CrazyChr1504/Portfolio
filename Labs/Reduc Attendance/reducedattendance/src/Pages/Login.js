import "../BigBOI.css";
import React, { useState } from "react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function encrypt(email, password) {

  const strings = `${email}, ${password}`
  const key = process.env.REACT_APP_SECURITY

  let result = '';
  for (let i = 0; i < strings.length; i++) {
      const charCode = strings.charCodeAt(i) ^ key.charCodeAt(i % key.length);
      result += String.fromCharCode(charCode);
    }
  return result
  }

  function decrypt(email, password) {

  const strings = `${email}, ${password}`
  const key = process.env.REACT_APP_SECURITY

  let result = '';
  for (let i = 0; i < strings.length; i++) {
      const charCode = strings.charCodeAt(i) ^ key.charCodeAt(i % key.length);
      result += String.fromCharCode(charCode);
    }
    result = result
  return result
  } 

  const handleLogin = async (event) => {
    event.preventDefault();
    const userData =  encrypt(email, password)

    const login = await fetch("http://localhost:5000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userData: userData
      }),
    });

    const loginResponse = await login.json();
    console.log(decrypt(loginResponse))
    try {
      if (
        email === loginResponse.rows[0].email &&
        password === loginResponse.rows[0].password &&
        loginResponse.rows[0].role === "Teacher"
      ) {
        alert("Login Successful");
      } else if (
        email === loginResponse.rows[0].email &&
        password === loginResponse.rows[0].password &&
        loginResponse.rows[0].role === "Student"
      ) {
        alert("Login Successful");
      } else {
        alert("Login Failed");
      }
    } catch (error) {
      alert("Login Failed");
    }
  };

  const handleEmail = (event) => {
    event.preventDefault();
    setEmail(event.target.value);
  };

  const handlePassword = (event) => {
    event.preventDefault();
    setPassword(event.target.value);
  };

  return (
      <form className="login-form">
        <label>Login</label>
        <input onChange={handleEmail} placeholder="Email"></input>
        <input onChange={handlePassword} placeholder="Password" type="password"></input>
        <button onClick={handleLogin} type="submit">
          Submit 
        </button>
      </form>
  );
}

export default Login;
