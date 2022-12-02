


interface header {
    title:string;
    subtitle:string;
    icon:string;
    className?:string;
    elementTitle?:string;
    
}

export default function Header(props:header){

    let render;
    if(props.elementTitle){
        render = (
            <div className="page-header-detail text-capitalize bg-blue-royal text-white col-5">
                {props.elementTitle}
            </div>
        );
    }

    return (
        <header className={`page-header ${props.className}`}>
            <h1 className="title"> 
                <i className={`${props.icon}`}></i> {props.title}
            </h1>
            <p>{props.subtitle}</p>
            
            {render}
        </header>
    );
}