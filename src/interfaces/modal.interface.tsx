import IFinancialRecords from "./financial.records.interface";




export interface IModal{
    state:string;
    mode:string;  // edit, delete, add
    refresh?:boolean;
    title:string;
    icon?:string;
    btnColor:string;
    btnTitle:string;
    btnState:boolean; // disabled btn confirm
    size:string; // modal-lg, modal-sm , modal-md
    msg?:string;
    msgColor?:string;
    modalClose():void;
    modalConfirm(event:any):void;
    render?: JSX.Element;
}

export interface IModalObj {
    data:IModal;
}

