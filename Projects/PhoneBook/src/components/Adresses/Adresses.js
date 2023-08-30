import AdressItem from "./AdressItems"
import Card from "../UI/Card"
import "./Adresses.css"
import AdressList from "./AdressList";

function Adresses(props) {
    return (
        <Card className="adress">
          <AdressList items={props.items}/>
        </Card>
      );
    }
    
export default Adresses