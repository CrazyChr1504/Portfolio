import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  
  const handleLogin = async (event) => {
    event.preventDefault();

    const login = await fetch("http://localhost:5000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });
    
    const loginResponse = await login.json();
    try {
      if (
        email === loginResponse.rows[0].email &&
        password === loginResponse.rows[0].password
      ) {
        const config = {
          SecureToken : 'C3618E1FA9E5C7644108F910195A3459EC04E447CE24A20FBF4DCB92B550ECBDFFE2A2C7F8D1F182EC2EDB5C032C809F',
          To : "christopher.christensen@elev.ga.ntig.se",
          From : "te42023@gmail.com",
          Subject : "Verification Code",
          Body : `Your verification code is NTI2FA`
        };
        if (window.Email) {
          window.Email.send(config);
        }
        alert("Login Successful");
        navigate("/Verify", { state: { id: loginResponse.rows[0].id } });
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
};

export default Login;
