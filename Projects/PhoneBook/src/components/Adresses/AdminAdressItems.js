import "./AdressItems.css";
import Card from "../UI/Card"
import { deleteDoc, collection, doc, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase";
import { useState, useEffect } from "react";
import Search from "../SearchFilter/Search";

function AdressItem() {
    const [adresslist, setAdressList] = useState([]);
    const adressCollectionRef = collection(db, "PhoneBook");
    let contacts = <Card className="no-contact">No contacts found</Card>
    
    const ClickHandler = async (id) => {
        await deleteDoc(doc(adressCollectionRef, id));
    };
    
    function filteredSearch(props){
        if (props === "") {
            if (adresslist.length !== 0) {
            contacts=
            <div>
             <Search/>
            {adresslist.map((item) => (
             <Card className="adress-item">
               <div className="adress-avatar">
                   <img className="image" src={item.avatar}/>
               </div>
              <div className="adress-item__description" >
               <h2>{item.name}</h2>
               <h1>{item.email}</h1>
               <div className="adress-item__number">{item.number}</div>
               <button className="button" onClick={()=>ClickHandler(item.id)}>Delete</button>
              </div>
             </Card>
            ))}
           </div>
        }} else {
            contacts=
            <div>
             <Search/>
                {adresslist.map((item) => {
                 if (props.toLowerCase() in item.name.toLowerCase()) {
                    <Card className="adress-item">
                     <div className="adress-avatar">
                      <img className="image" src={item.avatar}/>
                     </div>
                     <div className="adress-item__description" >
                      <h2>{item.name}</h2>
                      <h1>{item.email}</h1>
                     <div className="adress-item__number">{item.number}</div>
                      <button className="button" onClick={()=>ClickHandler(item.id)}>Delete</button>
                     </div>
                    </Card>
                }
            })}
            </div>
        }
    }

    useEffect(() => {
        function updateAdressList(snapshot) {
            const data = snapshot.docs.map((doc) => ({
                ...doc.data(),
                id: doc.id,
            }));
            setAdressList(data)
        };
        
        const unsub = onSnapshot(adressCollectionRef,updateAdressList);
        return () => unsub();
      }, [])

    return (
   contacts
    );
}

export default AdressItem;