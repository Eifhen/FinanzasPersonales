import { Link } from 'react-router-dom';
import IFinancialRecords, { IFinancialRecordGlobalReport } from '../interfaces/financial.records.interface';
import { IFinancialRecordObj } from '../interfaces/financial.records.interface';
import dateHandler from '../helpers/date.helper';


interface IFinanceCardList {
    globalReport:IFinancialRecordGlobalReport;
    records:Array<IFinancialRecords>;
    action(type:string, data:IFinancialRecords): void;
    path:string;
}

interface IRecordItem {
    data:IFinancialRecords;
    action(type:string, data:IFinancialRecords):void;
    path:string;
}

export default function FinanceCardList(props:IFinanceCardList) {

    const {records, globalReport} = props;
    
    const data = records.map((record:IFinancialRecords) => {
        return (<RecordList key={record.id} action={props.action} path={props.path} data={record} />);
    });

    return (         
        <div className="card-content bg-white">
            <div className="summary-card bg-pure">
                <div className='summary-card-title '>
                    <i className="ri-list-unordered"></i>
                    Summary:
                </div>
                <div className='summary-card-group '>
                    <div>
                       <p> 
                            Total Incomes : 
                            <i className="ri-money-dollar-circle-line text-green"></i> 
                            <span className='text-green'>{globalReport.total_incomes}</span>  
                        </p>  
                    </div>
                    <div>
                        <p>
                            Total Expendings: 
                            <i className="ri-money-dollar-circle-line text-wine"></i> 
                            <span className="text-wine">{globalReport.total_expendings}</span>
                        </p> 
                    </div>
                    <div>
                        <p>
                            Total Saved:
                            <i className="ri-money-dollar-circle-line text-orange"></i>  
                            <span className='text-orange'> {globalReport.total_saved}</span>
                        </p>
                    </div>
                </div>
            </div>
            <div className="finance-card p-1 bg-pure mt-1">
                <header className='record-header '>
                    <ul className='record-row bg-white'>
                        <li className="record-item fw-bold text-blue-royal w-20 ">Title</li>
                        <li className="record-item fw-bold text-blue-royal w-25 ">Creation date</li>
                        <li className="record-item fw-bold text-blue-royal w-15 ">Incomes</li>
                        <li className="record-item fw-bold text-blue-royal w-15 ">Expendings</li>
                        <li className="record-item fw-bold text-blue-royal w-15 ">Saved</li>
                        <li className="record-item fw-bold text-blue-royal w-15 ">Actions</li>
                    </ul>
                </header>
                <div className='record-container '>
                    {data}
                </div>
            </div>
        </div>
    );
}


function RecordList(props:IRecordItem){

    const date = dateHandler.formatDate(props.data.date); // para mostrar
    const total_expendings = props.data.total_expendings.toString();
    const total_incomes = props.data.total_incomes.toString();
    const total_saved = props.data.total_saved.toString();
    const path = `${props.path}/${props.data.id}`;

    const datelocal =  dateHandler.toDateTimeLocal(props.data.date); // para input 
    const record:IFinancialRecords = {...props.data, date:datelocal }; 

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

