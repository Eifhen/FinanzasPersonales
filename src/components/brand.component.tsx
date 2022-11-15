import { Link } from "react-router-dom";


interface brand {
    type:string;
    path:string;
    title?:string;
}

export default function BrandLogo (props:brand) {

    const brand:string =  props.type == "big" ? "brand-big" : "brand";
    const button = props.type == "big" ? 
        <Link className="btn-link bg-yellow mt-1" to={`${props.path}`}>{props.title}</Link>
        : <></>

    if(props.type !== "big"){
        return (
            <Link to={`${props.path}`} className={`${brand}`}>
                <h1>    
                    <i className="ri-bar-chart-grouped-line ri-2x"></i>
                    Finanzas <br />
                    Personales
                </h1>
                <p className="text-orange">By Gabriel Jiménez</p>
                {button}
            </Link>
        );
    }

    return (
        <div className={`${brand}`}>
            <h1>    
                <i className="ri-bar-chart-grouped-line ri-2x"></i>
                Finanzas <br />
                Personales
            </h1>
            <p className="text-gray">By Gabriel Jiménez</p>
            {button}
        </div>
    );
}