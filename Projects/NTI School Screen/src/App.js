import data from "./SL API/Busses.json";

function App(){


    return(
        <>
        <div>
        {data[0].map((item, index) => (
            <p key={index}>{item.Line} {item.Name} {item.Time}</p>
            ))}
        
        {data[1].map((item, index) => (
            <p key={index}>{item.Line} {item.Name} {item.Time}</p>
            ))}
        </div>
        <div>
        </div>

        </>
    )
}

export default App