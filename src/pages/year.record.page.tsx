import Button from "../components/button.component";
import Footer from "../components/footer.component";
import Header from "../components/header.component";
import Navbar from "../components/navbar.component";
import { YearRecordContext, YearRecordProvider } from "../context/year.record.context";
import { useContext } from 'react';
import Modal from "../components/modal.component";
import FinanceCardList from "../components/finance.cardlist.component";
import { IMonthRecord } from "../interfaces/financial.records.interface";
import monthRecordheaders from "../headers/month.record.headers.data";
import { useParams } from "react-router-dom";


export default function YearRecordPage () {
    return (
        <YearRecordProvider>
            <YearRecordPageContent/>
        </YearRecordProvider>
    );
}


function YearRecordPageContent(){

    const params = useParams();
    const context = useContext(YearRecordContext);
    const report = context.yearReport;
    const records = context.monthlyRecords;
    const path = `/year-record/${params.id}/month`;
    const headers = monthRecordheaders;

    return(
        <main className='f-roboto fade-in bg-pure h-min-100vh align-column-between'>
            <header>
                <Navbar />
            </header>
            
            <section className='container h-min-100vh align-self-center bg-pure mb-4'>
                <Header className="mb-3 " 
                    title="Year Record" 
                    icon="ri-calendar-todo-fill" 
                    subtitle="All your financial records by every month of the year."
                    elementTitle={report.title}
                />
                <Button className="btn-add mb-1" title="Add Records" icon="ri-add-line" action={()=> {context.openModal("add")}} />
                <FinanceCardList<IMonthRecord>
                    path={path} 
                    headers= { headers }
                    records={ records } 
                    globalReport={ report } 
                    action={context.openModal} 
                />

            </section>

            <Modal data={context.modal}/>
            <Footer />
        </main>
    );
}