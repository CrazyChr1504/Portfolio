import { useState } from "react";
import "./AdressForm.css"
import ElfImg from "../Images/Elf.png"
import EdgeLordImg from "../Images/TokyoGhoul.png"

function AdressForm(props) {

    const [userInput, setUserInput] = useState({
        enteredName:"",
        enteredNumber:"",
        enteredEmail:""
    });

    function nameChangeHandler(event) {
        setUserInput((prevState)=>{
            return {...prevState, enteredName: event.target.value}
        });
    }
    
    function numberChangeHandler(event) {
        setUserInput((prevState)=>{
            return {...prevState, enteredNumber: event.target.value}
        });
    }
    
    function emailChangeHandler(event) {
        setUserInput((prevState)=>{
            return {...prevState, enteredEmail: event.target.value}
        });
    }

    function submitHandler(event) {
        event.preventDefault();

        let avatar = document.getElementById("Avatar")


        if (avatar.value === "o2") {
            avatar = ElfImg
        }
        else if (avatar.value === "o3") {
            avatar = EdgeLordImg
        }

        const adressData = {
            name: userInput.enteredName,
            number: userInput.enteredNumber,
            email: userInput.enteredEmail,
            avatar: avatar
        };
        if (adressData.name === "" || adressData.number === "" || adressData.email === "" || avatar === null) {
            setUserInput( ()=>{
                return{
                enteredName:"",
                enteredNumber:"",
                enteredEmail:""
                }
            
            })
        } else {
            props.onSubmitedData(adressData);
            setUserInput( ()=>{
                return{
                enteredName:"",
                enteredNumber:"",
                enteredEmail:""
                }
            })
        }
    }

    return (
    <form onSubmit={submitHandler}>
        <div className="new-adress__controls">
            <div className="new-adress__control">
                <label>Name</label>
                <input 
                 type="text" 
                 value={userInput.enteredName} 
                 onChange={nameChangeHandler}
                />
            </div>
            <div className="new-adress__control">
                <label>Number</label>
                <input 
                 type="text" 
                 value={userInput.enteredNumber}
                 onChange={numberChangeHandler}
                />
            </div>
            <div className="new-adress__control">
                <label>Email</label>
                <input 
                 type="text" 
                 value={userInput.enteredEmail}
                 onChange={emailChangeHandler}
                />
            </div>
            <select id="Avatar" className="custom-select">
            <option value={null} selected="selected">Choose Avatar</option>
            <option value={"o2"}>Elf</option>
            <option value={"o3"}>Edge Lord</option>
            </select>
        </div>
        <div className="new-adress__actions">
            <button type="sumbit">Add New Contact</button>
        </div>
    </form>
    )
}

export default AdressForm;