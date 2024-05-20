import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function Verify() {
  const [verification, setVerification] = useState("");
  const [code, setCode] = useState("NTI2FA");
  const navigate = useNavigate();
  const location = useLocation();
  const id = location.state.id ? location.state.id : "";

  const handleVerification = (event) => {
    event.preventDefault();
    if (verification === code) {
      alert("Verification Successful");
    } else {
      alert("Verification Failed");
    }
  }

  const handleVerificationCode = async (event) => {
    event.preventDefault();
    const sendEmail = await fetch("http://localhost:5000/sendEmail", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: id,
      }),
    });
    const response = await sendEmail.json();
    setCode(response[1]);
    alert("Verification code has been sent to your email");
  }

  const handleUserVerification = (event) => {
    event.preventDefault();
    setVerification(event.target.value);
  }

  return (
    <form className="login-form">
      <label>Verify</label>
      <input onChange={handleUserVerification} placeholder="Verification Code"></input>
      <button onClick={handleVerificationCode} type="submit">
        Get Code 
      </button>
      <button onClick={handleVerification} type="submit">
        Submit 
      </button>
    </form>
  );
}

export default Verify;