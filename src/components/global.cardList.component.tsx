import { Link } from 'react-router-dom';
import IYearRecord, { IGlobalRecord } from '../interfaces/financial.records.interface';
import dateHandler from '../helpers/date.helper';
import SummaryCard from './summary.card.component';


interface IGlobalRecordCardList {
    globalReport:IGlobalRecord;
    records:Array<IYearRecord>;
    action(type:string, data:IYearRecord): void;
    path:string;
}

interface IRecordList{
    records:Array<IYearRecord>;
    action(type:string, data:IYearRecord):void;
    path:string;
}

interface IRecordItem {
    data:IYearRecord;
    action(type:string, data:IYearRecord):void;
    path:string;
}

export default function GlobalRecordCardList(props:IGlobalRecordCardList) {

    const {records, globalReport} = props;

    return (         
        <div className="card-content bg-white">
            <SummaryCard data={globalReport} />
            <div className="finance-card p-1 bg-pure mt-1">
                 <RecordHeader/>
                <div className='record-container '>
                    <RecordList records={records} action={props.action} path={props.path}/>
                </div>
            </div>
        </div>
    );
}

function RecordHeader (){
    return (
        <header className='record-header '>
            <ul className='record-row bg-white'>
                <li className="record-item fw-bold text-blue-royal w-25 ">Title</li>
                <li className="record-item fw-bold text-blue-royal w-30 ">Creation date</li>
                <li className="record-item fw-bold text-blue-royal w-20 ">Incomes</li>
                <li className="record-item fw-bold text-blue-royal w-20 ">Expendings</li>
                <li className="record-item fw-bold text-blue-royal w-15 ">Saved</li>
                <li className="record-item fw-bold text-blue-royal w-15 ">Actions</li>
            </ul>
        </header>
    );
}

function RecordList(props:IRecordList){
    return (   
        <>
            {
                props.records.map((record:IYearRecord) => {
                    return (
                        <RecordItem 
                            key={record.id} 
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

function RecordItem(props:IRecordItem){

    const date = dateHandler.formatDate(props.data.date); // para mostrar
    const total_expendings = props.data.total_expendings.toString();
    const total_incomes = props.data.total_incomes.toString();
    const total_saved = props.data.total_saved.toString();
    const path = `${props.path}/${props.data.id}`;

    const datelocal =  dateHandler.toDateTimeLocal(props.data.date); // para input 
    const record:IYearRecord = {...props.data, date:datelocal }; 

    function HandleEdit(){
        props.action("edit", record);
    }

    function HandleDelete(){
        props.action("delete", record);
    }

    return(
        <ul className='record-row bg-white'>
            <li className="record-item w-20" title={props.data.title}>
                <Link to={path}> {props.data.title} </Link>
            </li>
            <li className="record-item w-25" title={date}>
                <p>{date}</p> 
            </li>
            <li className="record-item w-15" title={total_incomes}>
                <p>{total_incomes}</p>
            </li>
            <li className="record-item w-15" title={total_expendings}>
                <p>{total_expendings}</p>
            </li>
            <li className="record-item w-15" title={total_incomes}>
                <p>{total_saved}</p>
            </li>
            <li className="record-item w-15">
                <i onClick={ HandleEdit } className="ri-pencil-line icon-edit"></i>
                <i onClick={ HandleDelete } className="ri-delete-bin-5-line icon-delete "></i>
            </li>
        </ul>
    )
}

