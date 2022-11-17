
import {useEffect, useState, createContext } from 'react';
import { IModal } from '../interfaces/modal.interface';

import { MonthRecordForm } from '../forms/month.record.form';
import IYearRecord, { IMonthRecord } from '../interfaces/financial.records.interface';
import dateHandler from '../helpers/date.helper';
import yearRecordService from '../services/year.record.service';
import { useParams } from 'react-router-dom';


interface YearRecordProvider {
    modal:IModal;
    openModal(type:string, data?:IMonthRecord): void;
    form:IMonthRecord;
    HandleForm(event:any): void;
    getAllData(): Array<IMonthRecord>;
    yearReport(): IYearRecord;
}

const emptyForm:IMonthRecord = {
    id: 0,
    title: '',
    date: '',
    month: '',
    total_saved: 0,
    total_incomes: 0,
    total_expendings: 0,
    id_year_financial_record: 0
}

const YearRecordContext = createContext({} as YearRecordProvider);

function YearRecordProvider (props:any){
    const [modal, setModal] = useState({} as IModal);
    const [modalType, setModalType] = useState("");
    const [modalOpen, setModalOpen] = useState(false);
    const [form, setForm] = useState(emptyForm);
    const params = useParams();
    const id_year_record = Number(params.id);
    const service = yearRecordService;

    // Gestión de datos

    function getAllData() : Array<IMonthRecord> {
        return service.GetAll(id_year_record);
    }

    function yearReport() : IYearRecord {
        return service.yearReport(id_year_record);
    }

    // Gestión de Modals 

    function openModal(type:string, data:IMonthRecord){
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

        const financialRecordsForm = (<MonthRecordForm/>);

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
        setForm((form:IMonthRecord) => {
            const {id, value} = event.target;
            return {...form, [id]:value};
        })
    }

    function Add(event:any) {
        event.preventDefault();

        if(form.title && form.date){
            if(service.Insert(form, id_year_record)){
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


    const data:YearRecordProvider = { 
        openModal, modal, form, HandleForm, getAllData, yearReport
    };

    return(
        <YearRecordContext.Provider value={data}>
            {props.children}
        </YearRecordContext.Provider>
    );
}


export { YearRecordProvider, YearRecordContext}

