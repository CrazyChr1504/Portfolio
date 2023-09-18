import { Link } from "react-router-dom";
import "./links.css" 

function AdminLink () {
    return(
        <>
        <ul>
         <li><Link to="/admin"/></li>
        </ul>
        </>
    )
}

export default AdminLink;