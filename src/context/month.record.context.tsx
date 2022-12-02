
import {useEffect, useState, createContext } from 'react';
import { IModal } from '../interfaces/modal.interface';
import { IMonthRecord, IRecord } from '../interfaces/financial.records.interface';
import { useParams } from 'react-router-dom';
import { indexObj } from '../interfaces/indexObj.interface';
import interfaceOf from '../helpers/interface.helper';
import monthRecordService from '../services/month.record.service';
import { ItemRecordForm } from '../forms/item.record.form';


interface MonthRecordProvider {
    modal:IModal;
    openModal(type:string, data?:indexObj<IRecord>): void;
    form:IRecord;
    HandleForm(event:any): void;
    allRecords: Array<IRecord>;
    monthReport: IMonthRecord;
    id_year_record: number;
    id_month_record: number;
}

const emptyForm:IRecord = {
    id:0,
    date: '',
    cost: 0,
    title: '',
    id_month_record: 0,
}

const MonthRecordContext = createContext({} as MonthRecordProvider);

function MonthRecordProvider (props:any){
    const [modal, setModal] = useState({} as IModal);
    const [modalType, setModalType] = useState("");
    const [modalOpen, setModalOpen] = useState(false);
    const [form, setForm] = useState(emptyForm);
    const [monthReport, setMonthReport] = useState({} as IMonthRecord);
    const [allRecords, setAllRecords] = useState([] as Array<IRecord>);
    const [reload, setReload] = useState<boolean>(false);
    const params = useParams();
    const id_month_record = Number(params.id_month_record);
    const id_year_record = Number(params.id_year_record);
    const service = monthRecordService;

    // Gestión de datos

    function GetAllRecords() : void {
        service.GetAll(id_month_record).then((res:Array<IRecord>)=>{
            if(res != undefined){
                setAllRecords(res);
            }
            else{
                setAllRecords([]);
            }
        })
        .catch(console.error);
    }

    function GetMonthReport() : void {
        service.MonthReport(id_month_record).then((record:IMonthRecord) =>{
            if(record != undefined){
                setMonthReport(record);
            }
            else{
                setMonthReport({} as IMonthRecord);
            }
        })
        .catch(console.error);
    }

    // Gestión de Modals 

    function openModal(type:string, data:indexObj<IRecord>){
        setModalType(type);
        setModalOpen(true);
        if(interfaceOf<IRecord>(data)){
            setForm(data);
        }
    }

    function closeModal(){
        setForm(emptyForm);
        setModalOpen(false);
        setModal((modal:IModal) => { return {...modal, state: "modal-close"}; });
    }

    function ModalHandler() : IModal {

        const financialRecordsForm = (<ItemRecordForm/>);

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
        setForm((form:IRecord) => {
            const {id, value} = event.target;
            return {...form, [id]:value};
        })
    }

    function Add(event:any) {
        event.preventDefault();

        if(form.title && form.date){
            form.id_month_record = id_month_record;
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
        GetMonthReport();
        GetAllRecords();
    },[reload]);

    const data:MonthRecordProvider = { 
        openModal, modal, form, HandleForm, allRecords, monthReport, id_year_record, id_month_record
    };

    return(
        <MonthRecordContext.Provider value={data}>
            {props.children}
        </MonthRecordContext.Provider>
    );
}


export { MonthRecordProvider, MonthRecordContext}