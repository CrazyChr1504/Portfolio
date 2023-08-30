import "./AdressItems.css";
import Card from "../UI/Card"

function AdressItem(props) {

    return (
    <Card className="adress-item">
        <div className="adress-item__description">
            <h2>{props.name}</h2>
            <h1>{props.email}</h1>
            <div className="adress-item__number">{props.number}</div>
        </div>
    </Card>
    );
}

export default AdressItem;