import React, { useState } from 'react';
import data from "./menu.json";
import logo from './logo.svg';
import './App.css';

function App() {
  const [day, setday] = useState('Monday');
  const [week, setWeek] = useState('34');
  const veg = data.Week[week][day].Veg_Lunch;
  const meat = data.Week[week][day].Lunch;

  function handleClick() {
    if (day === "Monday") {
      setday("Tuesday")
    }
    else if (day === 'Tuesday') {
      setday('Wednesday');
    }
    else if (day === 'Wednesday') {
      setday('Thursday');
  
    }
    else if (day === 'Thursday') {
      setday("Friday");
    }
    else if (day === 'Friday') {
      setday("Monday");
      setWeek("35")
    }
}
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <div class="container">
        <button onClick={handleClick}>Next day</button>
   
      </div>  

        <p className="text"></p>
        <h1>{day}</h1>
        <h3>{veg}</h3>
        <h3>{meat}</h3>
      </header>
    </div>
  );
}

export default App;
