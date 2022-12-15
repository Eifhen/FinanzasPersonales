import Button from "../components/button.component";
import Footer from "../components/footer.component";
import Header from "../components/header.component";
import Navbar from "../components/navbar.component";
import { YearRecordContext, YearRecordProvider } from "../context/year.record.context";
import { useContext, useMemo } from 'react';
import Modal from "../components/modal.component";
import FinanceCardList from "../components/finance.cardlist.component";
import { IMonthRecord } from "../interfaces/financial.records.interface";
import monthRecordheaders from "../headers/month.record.headers.data";
import { useNavigate, useParams } from "react-router-dom";
import GoBack from "../components/goback.component";
import { ActionBar, IActiveBarItem } from "../components/activebar.component";


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
    const navigate = useNavigate();
    
    const GoToPreviousPage = () : void => {
        navigate("/global-records");
    }

    const ActionItems = useMemo(() : Array<IActiveBarItem> => [
        {
            title: "Add Record",
            icon: "ri-add-line text-green",
            action:()=> context.openModal("add")
        },
        {
            title: "Go Back",
            icon: "ri-arrow-left-circle-line fs-1-4 text-blue-royal",
            action:()=> GoToPreviousPage()
        },
    ], []);

    return(
        <main className='f-roboto fade-in bg-white-light h-min-100vh align-column-between p-relative'>
            <Navbar background="bg-white-light"/>
    
            <section className='container h-min-100vh align-self-center bg-inherit pt-0 mb-4'>
                <Header className="mb-1" 
                    title="Year Record" 
                    icon="ri-calendar-todo-fill" 
                    subtitle="All your records by every month of the year."
                    elementTitle={report.title}
                />
                <FinanceCardList<IMonthRecord>
                    path={path} 
                    headers= { headers }
                    records={ records } 
                    globalReport={ report } 
                    action={context.openModal} 
                />

                <ActionBar items={ActionItems} />
            </section>

            <Modal data={context.modal}/>
            <Footer />
        </main>
    );
}