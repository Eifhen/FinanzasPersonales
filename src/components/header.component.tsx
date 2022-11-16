


interface header {
    title:string;
    subtitle:string;
    icon:string;
    className?:string;
}

export default function Header(props:header){


    return (
        <header className={`page-header ${props.className}`}>
            <h1 className="title"> 
                <i className={`${props.icon}`}></i> {props.title}
            </h1>
            <p>{props.subtitle}</p>
        </header>
    );
}