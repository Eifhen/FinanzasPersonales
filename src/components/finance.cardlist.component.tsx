import { Link } from 'react-router-dom';
import { IGlobalRecord } from '../interfaces/financial.records.interface';
import dateHandler from '../helpers/date.helper';
import SummaryCard from './summary.card.component';
import { nanoid } from 'nanoid';
import { indexObj } from '../interfaces/indexObj.interface';
import IHasDate from '../interfaces/date.interface';
import IncomeCard from './income.card.component';
import incomeHeaders from '../headers/income.headers.data';



export interface IFinanceCardList<T> {
    globalReport:IGlobalRecord;
    headers:IRecordHeaderObj;
    records:Array<T>;
    action(type:string, data:indexObj<T>): void;
    path?:string; // path of navegation
    enableIncomeCard?:boolean;
}

export interface IRecordHeader {
    header:string;   // header of the column
    property:string; // matching cell of the row
    navigation:boolean // indicates if this cell has navegation
    colWidth:string; // width of the column
    rowWidth:string; // width of the row
    IsDate:boolean;  // indicates if the value of a column is a date type or not
}

export interface IRecordHeaderObj{
    key:string; // name of the property used as ID
    data:Array<IRecordHeader>;
}

interface IRecordList<T>{
    headers:IRecordHeaderObj;
    records:Array<T>; // tipo de objeto que se renderizará en las filas
    action(type:string, data:indexObj<T>):void;
    path?:string;

}

interface IRecordItem<T> {
    data:indexObj<T>;
    action(type:string, data:indexObj<T>):void;
    path?:string;
    headers:IRecordHeaderObj;
}


export default function FinanceCardList<T extends indexObj<T>>(props:IFinanceCardList<T>) {

    const {records, globalReport} = props;
    const enableIncomeCard = props.enableIncomeCard ? props.enableIncomeCard : false;
    const IncomeHeaders:IRecordHeaderObj = incomeHeaders;
    const indicator = enableIncomeCard ? "Expendings" : "Records";

    return (         
        <div className="card-content bg-inherit shadow-none">
            <SummaryCard data={globalReport} />

            <IncomeCard enable={enableIncomeCard}>
                <>
                    <RecordHeader key={IncomeHeaders.key} data={IncomeHeaders.data}/>
                    <div className="income-container">
                        <RecordRowList<T> 
                            headers={props.headers}
                            records={records} 
                            action={props.action} 
                            path={props.path}
                        />
                    </div>
                </>
            </IncomeCard>
            
            <div className="finance-card p-1 bg-pure mt-1 p-relative">
                <div className='mb-3'>
                    <div className='card-indicator'>
                        <h3>{indicator}</h3> 
                    </div> 
                </div>
                <RecordHeader key={props.headers.key} data={props.headers.data}/>
                <div className='record-container '>
                    <RecordRowList<T> 
                        headers={props.headers}
                        records={records} 
                        action={props.action} 
                        path={props.path}
                    />
                </div>
            </div>
        </div>
    );
}

function RecordHeader (headers:IRecordHeaderObj){

    const columns = headers.data.map((item:IRecordHeader) => (
        <li key={nanoid()} className={`record-item fw-bold text-blue-royal ${item.colWidth}`}>
            {item.header}
        </li>
    ));

    return (
        <header className='record-header '>
            <ul className='record-row bg-white'>
                {columns}
                <li className="record-item fw-bold text-blue-royal w-15">
                    Actions
                </li>
            </ul>
        </header>
    );
}

function RecordRowList<T extends indexObj<T>>(props:IRecordList<T>){
    return (   
        <>
            {
                props.records.map((record:T, index) => {
                    return (
                        <RecordRow<T>
                            key={index} 
                            headers={props.headers}
                            action={props.action} 
                            path={props.path} 
                            data={record} 
                        />
                    );
                })
            }
        </>
    );
}

function RecordRow<T>(props:IRecordItem<T>){

    const { headers, data, action, path } = props;
    
    const recordsWithDates:Array<IHasDate> = [];

    const row = headers.data.map((header) => {
        
        const id = data[headers.key];
        let record = data[header.property];

        if(header.IsDate) {
            RecordHasDate(recordsWithDates, record, header.property);
            record = dateHandler.formatDate(record.toString());
        } 

        if(header.navigation){
           return (
                <li key={`${id}-${header.property}`} className={`record-item ${header.rowWidth}`} title={record.toString()}>
                    <Link to={`${path}/${id.toString()} `}> { record } </Link>
                </li>
           ) 
        }
        else {
            return (
                <li key={`${id}-${header.property}`} className={`record-item ${header.rowWidth}`} title={record.toString()}>
                     { record }
                </li>
            )
        }
    });
    
    let record:indexObj<T> = {...data};

    if(recordsWithDates.length > 0){
        recordsWithDates.forEach(item => {
            record = {...record, [item.property]:item.date }; 
        })
    }

    function HandleEdit(){
        action("edit", record);
    }

    function HandleDelete(){
        action("delete", record);
    }

    return(
        <ul className='record-row bg-white'>
            { row }
            <li  className="record-item w-15">
                <i onClick={ HandleEdit } className="ri-pencil-line icon-edit"></i>
                <i onClick={ HandleDelete } className="ri-delete-bin-5-line icon-delete "></i>
            </li>
        </ul>
    )
}

function RecordHasDate(array:Array<IHasDate>, date:string, property:string){
    // Por cada celda de la fila que tenga una fecha se ejecuta esto
    const obj:IHasDate = {
        date: dateHandler.toDateTimeLocal(date),
        property:property
    } 
    array.push(obj);
}