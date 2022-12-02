import { Link } from 'react-router-dom';


interface IGoBack {
    redirect(): void;
}

export default function GoBack(props:IGoBack){
    return (
        <div className="goBack" onClick={ props.redirect }>
            <i className="ri-arrow-left-circle-line"></i> 
             <p>Go Back</p> 
        </div>
    );
}