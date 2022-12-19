import { useContext, useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import { ActionBar, IActiveBarItem } from '../components/activebar.component';
import Footer from "../components/footer.component";
import GoBack from "../components/goback.component";
import Header from "../components/header.component";
import Navbar from "../components/navbar.component";
import { MonthRecordContext, MonthRecordProvider } from "../context/month.record.context";
import dateHandler from '../helpers/date.helper';
import { IMonthIncome, IMonthIncomeObj, IRecord, IRecordObj } from '../interfaces/financial.records.interface';
import useQuery from '../helpers/useQuery.hook';


export default function RecordDetailPage(){
    return(
        <MonthRecordProvider>
            <RecordDetailContent/>
        </MonthRecordProvider>
    );
}

function RecordDetailContent(){
    const [expense, setExpense] = useState({} as IRecord);
    const [income, setIncome] = useState({} as IMonthIncome);
    const [type, setType] = useState("");
    const context = useContext(MonthRecordContext);
    const navigate = useNavigate();
    const param = useParams();
    const query = useQuery();
    const GoToPreviousPage = () : void => {
        navigate(`/year-record/${context.id_year_record}/month/${context.id_month_record}`);
    }

    const ActionItems = useMemo(() : Array<IActiveBarItem> => [
        {
            title: "Go Back",
            icon: "ri-arrow-left-circle-line fs-1-4 text-blue-royal",
            action:()=> GoToPreviousPage()
        },
    ], []);


    function RenderInfo(){
        switch(type){
            case "expense":
                return <ExpenseInfo data={expense} />;
            case "income":
                return <IncomeInfo data={income}/>;
            default:
                return <></>;
        }
    }

    useEffect(()=>{
        if(param.id_record){
            switch(param.type){
                case "expense":
                    context.GetRecord(Number(param.id_record))
                    .then((res:IRecord) =>{
                        setExpense(res);
                        setType("expense");
                    })
                    .catch(console.error);
                break;

                case "income":
                    context.GetIncome(Number(param.id_record))
                    .then((res:IMonthIncome) =>{
                        setIncome(res);
                        setType("income");
                    })
                    .catch(console.error);
                break;

                default:
                    console.log("404");
                break;
            }
        }
    },[])

    return(
        <main className='f-roboto fade-in bg-white-light align-column-between p-relative'>
            <Navbar background='bg-white-light' />
            <section className='container h-min-90vh align-self-center bg-inherit mb-3'>
                <Header className="mb-2" 
                    title={`Record Description`} 
                    icon="ri-quill-pen-fill pb-1" 
                    subtitle={`See the description of your ${type}`}
                />

                <RenderInfo />
                <ActionBar items={ActionItems} />
            </section>
            <Footer />
        </main>
    )
}


function ExpenseInfo(expense:IRecordObj) {
    const expenseDate = dateHandler.formatDate(expense.data.date.toString());
    return (
        <div className="p-1">
            <div className="bg-pure shadow rounded-35 pt-1 pr-2 pl-2 pb-3 d-flex">
                <div className="col-5  border-right">
                    <fieldset>
                        <h2 className='text-gray'>Title</h2>
                        <p className='m-0'>{expense.data.title}</p>
                    </fieldset>
                    <fieldset>
                        <h2 className='text-gray'>Date</h2>
                        <p className='m-0'>{expenseDate}</p>
                    </fieldset>
    
                </div>
                <div className="col-5 pl-3">
                    <fieldset>
                        <h2 className='text-gray'>Cost</h2>
                        <p className='m-0'>{expense.data.cost} $</p>
                    </fieldset>
                    <fieldset>
                        <h2 className='text-gray'>Description</h2>
                        <p className='m-0'>{expense.data.descripcion}</p>
                    </fieldset>
                </div>
            </div>
        </div>
    )
}

function IncomeInfo(income:IMonthIncomeObj){
    const incomeDate = dateHandler.formatDate(income.data.date.toString());
    return (
        <div className="p-1">
            <div className="bg-pure shadow rounded-35 pt-1 pr-2 pl-2 pb-3 d-flex">
                <div className="col-5  border-right">
                    <fieldset>
                        <h2 className='text-gray'>Title</h2>
                        <p className='m-0'>{income.data.title}</p>
                    </fieldset>
                    <fieldset>
                        <h2 className='text-gray'>Date</h2>
                        <p className='m-0'>{incomeDate}</p>
                    </fieldset>
                </div>
                <div className="col-5 pl-3">
                    <fieldset>
                        <h2 className='text-gray'>Income</h2>
                        <p className='m-0'>{income.data.income} $</p>
                    </fieldset>
                    <fieldset>
                        <h2 className='text-gray'>Description</h2>
                        <p className='m-0'>{income.data.descripcion}</p>
                    </fieldset>
                </div>
            </div>
        </div>
    )
}