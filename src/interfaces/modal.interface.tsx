



export interface IModal{
    state:string;
    mode:string;  // edit, delete, add
    title:string;
    icon?:string;
    btnColor:string;
    btnTitle:string;
    modalClose():void;
    modalConfirm():void;
    render?: JSX.Element;
}

export interface IModalObj {
    data:IModal;
}

