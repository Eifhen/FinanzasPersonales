


interface header {
    title:string;
    subtitle:string;
    icon:string;
    className?:string;
    elementTitle?:string;
    style?:string;
}

export default function Header(props:header){

    function ElementTitle(){
        if(props.elementTitle){
            const style = props.style ? props.style : "text-white";
            return (
                <div className={`page-header-detail text-capitalize ${style} col-4`}>
                    {props.elementTitle}
                </div>
            );
        }

        return (<></>);
    }

    return (
        <div className="header-container">
            <header className={`page-header ${props.className}`}>
                <div className="page-header-container">
                    <div className="page-header-info">
                        <i className={`${props.icon}`}></i> 
                        <div>    
                            <h1 > 
                                {props.title}
                            </h1>
                            <p>{props.subtitle}</p>
                        </div> 
                    </div>
                    <ElementTitle/>
                </div>       
            </header>
        </div>
    );
}