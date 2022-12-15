import { Link } from "react-router-dom";
import BrandLogo from "./brand.component";


interface INavbar {
    background?:string
}

export default function Navbar(props:INavbar){



    return(
        <nav className={`navbar ${props.background}`}>
            <div className="navbar-content">
                <div className="nav-brand">
                    <BrandLogo type="small" path="/home" />
                </div>
                <ul className="navbar-items">
                    <li>
                        <Link to="/global-records">Global records</Link>
                    </li>
                    <li>
                        <Link to="#">Option2</Link>
                    </li>
                    <li>
                        <Link to="#">Option3</Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
}