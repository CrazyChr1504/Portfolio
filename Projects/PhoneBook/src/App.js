import { useState } from "react";

import Adresses from "./components/Adresses/Adresses";
import NewAdress  from "./components/NewAdress/NewAdress";

const startAdresses = [
  {name: "Bob Ross", number: "123-123 1321", email: "Painter101@yahoo.ross"},
  {name: "John Dough", number: "727-272 7270", email: "TemplateNotFound@hotmail.com"},
  {name: "Magnus", number: "073-268 6876", email: "Magnus@gmail.com"}
];

function App() {
  const [adresses, setAdresses] = useState(startAdresses)

  function addAdressHandler(adress) {
      setAdresses((prevAdresses) => {
        return [adress, ...prevAdresses];
      });
  }

  return (
    <div>
      <NewAdress onAddAdress={addAdressHandler} />
      <Adresses items={adresses}/>
    </div>
  )
}

export default App;