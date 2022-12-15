

interface button {
    title:string;
    className:string;
    icon:string;
    //hasIcon:boolean;
    disabled?:boolean;
    action?(): void;
}


export default function Button (props:button){

    const icon = props.icon ? <i className={`${props.icon}`}></i> : <></>;

    function Action(){
        if(props.action){
            props.action();
        }
    }

    return (
        <button title={props.title} onClick={ Action } className={`${props.className}`} disabled={props.disabled}>
             {icon} {props.title}
        </button>
    );
}