
import {useEffect, useState, createContext} from 'react';
import { IModal } from '../interfaces/modal.interface';

import financialRecordService from '../services/financial.record.service';


interface FinanceRecordProvider {
    modal:IModal;
    openModal(type:string): void;
}

const FinanceRecordContext = createContext({} as FinanceRecordProvider);

function FinanceRecordProvider (props:any){
    const [modal, setModal] = useState({} as IModal);
    const service = financialRecordService;

    function closeModal(){
        setModal((modal:IModal) => { return {...modal, state: "modal-close"}; });
    }

    function openModal(type:string){
        const modalData = ModalOperationHandler(type);
        setModal(modalData);
    }

    function ModalOperationHandler(type:string) : IModal {

        const add:IModal = {
            mode:type,
            icon:"ri-add-line",
            state:"modal-show",
            btnColor:"bg-green",
            btnTitle:"Add Record",
            title:"Add New Financial Record",
            modalClose:()=> closeModal(),
            modalConfirm:()=> Add(),
        };

        const edit:IModal = {
            state:"modal-show",
            mode:type,
            btnColor:"bg-green",
            btnTitle:"Update Record",
            title:"Edit Financial Record",
            modalClose:()=> closeModal(),
            modalConfirm:()=> Edit(),
        };

        const deleteData:IModal = {
            state:"modal-show",
            mode:type,
            btnColor:"bg-wine",
            btnTitle:"Delete",
            title:"Delete Financial Record",
            render:(<p className='p-1'>Are you sure you want to delete this record?</p>),
            modalClose:()=> closeModal(),
            modalConfirm:()=> Delete(),
        };

        const error:IModal = {
            state:"modal-show",
            mode:type,
            btnColor:"bg-wine",
            btnTitle:"Error",
            title:"Error",
            modalClose:()=> closeModal(),
            modalConfirm:()=> alert("error"),
        };

        switch(type){
            case "add": 
                return add;
            case "edit":
                return edit;

            case "delete":
                return deleteData;
            default:
                return error;
        }
    }

    function Add() {
        console.log("add");
    }
    
    function Edit(){
        console.log("edit");
    }

    function Delete(){
        console.log("delete");
    }

    
  

    const data:FinanceRecordProvider = { openModal, modal, };

    return(
        <FinanceRecordContext.Provider value={data}>
            {props.children}
        </FinanceRecordContext.Provider>
    );
}


export { FinanceRecordProvider, FinanceRecordContext}

