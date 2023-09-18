import AdressItem from "../components/Adresses/AdressItems";
import Card from "../components/UI/Card"
import Links from "../components/Links/links"
import "./App.css"

function App() {

  return (
    <div>
      <Links />
    <Card className="app">
      <AdressItem />
    </Card>
    </div>
  )
}

export default App;