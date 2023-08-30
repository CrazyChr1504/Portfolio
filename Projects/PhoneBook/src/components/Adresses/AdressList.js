import AdressItem from "./AdressItems";

function AdressList(props) {
      return (
        <ul>
          {props.items.map((adress) => (
            <AdressItem
              name={adress.name}
              number={adress.number}
              email={adress.email}
            />
          ))}
        </ul>
      );
    };

export default AdressList

