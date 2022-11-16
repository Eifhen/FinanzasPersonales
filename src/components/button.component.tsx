

interface button {
    title:string;
    className:string;
    icon:string;
    hasIcon:boolean;
    disabled?:boolean;
    action?(): void;
}


export default function Button (props:button){

    const icon = props.hasIcon ? <i className={`${props.icon}`}></i> : <></>;
    return (
        <button onClick={ props.action } className={`${props.className}`} disabled={props.disabled}>
             {icon} {props.title}
        </button>
    );
}