import "./AdressItems.css";
import Card from "../UI/Card"
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase";
import { useState, useEffect } from "react";
import Search from "../SearchFilter/Search";

function AdressItem() {
    const [adresslist, setAdressList] = useState([]);
    const adressCollectionRef = collection(db, "PhoneBook");

    let contacts = <Card className="no-contact">No contacts found</Card>

    if (adresslist.length !== 0) {
        contacts=
        <div>
        <Search/>
        {adresslist.map((item) => (
         <Card className="adress-item">
           <div className="adress-avatar">
             <img className= "image" src={item.avatar}/>
           </div>
          <div className="adress-item__description" >
           <h2>{item.name}</h2>
           <h1>{item.email}</h1>
           <div className="adress-item__number">{item.number}</div>
          </div>
         </Card>
        ))}
       </div>
    }

    useEffect(() => {
        function updateAdressList(snapshot) {
            const data = snapshot.docs.map((doc) => ({
                ...doc.data(),
                id: doc.id,
            }));
            setAdressList(data)
        };
        
        const unsub = onSnapshot(adressCollectionRef, updateAdressList);
        return () => unsub();
      }, [])

    return (
    contacts
    );
}

export default AdressItem;