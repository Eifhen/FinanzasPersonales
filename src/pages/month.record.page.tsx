import Button from "../components/button.component";
import Footer from "../components/footer.component";
import Header from "../components/header.component";
import Navbar from "../components/navbar.component";
import { MonthRecordContext, MonthRecordProvider } from "../context/month.record.context";
import { useContext } from 'react';
import itemRecordHeaders from "../headers/item.record.headers.data";
import FinanceCardList from "../components/finance.cardlist.component";
import { IRecord } from "../interfaces/financial.records.interface";
import Modal from "../components/modal.component";
import GoBack from '../components/goback.component';
import { useLocation, useNavigate } from "react-router-dom";


export default function MonthRecordPage(){
    return(
        <MonthRecordProvider>
            <MonthRecordPageContent/>
        </MonthRecordProvider>
    );
}

function MonthRecordPageContent(){

    const context = useContext(MonthRecordContext);
    const records = context.allRecords;
    const report = context.monthReport;
    const headers = itemRecordHeaders;
    const navigate = useNavigate();

    const GoToPreviousPage = () : void => {
        navigate(`/year-record/${context.id_year_record}`);
    }

    return (
        <main className='f-roboto fade-in bg-pure h-min-100vh align-column-between p-relative'>
            <header>
                <Navbar />
            </header>
            
            <section className='container h-min-100vh align-self-center bg-pure mb-4 '>
                <GoBack redirect={ ()=> GoToPreviousPage() } />
                <Header className="mb-3 " 
                    title="Monthly Record" 
                    icon="ri-file-list-3-line" 
                    subtitle="All the financial record of the month"
                    elementTitle={report.month}
                />
                <Button className="btn-add mb-1" 
                    title="Add Record" 
                    icon="ri-add-line" 
                    action={()=> {context.openModal("add")}} 
                />
                <FinanceCardList<IRecord>
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