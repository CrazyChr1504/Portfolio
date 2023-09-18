import { useState } from "react"

function App() {
    const [cityName, setCityName] = useState()
    const [tempData, setTempData] = useState()

    function citySearchHandler(event) {
        setCityName(event.target.value)
    }

    function setTempDataText(apiData) {
        let text;
            (text = `The temp in ${apiData.data[0].city_name} is ${apiData.data[0].temp} C°\n${apiData.data[0].country_code}`)
        setTempData(text)
    }

    const fetchWeather = async (event) => {
        event.preventDefault()
        try {
          const response = await fetch(`https://api.weatherbit.io/v2.0/current?city=${cityName}&key=${process.env.REACT_APP_APIKEY}&include=minutely`);
          if (!response.ok) {
            throw new Error('Something went wrong!');
          }
          const data = await response.json();
          setTempDataText(data)
        } catch (error){}
    }

    return (
        <div>
        <form onSubmit={fetchWeather}>
            <input 
            type="text"
            value={cityName}
            onChange={citySearchHandler}
            />
            <button type="submit">Get Temp</button>
        </form>
        <h1>
            {tempData}
        </h1>
        </div>
    )
}

export default App