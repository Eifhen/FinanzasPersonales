import { useContext, useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import { ActionBar, IActiveBarItem } from '../components/activebar.component';
import Footer from "../components/footer.component";
import GoBack from "../components/goback.component";
import Header from "../components/header.component";
import Navbar from "../components/navbar.component";
import { MonthRecordContext, MonthRecordProvider } from "../context/month.record.context";
import dateHandler from '../helpers/date.helper';
import { IRecord } from '../interfaces/financial.records.interface';




export default function RecordDetailPage(){
    return(
        <MonthRecordProvider>
            <RecordDetailContent/>
        </MonthRecordProvider>
    );
}


function RecordDetailContent(){
    const context = useContext(MonthRecordContext);
    const navigate = useNavigate();
    const param = useParams();
    const [record, setRecord] = useState({} as IRecord);
    const date = dateHandler.formatDate(record?.date?.toString());
    
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

    useEffect(()=>{
        if(param.id_record){
            context.GetRecord(Number(param.id_record))
            .then((res:IRecord) =>{
                setRecord(res);
            })
            .catch(console.error);
        }
        else{
            console.log("404");
        }
    },[])

    return(
        <main className='f-roboto fade-in bg-white-light align-column-between p-relative'>
            <Navbar background='bg-white-light' />
            <section className='container h-min-90vh align-self-center bg-inherit mb-3'>
                <Header className="mb-2" 
                    title="Record Description" 
                    icon="ri-quill-pen-fill pb-1" 
                    subtitle="See the description of your expenses"
                />

                <div className="p-1">
                    <div className="bg-pure shadow rounded-35 pt-1 pr-2 pl-2 pb-3 d-flex">
                        <div className="col-5  border-right">
                            <fieldset>
                                <h2 className='text-gray'>Title</h2>
                                <p className='m-0'>{record.title}</p>
                            </fieldset>
                            <fieldset>
                                <h2 className='text-gray'>Date</h2>
                                <p className='m-0'>{date}</p>
                            </fieldset>
             
                        </div>
                        <div className="col-5 pl-3">
                            <fieldset>
                                <h2 className='text-gray'>Cost</h2>
                                <p className='m-0'>{record.cost} $</p>
                            </fieldset>
                            <fieldset>
                                <h2 className='text-gray'>Description</h2>
                                <p className='m-0'>{record.descripcion}</p>
                            </fieldset>
                        </div>
                    </div>
                </div>

                <ActionBar items={ActionItems} />
            </section>
            <Footer />
        </main>
    )
}