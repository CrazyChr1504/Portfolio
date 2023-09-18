import { db } from "../firebase"
import { doc, setDoc, collection } from "firebase/firestore";
import AdressItem from "../components/Adresses/AdminAdressItems";
import NewAdress  from "../components/NewAdress/NewAdress";
import Card from "../components/UI/Card"
import Links from "../components/Links/links"
import "./App.css"

function Admin() {
  const adressCollectionRef = collection(db, "PhoneBook",);
  
  const addNewAdress = async (adress) => {
    try {
      await setDoc(doc(adressCollectionRef), {
        name: adress.name,
        number: adress.number,
        email: adress.email,
        avatar: adress.avatar
      });
    }
    catch (error) {
      console.log(error)
    }
  };

  return (
    <div>
     <Links />
      <NewAdress onAddAdress={addNewAdress} />
      <Card className="app">
        <AdressItem />
      </Card>
    </div>
  )
}

export default Admin;