
import {useEffect, useState, createContext} from 'react';
import { IModal } from '../interfaces/modal.interface';
import globalRecordsService from '../services/global.records.service';
import { YearRecordForm } from '../forms/year.record.form';
import IYearRecord, { IGlobalRecord } from '../interfaces/financial.records.interface';


interface GlobalRecordProvider {
    modal:IModal;
    openModal(type:string, data?:IYearRecord): void;
    form:IYearRecord;
    HandleForm(event:any): void;
    getAllData(): Array<IYearRecord>;
    globalReport(): IGlobalRecord;
}

const emptyForm:IYearRecord = {
    id: 0,
    title: '',
    date: '',
    total_incomes: 0,
    total_expendings: 0,
    total_saved: 0
}

const GlobalRecordContext = createContext({} as GlobalRecordProvider);

function GlobalRecordProvider (props:any){
    const [modal, setModal] = useState({} as IModal);
    const [modalType, setModalType] = useState("");
    const [modalOpen, setModalOpen] = useState(false);
    const [form, setForm] = useState(emptyForm);
    const service = globalRecordsService;

    // Gestión de datos

    function getAllData() : Array<IYearRecord> {
        return service.GetAll();
    }

    function globalReport() : IGlobalRecord {
        return service.GlobalReport();
    }

    // Gestión de Modals 

    function openModal(type:string, data:IYearRecord){
        setModalType(type);
        setModalOpen(true);
        if(data){
            setForm(data);
        }
    }

    function closeModal(){
        setForm(emptyForm);
        setModalOpen(false);
        setModal((modal:IModal) => { return {...modal, state: "modal-close"}; });
    }

    function ModalHandler() : IModal {

        const financialRecordsForm = (<YearRecordForm/>);

        const add:IModal = {
            mode:modalType,
            icon:"ri-add-line",
            state:"modal-show",
            btnColor:"bg-green",
            btnTitle:"Add Record",
            btnState:false,
            size:"modal-md",
            title:"Add New Financial Record",
            render: financialRecordsForm,
            modalClose:()=> closeModal(),
            modalConfirm:(event)=> Add(event),
        };

        const edit:IModal = {
            state:"modal-show",
            icon:"ri-pencil-fill pr-1",
            mode:modalType,
            btnColor:"bg-green",
            btnTitle:"Update Record",
            btnState:false,
            size:"modal-md",
            title:"Edit Financial Record",
            render: financialRecordsForm,
            modalClose:()=> closeModal(),
            modalConfirm:(event)=> Edit(event),
        };

        const deleteData:IModal = {
            state:"modal-show",
            icon:"ri-delete-bin-fill pr-1",
            mode:modalType,
            btnColor:"bg-wine",
            btnTitle:"Delete",
            btnState:false,
            size:"modal-md",
            title:"Delete Financial Record",
            render:(<p className='p-1'>Are you sure you want to delete this record?</p>),
            modalClose:()=> closeModal(),
            modalConfirm:(event)=> Delete(event),
        };

        const error:IModal = {
            state:"modal-close",
            mode:modalType,
            btnColor:"bg-wine",
            btnTitle:"Error",
            btnState: true,
            title:"Error",
            size:"modal-md",
            modalClose:()=> closeModal(),
            modalConfirm:()=> alert("error"),
        };

        switch(modalType){
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

    function HandleForm(event:any){
        setForm((form:IYearRecord) => {
            const {id, value} = event.target;
            return {...form, [id]:value};
        })
    }

    function Add(event:any) {
        event.preventDefault();

        if(form.title && form.date){
            if(service.Insert(form)){
                setModal((modal:IModal) => {
                    const msg = "The record has been added successfully";
                    const msgColor = "text-green"
                    const btnState = true;
                    return {...modal, msg, msgColor, btnState};
                })
            }
            else{
                setModal((modal:IModal) => {
                    const msg = "there was an error adding the record";
                    const msgColor = "text-wine"
                    const btnState = false;
                    return {...modal, msg, msgColor, btnState};
                })
            }

        }
        else{
            setModal((modal:IModal) => {
                return {...modal, msg: "Enter the corresponding data", msgColor:"text-wine"}
            });
        }
    }
    
    function Edit(event:any){
        event.preventDefault();

        if(form.title && form.date){
            if(service.Update(form)){
                setModal((modal:IModal) => {
                    const msg = "The record has been updated successfully";
                    const msgColor = "text-green"
                    const btnState = true;
                    return {...modal, msg, msgColor, btnState};
                })
            }
            else{
                setModal((modal:IModal) => {
                    const msg = "there was an error updating the record";
                    const msgColor = "text-wine"
                    const btnState = false;
                    return {...modal, msg, msgColor, btnState};
                })
            }
        }
        else{
            setModal((modal:IModal) => {
                return {...modal, msg: "Enter the corresponding data", msgColor:"text-wine"}
            });
        }
    }

    function Delete(event:any){
        event.preventDefault();

        if(form.title && form.date){
            if(service.Delete(form)){
                setModal((modal:IModal) => {
                    const msg = "The record has been deleted successfully";
                    const msgColor = "text-green"
                    const btnState = true;
                    return {...modal, msg, msgColor, btnState};
                })
            }
            else{
                setModal((modal:IModal) => {
                    const msg = "there was an error deleting the record";
                    const msgColor = "text-wine"
                    const btnState = false;
                    return {...modal, msg, msgColor, btnState};
                })
            }
        }
        else {
            setModal((modal:IModal) => {
                return {...modal, msg: "Enter the corresponding data", msgColor:"text-wine"}
            });
        }

    }
    
    useEffect(()=>{
        if(modalOpen){
            setModal(ModalHandler);
        }
    }, [form, modalOpen]);


    const data:GlobalRecordProvider = { 
        openModal, modal, form, HandleForm, getAllData, globalReport
    };

    return(
        <GlobalRecordContext.Provider value={data}>
            {props.children}
        </GlobalRecordContext.Provider>
    );
}


export { GlobalRecordProvider, GlobalRecordContext}

