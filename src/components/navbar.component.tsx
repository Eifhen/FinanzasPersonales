import { Link } from "react-router-dom";
import BrandLogo from "./brand.component";




export default function Navbar(){



    return(
        <nav className="navbar">
            <div className="navbar-content">
                <div className="nav-brand">
                    <BrandLogo type="small" path="/home" />
                </div>
                <ul className="navbar-items">
                    <li>
                        <Link to="#">Option1</Link>
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