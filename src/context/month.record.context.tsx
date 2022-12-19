
import {useEffect, useState, createContext } from 'react';
import { IModal } from '../interfaces/modal.interface';
import { IMonthRecord, IRecord, IMonthIncome } from '../interfaces/financial.records.interface';
import { useParams } from 'react-router-dom';
import { indexObj } from '../interfaces/indexObj.interface';
import interfaceOf from '../helpers/interface.helper';
import monthRecordService from '../services/month.record.service';
import { ItemRecordForm } from '../forms/item.record.form';
import { IncomeForm } from '../forms/income.record.form';


interface MonthRecordProvider {
    modal:IModal;
    openModal(type:string, data?:indexObj<IRecord>): void;
    form:IRecord;
    incomeForm:IMonthIncome;
    HandleForm(event:any, type?:string): void;
    expenses: Array<IRecord>;
    incomes: Array<IMonthIncome>;
    monthReport: IMonthRecord;
    id_year_record: number;
    id_month_record: number;
    GetRecord(id_record:number):Promise<any>;
    GetIncome(id_income:number):Promise<any>;
}

interface IModalOptions {
    add:IModal;
    edit:IModal;
    deleteData:IModal;
    error:IModal; 
}

const emptyForm:IRecord = {
    id:0,
    date: '',
    cost: 0,
    title: '',
    id_month_record: 0,
    descripcion:'',
}

const emptyIncomeForm:IMonthIncome = {
    id: 0,
    id_month_record: 0,
    title: '',
    date: '',
    income: 0,
    descripcion: ''
}

const MonthRecordContext = createContext({} as MonthRecordProvider);

function MonthRecordProvider (props:any){
    const [modal, setModal] = useState({} as IModal);
    const [modalType, setModalType] = useState("");
    const [modalOpen, setModalOpen] = useState(false);
    const [form, setForm] = useState(emptyForm);
    const [incomeForm, setIncomeForm] = useState(emptyIncomeForm);
    const [monthReport, setMonthReport] = useState({} as IMonthRecord);
    const [expenses, setExpenses] = useState([] as Array<IRecord>);
    const [incomes, setIncomes] = useState([] as Array<IMonthIncome>);
    const [reload, setReload] = useState<boolean>(false);
    const params = useParams();
    const id_month_record = Number(params.id_month_record);
    const id_year_record = Number(params.id_year_record);
    const service = monthRecordService;

    // Gestión de datos
    function GetAllRecords() : void {
        service.GetAll(id_month_record).then((res:Array<IRecord>)=>{
            if(res != undefined){
                setExpenses(res);
            }
            else{
                setExpenses([]);
            }
        })
        .catch(console.error);
    }

    function GetRecord(id_record:number): Promise<any> {
        return service.Get(id_record).then((res:IRecord)=>{
            if(res != undefined){
                return res;
            }
        })
        .catch(console.error);
    }

    function GetAllIncomes() : void {
        service.GetAllIncomes(id_month_record).then((res:Array<IMonthIncome>)=>{
            if(res != undefined){
                setIncomes(res);
            }
            else{
                setIncomes([]);
            }
        })
        .catch(console.error);
    }

    function GetIncome(id_income:number) : Promise<any> {
        return service.GetIncome(id_income).then((res:IRecord)=>{
            if(res != undefined){
                return res;
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
    function openModal(type:string, data:indexObj<IRecord|IMonthIncome>){
        setModalType(type);
        setModalOpen(true);
        if(interfaceOf<IRecord>(data)){
            setForm(data);
        }

        if(interfaceOf<IMonthIncome>(data)){
            setIncomeForm(data);
        }

    }

    function closeModal(){
        setForm(emptyForm);
        setIncomeForm(emptyIncomeForm);
        setModalOpen(false);
        setModal((modal:IModal) => { return {...modal, state: "modal-close"}; });
    }

    function ModalHandler() : IModal {

        const modalRecord = ModalRecord();
        const modalIncome = ModalIncome();

        switch(modalType){
            case "add": 
                return modalRecord.add;
            case "edit":
                return modalRecord.edit;
            case "delete":
                return modalRecord.deleteData;
            case "add-income":
                return modalIncome.add;
            case "edit-income":
                return modalIncome.edit;
            case "delete-income":
                return modalIncome.deleteData;
            default:
                return modalRecord.error;
        }
    }

    function ModalRecord () : IModalOptions {
        const financialRecordsForm = (<ItemRecordForm/>);

        const add:IModal = {
            mode:modalType,
            icon:"ri-add-line",
            state:"modal-show",
            btnColor:"bg-green",
            btnTitle:"Add Record",
            btnState:false,
            size:"modal-lg",
            title:"Add New Expense",
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
            size:"modal-lg",
            title:"Edit Expense Record",
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
            title:"Delete Expense Record",
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

        return { add, edit, deleteData, error };
    }

    function ModalIncome () : IModalOptions {
        const IncomForm = (<IncomeForm />);

        const add:IModal = {
            mode:modalType,
            icon:"ri-coin-fill pr-0-5",
            state:"modal-show",
            btnColor:"bg-blue-royal",
            btnTitle:"Add Income",
            btnState:false,
            size:"modal-lg",
            title:"Add New Income",
            render: IncomForm,
            modalClose:()=> closeModal(),
            modalConfirm:(event)=> AddIncome(event),
        };

        const edit:IModal = {
            state:"modal-show",
            icon:"ri-pencil-fill pr-0-5",
            mode:modalType,
            btnColor:"bg-green",
            btnTitle:"Update Record",
            btnState:false,
            size:"modal-lg",
            title:"Edit Income Record",
            render: IncomForm,
            modalClose:()=> closeModal(),
            modalConfirm:(event)=> EditIncome(event),
        };

        const deleteData:IModal = {
            state:"modal-show",
            icon:"ri-delete-bin-fill pr-1",
            mode:"delete",
            btnColor:"bg-wine",
            btnTitle:"Delete",
            btnState:false,
            size:"modal-md",
            title:"Delete Income Record",
            render:(<p className='p-1'>Are you sure you want to delete this record?</p>),
            modalClose:()=> closeModal(),
            modalConfirm:(event)=> DeleteIncome(event),
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

        return { add, edit, deleteData, error };
    }

    function HandleForm(event:any, type?:string){
        if(type == "income"){
            setIncomeForm((form:IMonthIncome) => {
                const {id, value} = event.target;
                return {...form, [id]:value};
            })
        }
        else{
            setForm((form:IRecord) => {
                const {id, value} = event.target;
                return {...form, [id]:value};
            })
        }
    }


    // CRUD Month Record
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

    // CRUD Month Income

    function AddIncome(event:any){
        event.preventDefault();
        if(incomeForm.title && incomeForm.date){
            incomeForm.id_month_record = id_month_record;
            service.InsertIncome(incomeForm).then((res) => {
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

    function EditIncome(event:any){
        event.preventDefault();

        if(incomeForm.title && incomeForm.date){
            service.UpdateIncome(incomeForm).then((res) => {
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

    function DeleteIncome(event:any){
        event.preventDefault();
        if(incomeForm.title && incomeForm.date){
            service.DeleteIncome(incomeForm).then((res) => {
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
    }, [form, incomeForm, modalOpen]);
    
    useEffect(()=>{
        GetMonthReport();
        GetAllRecords();
        GetAllIncomes();
    },[reload]);

    const data:MonthRecordProvider = { 
        openModal, modal, form, incomeForm, HandleForm, 
        expenses, incomes, monthReport, id_year_record, id_month_record,
        GetRecord, GetIncome
    };

    return(
        <MonthRecordContext.Provider value={data}>
            {props.children}
        </MonthRecordContext.Provider>
    );
}


export { MonthRecordProvider, MonthRecordContext}