import { Link } from "react-router-dom";    
import "./links.css";

function links () {
    return(
        <>
        <ul>
            <li><Link to="/">Contacts</Link></li>
            <li><Link to="/admin">Admin</Link></li>
        </ul>
        </>
    )
}

export default links;