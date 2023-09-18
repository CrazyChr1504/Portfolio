import { useState } from "react";
import "../components/NewAdress/AdressForm.css";
import Admin from "./AdminApp";
import Links from "../components/Links/links";

function Login() {
  const correctEmail = "Admin@gmail.com";
  const correctPassword = "IncorrectPasswordOnly";

  const [userInput, setUserInput] = useState({
    enteredEmail: "",
    enteredPassword: "",
  });

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  function passwordHandler(event) {
    setUserInput((prevState) => ({
      ...prevState,
      enteredPassword: event.target.value,
    }));
  }

  function emailHandler(event) {
    setUserInput((prevState) => ({
      ...prevState,
      enteredEmail: event.target.value,
    }));
  }

  function submitHandler(event) {
    event.preventDefault();
    if (userInput.enteredEmail === correctEmail && userInput.enteredPassword === correctPassword) {
      setIsLoggedIn(true);
    }
  }

  return isLoggedIn ? (
    <Admin />
  ) : (
    <div>
      <Links />
      <form onSubmit={submitHandler}>
        <div className="new-adress__controls">
          <div className="new-adress__control">
            <label>Email</label>
            <input
              type="text"
              value={userInput.enteredEmail}
              onChange={emailHandler}
            />
          </div>
          <div className="new-adress__control">
            <label>Password</label>
            <input
              type="text"
              value={userInput.enteredPassword}
              onChange={passwordHandler}
            />
          </div>
        </div>
        <div className="new-adress__actions">
          <button type="submit">Login</button>
        </div>
      </form>
    </div>
  );
}

export default Login;