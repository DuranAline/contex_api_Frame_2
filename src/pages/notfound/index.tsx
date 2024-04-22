import { Link } from "react-router-dom"
import "./style.css"

export function Notfound() {
    return(
        <div className="error">
            <img src="src/assets/image/404.png" alt="" className="img-error"/>
            <button className="botao"><Link to={"/"} className="link">Home</Link></button>
        </div>
    )
}