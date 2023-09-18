import { useState } from "react";

function Search() {
    const [userInput, setUserInput] = useState({
       searchName: ""
    });

    function searchChanger() {
        setUserInput(userInput)
    }

    return(
    <form>
        <div className="new-adress__controls">
            <div className="new-adress__control">
                <label>Search</label>
                <input 
                 type="text" 
                 value={userInput.searchName}
                 onChange={searchChanger}
                />
            </div>
        </div>
    </form>
    )
}

export default Search;