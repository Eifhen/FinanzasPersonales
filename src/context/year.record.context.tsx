
import {useEffect, useState, createContext } from 'react';
import { IModal } from '../interfaces/modal.interface';

import { MonthRecordForm } from '../forms/month.record.form';
import IYearRecord, { IMonthRecord } from '../interfaces/financial.records.interface';
import dateHandler from '../helpers/date.helper';
import yearRecordService from '../services/year.record.service';
import { useParams } from 'react-router-dom';
import { indexObj } from '../interfaces/indexObj.interface';
import interfaceOf from '../helpers/interface.helper';


interface YearRecordProvider {
    modal:IModal;
    openModal(type:string, data?:indexObj<IMonthRecord>): void;
    form:IMonthRecord;
    HandleForm(event:any): void;
    monthlyRecords: Array<IMonthRecord>;
    yearReport: IYearRecord;
}

const emptyForm:IMonthRecord = {
    id: 0,
    title: '',
    date: '',
    month: '',
    total_saved: 0,
    total_incomes: 0,
    total_expendings: 0,
    id_year_record: 0
}

const YearRecordContext = createContext({} as YearRecordProvider);

function YearRecordProvider (props:any){
    const [modal, setModal] = useState({} as IModal);
    const [modalType, setModalType] = useState("");
    const [modalOpen, setModalOpen] = useState(false);
    const [form, setForm] = useState(emptyForm);
    const [reload, setReload] = useState<boolean>(false);
    const [yearReport, setYearReport] = useState({} as IYearRecord);
    const [monthlyRecords, setMonthlyRecords] = useState([] as Array<IMonthRecord>);
    const params = useParams();
    const id_year_record = Number(params.id);
    const service = yearRecordService;

    // Gestión de datos

    function GetMonthlyRecords() : void {
        service.GetAll(id_year_record).then((res:Array<IMonthRecord>)=>{
            if(res != undefined){
                setMonthlyRecords(res);
            }
            else{
                setMonthlyRecords([]);
            }
        })
        .catch(console.error);
    }

    function GetYearReport() : void {
        service.yearReport(id_year_record).then((res:IYearRecord)=>{
            if(res != undefined){
                setYearReport(res);
            }
            else{
                setYearReport({} as IYearRecord);
            }
        })  
        .catch(console.error);
    }

    // Gestión de Modals 

    function openModal(type:string, data:indexObj<IMonthRecord>){
        setModalType(type);
        setModalOpen(true);
        if(interfaceOf<IMonthRecord>(data)){
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
            icon:"ri-add-line pr-0-5",
            state:"modal-show",
            btnColor:"bg-green",
            btnTitle:"Add Record",
            btnState:false,
            size:"modal-md",
            title:"Add New Month Record",
            render: financialRecordsForm,
            modalClose:()=> closeModal(),
            modalConfirm:(event)=> Add(event),
        };

        const edit:IModal = {
            state:"modal-show",
            icon:"ri-pencil-fill pr-0-5",
            mode:modalType,
            btnColor:"bg-green",
            btnTitle:"Update Record",
            btnState:false,
            size:"modal-md",
            title:"Edit Month Record",
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
            title:"Delete Month Record",
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
            form.id_year_record = id_year_record;
            service.Insert(form).then((res) => {
                setReload(!reload);
                setModal((modal:IModal) => {
                    const msg = "The record has been added successfully";
                    const msgColor = "text-green"
                    const btnState = true;
                    return {...modal, msg, msgColor, btnState};
                })
            })
            .catch((err)=>{
                setModal((modal:IModal) => {
                    const msg = "there was an error adding the record";
                    const msgColor = "text-wine"
                    const btnState = false;
                    return {...modal, msg, msgColor, btnState};
                })
                console.log("err => ", err);
            })

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
            service.Update(form).then((res) => {
                setReload(!reload);
                setModal((modal:IModal) => {
                    const msg = "The record has been updated successfully";
                    const msgColor = "text-green"
                    const btnState = true;
                    return {...modal, msg, msgColor, btnState};
                })
            })
            .catch((err)=>{
                setModal((modal:IModal) => {
                    const msg = "there was an error updating the record";
                    const msgColor = "text-wine"
                    const btnState = false;
                    return {...modal, msg, msgColor, btnState};
                })
                console.log("err => ", err);
            });
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
            service.Delete(form).then((res) => {
               
                setReload(!reload);
                setModal((modal:IModal) => {
                    const msg = "The record has been deleted successfully";
                    const msgColor = "text-green"
                    const btnState = true;
                    return {...modal, msg, msgColor, btnState};
                })
            })
            .catch((err)=>{
                setModal((modal:IModal) => {
                    const msg = "there was an error deleting the record";
                    const msgColor = "text-wine"
                    const btnState = false;
                    return {...modal, msg, msgColor, btnState};
                })
                console.log("err => ", err);
            });
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

    useEffect(()=>{
        GetYearReport();
        GetMonthlyRecords();
    }, [reload])

    const data:YearRecordProvider = { 
        openModal, modal, form, HandleForm, monthlyRecords, yearReport
    };

    return(
        <YearRecordContext.Provider value={data}>
            {props.children}
        </YearRecordContext.Provider>
    );
}


export { YearRecordProvider, YearRecordContext}

